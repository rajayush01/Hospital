import React, { useEffect, useState } from "react";
import {
  X,
  Search,
  Filter,
  Clock,
  MapPin,
  ChevronRight,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Department {
  _id: string;
  name: string;
}

interface Doctor {
  _id: string;
  name: string;
  departmentId: { _id: string; name: string };
  image?: string;
  schedule: any;
  consultationFee: number;
}

interface Slot {
  start: string;
  end: string;
}

interface FormData {
  department: string;
  doctor: string;
  doctorDetails?: Doctor;
  date: string;
  slot: string;
  patientName: string;
  guardianName: string;
  phone: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [nextAvailableDate, setNextAvailableDate] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [phoneError, setPhoneError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLeaveDay, setIsLeaveDay] = useState(false);
  const [showDoctorAlert, setShowDoctorAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const isDoctorAvailableToday = (doctor: Doctor) => {
    const todayName = new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    return doctor.schedule?.[todayName]?.length > 0;
  };

  const getNextAvailableDate = (doctor: Doctor) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dayName = days[checkDate.getDay()];
      if (doctor.schedule?.[dayName]?.length > 0) {
        return checkDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
    }
    return null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (!isOpen) return;
    fetch(`${API_URL}/departments`)
      .then((res) => res.json())
      .then(setDepartments)
      .catch(console.error);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    fetch(`${API_URL}/admin/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);
      })
      .catch(console.error);
  }, [isOpen]);

  useEffect(() => {
    let filtered = doctors;
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (doc) => doc.departmentId._id === selectedDepartment,
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.departmentId.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredDoctors(filtered);
  }, [searchQuery, selectedDepartment, doctors]);

  useEffect(() => {
    if (!formData.doctor || !formData.date || !formData.doctorDetails) return;

    const dayName = new Date(formData.date)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const schedule = formData.doctorDetails.schedule?.[dayName] || [];

    fetch(`${API_URL}/slots?doctorId=${formData.doctor}&date=${formData.date}`)
      .then((res) => res.json())
      .then((data) => {
        const available = data.availableSlots || [];

        // ✅ NEW: detect leave day
        setIsLeaveDay(!!data.isLeave);

        setSlots(available);
        setAllSlots(schedule);
        setNextAvailableDate(data.nextAvailableDate || null);

        // ✅ ONLY calculate booked slots if NOT leave day
        if (!data.isLeave) {
          const availableStarts = available.map((s: Slot) => s.start);

          const booked = schedule
            .filter((s: Slot) => !availableStarts.includes(s.start))
            .map((s: Slot) => s.start);

          setBookedSlots(booked);
        } else {
          // 🟡 On leave → nothing is booked
          setBookedSlots([]);
        }
      })
      .catch(console.error);
  }, [formData.doctor, formData.date, formData.doctorDetails]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSearchQuery("");
      setSelectedDepartment("all");
      setFormData({
        department: "",
        doctor: "",
        date: "",
        slot: "",
        patientName: "",
        guardianName: "",
        phone: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDoctorSelect = (doctor: Doctor) => {
    setFormData({
      ...formData,
      doctor: doctor._id,
      doctorDetails: doctor,
      department: doctor.departmentId._id,
    });
  };

  const handleContinueFromDoctorSelect = () => {
    if (!formData.doctor) {
      setShowDoctorAlert(true);
      return;
    }
    setStep(2);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

  const handleSubmit = async () => {
    if (
      !formData.doctor ||
      !formData.date ||
      !formData.slot ||
      !formData.patientName ||
      !formData.phone
    ) {
      setErrorMessage("Please fill all required fields");
      setShowErrorAlert(true);
      return;
    }
    if (formData.phone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit phone number");
      setShowErrorAlert(true);
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
        setErrorMessage(res.error || "Booking failed");
        setShowErrorAlert(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
      setShowErrorAlert(true);
    }
  };
  return (
    <>
      {showDoctorAlert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Select a Doctor
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Please choose a doctor from the list to continue with your
              booking.
            </p>
            <button
              onClick={() => setShowDoctorAlert(false)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition w-full text-sm sm:text-base"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {showErrorAlert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Oops!
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              {errorMessage}
            </p>
            <button
              onClick={() => setShowErrorAlert(false)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition w-full text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-green-600"
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
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Your appointment has been successfully booked.
            </p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                onClose();
              }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition w-full text-sm sm:text-base"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 overflow-y-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col my-2 sm:my-4">
          <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex-1 pr-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {step === 1 && "Select a Doctor"}
                  {step === 2 && "Select Date & Time"}
                  {step === 3 && "Patient Details"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {step === 1 &&
                    "Choose from our experienced medical professionals"}
                  {step === 2 && "Pick your preferred appointment slot"}
                  {step === 3 && "Enter patient information"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition ${
                        step >= s
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {s}
                    </div>
                    <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 text-gray-600 hidden sm:block">
                      {s === 1 ? "Doctor" : s === 2 ? "Date & Time" : "Details"}
                    </span>
                  </div>
                  {s < 3 && (
                    <div className="flex-1 mx-1 sm:mx-2">
                      <div
                        className={`h-1 rounded transition ${step > s ? "bg-blue-600" : "bg-gray-300"}`}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search doctors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Filter className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="all">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {filteredDoctors.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 text-gray-500">
                      <p className="text-sm sm:text-base">
                        No doctors found matching your criteria
                      </p>
                    </div>
                  ) : (
                    filteredDoctors.map((doctor) => {
                      const isAvailableToday = isDoctorAvailableToday(doctor);
                      const nextDate = !isAvailableToday
                        ? getNextAvailableDate(doctor)
                        : null;
                      const isSelected = formData.doctor === doctor._id;
                      return (
                        <div
                          key={doctor._id}
                          onClick={() => handleDoctorSelect(doctor)}
                          className={`flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition hover:shadow-lg ${
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="relative flex-shrink-0 mb-3 sm:mb-0">
                            {doctor.image ? (
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                                {doctor.name.charAt(0)}
                              </div>
                            )}
                            {isAvailableToday && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 sm:border-3 border-white" />
                            )}
                          </div>

                          <div className="flex-1 sm:ml-4 w-full">
                            <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                              {doctor.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {doctor.departmentId.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                              <div className="flex items-center text-xs sm:text-sm">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1" />
                                <span className="text-green-600 font-medium">
                                  {isAvailableToday ? "Available" : "Available"}
                                </span>
                                <span className="text-gray-600 ml-1">
                                  {isAvailableToday
                                    ? "Today"
                                    : nextDate || "Soon"}
                                </span>
                              </div>
                              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                HSR Layout Location
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-3 w-full sm:w-auto mt-3 sm:mt-0 sm:ml-4">
                            <div className="text-left sm:text-right">
                              <div className="text-base sm:text-lg font-bold text-gray-900">
                                {formatCurrency(doctor.consultationFee || 0)}
                              </div>
                              <div className="text-[10px] sm:text-xs text-gray-500">
                                Consultation Fee
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                    {formData.doctorDetails?.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {formData.doctorDetails?.departmentId.name}
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                {isLeaveDay && (
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-300 text-yellow-700 text-sm">
                    Doctor is on leave on this day.
                    {nextAvailableDate && (
                      <div className="mt-1">
                        Next available date:{" "}
                        <button
                          className="underline font-medium"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              date: nextAvailableDate,
                              slot: "",
                            })
                          }
                        >
                          {nextAvailableDate}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots *
                  </label>
                  {formData.date ? (
                    allSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {allSlots.map((slot, i) => {
                          const isBooked = bookedSlots.includes(slot.start);
                          const isAvailable = slots.some(
                            (s) => s.start === slot.start,
                          );
                          const isSelected =
                            formData.slot === JSON.stringify(slot);

                          const isDisabled = isLeaveDay || isBooked;
                          return (
                            <button
                              key={i}
                              disabled={isDisabled}
                              onClick={() => {
                                if (!isDisabled) {
                                  setFormData({
                                    ...formData,
                                    slot: JSON.stringify(slot),
                                  });
                                }
                              }}
                              className={`px-2 sm:px-4 py-2.5 rounded-lg border-2 font-medium transition text-xs sm:text-sm
    ${
      isLeaveDay
        ? "bg-yellow-50 text-yellow-600 border-yellow-400 cursor-not-allowed"
        : isBooked
          ? "bg-red-100 text-red-600 border-red-400 cursor-not-allowed"
          : isSelected
            ? "bg-blue-600 text-white border-blue-600"
            : isAvailable
              ? "bg-white text-gray-700 border-green-500 hover:bg-green-50"
              : "bg-white text-gray-700 border-gray-300"
    }
  `}
                            >
                              <div className="font-medium">
                                {slot.start} - {slot.end}
                              </div>

                              {isLeaveDay && (
                                <div className="text-[10px] mt-1">On Leave</div>
                              )}

                              {!isLeaveDay && isBooked && (
                                <div className="text-[10px] mt-1 font-semibold">Booked</div>
                              )}
                            </button>
                          );
                        })}


                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg">
                        <p className="text-sm sm:text-base text-gray-600">
                          No slots configured for this day
                        </p>
                        {nextAvailableDate && (
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                date: nextAvailableDate,
                                slot: "",
                              })
                            }
                            className="block mt-3 mx-auto text-blue-600 hover:text-blue-700 underline font-medium text-xs sm:text-sm"
                          >
                            Select next available date ({nextAvailableDate})
                          </button>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg">
                      <p className="text-sm sm:text-base text-gray-600">
                        Please select a date first
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter patient name"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter guardian name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter 10-digit phone number"
                  />
                  {phoneError && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition text-sm sm:text-base"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition text-sm sm:text-base"
                >
                  Cancel
                </button>
              )}

              {step === 1 && (
                <button
                  onClick={handleContinueFromDoctorSelect}
                  className="w-full sm:flex-1 px-6 sm:px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.date || !formData.slot}
                  className="w-full sm:flex-1 px-6 sm:px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 3 && (
                <button
                  onClick={handleSubmit}
                  className="w-full sm:flex-1 px-6 sm:px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition text-sm sm:text-base"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
