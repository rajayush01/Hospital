import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  department: string;
  doctor: string;
  date: string;
  slot: string;
  patientName: string;
  guardianName: string;
  phone: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [nextAvailableDate, setNextAvailableDate] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    department: "",
    doctor: "",
    date: "",
    slot: "",
    patientName: "",
    guardianName: "",
    phone: "",
  });

  const today = new Date().toISOString().split("T")[0];

  /* =========================
     LOAD DEPARTMENTS
  ========================= */
  useEffect(() => {
    if (!isOpen) return;

    fetch(`${API_URL}/departments`)
      .then((res) => res.json())
      .then(setDepartments)
      .catch(console.error);
  }, [isOpen]);

  /* =========================
     LOAD DOCTORS
  ========================= */
  useEffect(() => {
    if (!formData.department) return;

    fetch(`${API_URL}/departments/${formData.department}/doctors`)
      .then((res) => res.json())
      .then(setDoctors)
      .catch(console.error);
  }, [formData.department]);

  /* =========================
     LOAD SLOTS
  ========================= */
  useEffect(() => {
    if (!formData.doctor || !formData.date) return;

    fetch(
      `${API_URL}/slots?doctorId=${formData.doctor}&date=${formData.date}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.availableSlots || []);
        setNextAvailableDate(data.nextAvailableDate || null);
      })
      .catch(console.error);
  }, [formData.doctor, formData.date]);

  /* Reset slot when date or doctor changes */
  useEffect(() => {
    setFormData((prev) => ({ ...prev, slot: "" }));
  }, [formData.date, formData.doctor]);

  if (!isOpen) return null;

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData({ ...formData, phone: digitsOnly });

      if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError("");
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  /* =========================
     SUBMIT BOOKING
  ========================= */
  const handleSubmit = async () => {
    if (
      !formData.department ||
      !formData.doctor ||
      !formData.date ||
      !formData.slot ||
      !formData.patientName ||
      !formData.phone
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    const payload = {
      doctorId: formData.doctor,
      date: formData.date,
      slot: JSON.parse(formData.slot),
      patientName: formData.patientName,
      guardianName: formData.guardianName,
      phone: formData.phone,
    };

    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json());

      if (res.success) {
        setShowSuccessPopup(true);
      } else {
        alert(res.error || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked.
            </p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
            <h2 className="text-2xl font-bold text-gray-800">
              Book Appointment
            </h2>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 transition"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor <span className="text-red-500">*</span>
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 transition"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition"
              />
            </div>

            {/* Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot <span className="text-red-500">*</span>
              </label>
              {slots.length > 0 ? (
                <select
                  name="slot"
                  value={formData.slot}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 transition"
                >
                  <option value="">Select Slot</option>
                  {slots.map((s, i) => (
                    <option key={i} value={JSON.stringify(s)}>
                      {s.start} - {s.end}
                    </option>
                  ))}
                </select>
              ) : (
                formData.date && (
                  <div className="border border-gray-300 p-3 rounded-lg bg-gray-50 text-gray-600 text-sm">
                    No slots available for{" "}
                    <span className="font-semibold">
                      {formData.date === today ? "today" : formData.date}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Next available date */}
            {nextAvailableDate && (
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    date: nextAvailableDate,
                    slot: "",
                  })
                }
                className="text-sm text-blue-600 hover:text-blue-700 underline font-medium transition"
              >
                Select next available date ({nextAvailableDate})
              </button>
            )}

            {/* Patient details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="patientName"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guardian Name
              </label>
              <input
                type="text"
                name="guardianName"
                placeholder="Enter guardian name (optional)"
                value={formData.guardianName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition ${
                  phoneError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {phoneError && (
                <p className="text-sm text-red-600 mt-1">{phoneError}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;