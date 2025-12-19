// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// interface BookingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface FormData {
//   department: string;
//   doctor: string;
//   date: string;
//   slot: string;
//   patientName: string;
//   guardianName: string;
//   phone: string;
// }

// const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState<FormData>({
//     department: '',
//     doctor: '',
//     date: '',
//     slot: '',
//     patientName: '',
//     guardianName: '',
//     phone: ''
//   });

//   if (!isOpen) return null;

//   const handleSubmit = () => {
//     console.log('Booking submitted:', formData);
//     // Handle booking logic here
//     onClose();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10 rounded-t-lg">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Book Appointment</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition"
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Form Fields */}
//         <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//           {/* Department */}
//           <div>
//             <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//               Department <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 text-sm sm:text-base"
//             >
//               <option value="">Select Department</option>
//               <option value="cardiology">Cardiology</option>
//               <option value="neurology">Neurology</option>
//               <option value="orthopedics">Orthopedics</option>
//               <option value="pediatrics">Pediatrics</option>
//               <option value="dermatology">Dermatology</option>
//             </select>
//           </div>

//           {/* Doctor */}
//           <div>
//             <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//               Doctor <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="doctor"
//               value={formData.doctor}
//               onChange={handleChange}
//               className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 text-sm sm:text-base"
//             >
//               <option value="">Select Doctor</option>
//               <option value="dr-smith">Dr. Smith</option>
//               <option value="dr-johnson">Dr. Johnson</option>
//               <option value="dr-williams">Dr. Williams</option>
//             </select>
//           </div>

//           {/* Date and Slot - Stacked on mobile, side by side on larger screens */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             {/* Date */}
//             <div>
//               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                 Date <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm sm:text-base"
//               />
//             </div>

//             {/* Available Slots */}
//             <div>
//               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                 Time Slot <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="slot"
//                 value={formData.slot}
//                 onChange={handleChange}
//                 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 text-sm sm:text-base"
//               >
//                 <option value="">Select Time</option>
//                 <option value="09:00">09:00 AM</option>
//                 <option value="10:00">10:00 AM</option>
//                 <option value="11:00">11:00 AM</option>
//                 <option value="14:00">02:00 PM</option>
//                 <option value="15:00">03:00 PM</option>
//               </select>
//             </div>
//           </div>

//           {/* Patient Name and Guardian Name - Stacked on mobile, side by side on larger screens */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             {/* Patient Name */}
//             <div>
//               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                 Patient Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="patientName"
//                 value={formData.patientName}
//                 onChange={handleChange}
//                 placeholder="Enter patient name"
//                 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm sm:text-base"
//               />
//             </div>

//             {/* Guardian Name */}
//             <div>
//               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//                 Guardian Name
//               </label>
//               <input
//                 type="text"
//                 name="guardianName"
//                 value={formData.guardianName}
//                 onChange={handleChange}
//                 placeholder="Enter guardian name"
//                 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm sm:text-base"
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//               Phone <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//               className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm sm:text-base"
//             />
//           </div>

//           {/* Buttons - Stacked on very small screens, side by side on mobile+ */}
//           <div className="flex flex-col-reverse xs:flex-row justify-end gap-2 xs:gap-3 pt-3 sm:pt-4 sticky bottom-0 bg-white pb-2">
//             <button
//               onClick={onClose}
//               className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               CANCEL
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition shadow-lg"
//             >
//               BOOK
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;

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
        alert("Appointment booked successfully");
        onClose();
      } else {
        alert(res.error || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
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
  );
};

export default BookingModal;
