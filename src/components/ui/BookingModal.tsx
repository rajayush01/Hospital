import React, { useEffect, useState } from "react";
import { X, Search, Filter, Clock, MapPin, ChevronRight } from "lucide-react";

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
  const [step, setStep] = useState(1); // 1: Select Doctor, 2: Select Date & Time, 3: Patient Details
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [nextAvailableDate, setNextAvailableDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
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

  // Check if doctor is available today
  const isDoctorAvailableToday = (doctor: Doctor) => {
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return doctor.schedule?.[todayName]?.length > 0;
  };

  // Get next available date for doctor
  const getNextAvailableDate = (doctor: Doctor) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dayName = days[checkDate.getDay()];
      
      if (doctor.schedule?.[dayName]?.length > 0) {
        return checkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    }
    return null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  /* Load Departments */
  useEffect(() => {
    if (!isOpen) return;
    fetch(`${API_URL}/departments`)
      .then((res) => res.json())
      .then(setDepartments)
      .catch(console.error);
  }, [isOpen]);

  /* Load All Doctors */
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

  /* Filter Doctors */
  useEffect(() => {
    let filtered = doctors;

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (doc) => doc.departmentId._id === selectedDepartment
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.departmentId.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, selectedDepartment, doctors]);

  /* Load All Slots and Booked Slots */
  // const [allSlots, setAllSlots] = useState<Slot[]>([]);
  // const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!formData.doctor || !formData.date || !formData.doctorDetails) return;
    
    // Get day name to fetch schedule
    const dayName = new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const schedule = formData.doctorDetails.schedule?.[dayName] || [];
    
    // Fetch available slots from API
    fetch(`${API_URL}/slots?doctorId=${formData.doctor}&date=${formData.date}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.availableSlots || []);
        setNextAvailableDate(data.nextAvailableDate || null);
        
        // All slots from schedule
        setAllSlots(schedule);
        
        // Calculate booked slots (slots in schedule but not in available)
        const availableStarts = (data.availableSlots || []).map((s: Slot) => s.start);
        const booked = schedule
          .filter((s: Slot) => !availableStarts.includes(s.start))
          .map((s: Slot) => s.start);
        setBookedSlots(booked);
      })
      .catch(console.error);
  }, [formData.doctor, formData.date, formData.doctorDetails]);

  /* Reset on close */
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
      alert("Please select a doctor");
      return;
    }
    setStep(2);
  };

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

  const handleSubmit = async () => {
    if (
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-8">Your appointment has been successfully booked.</p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                onClose();
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition w-full"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 1 && "Select a Doctor"}
                {step === 2 && "Select Date & Time"}
                {step === 3 && "Patient Details"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {step === 1 && "Choose from our experienced medical professionals"}
                {step === 2 && "Pick your preferred appointment slot"}
                {step === 3 && "Enter patient information"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition ${
                      step >= s
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition ${
                        step > s ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* STEP 1: Select Doctor */}
            {step === 1 && (
              <div>
                {/* Search and Filter */}
                <div className="mb-6 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search doctors by name or specialty"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                {/* Doctor List */}
                <div className="space-y-3">
                  {filteredDoctors.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No doctors found matching your criteria
                    </div>
                  ) : (
                    filteredDoctors.map((doctor) => {
                      const isAvailableToday = isDoctorAvailableToday(doctor);
                      const nextDate = !isAvailableToday ? getNextAvailableDate(doctor) : null;
                      const isSelected = formData.doctor === doctor._id;

                      return (
                        <div
                          key={doctor._id}
                          onClick={() => handleDoctorSelect(doctor)}
                          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition hover:shadow-lg ${
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          {/* Doctor Image */}
                          <div className="relative">
                            <img
                              src={doctor.image || "https://via.placeholder.com/80"}
                              alt={doctor.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            {isAvailableToday && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>

                          {/* Doctor Info */}
                          <div className="flex-1 ml-4">
                            <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                            <p className="text-sm text-blue-600 font-medium">
                              {doctor.departmentId.name}
                            </p>

                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="font-medium">
                                  {isAvailableToday ? "Available" : "Available"}
                                </span>
                                <span className="ml-1">
                                  {isAvailableToday ? "Today" : nextDate || "Soon"}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>HSR Layout Location</span>
                              </div>
                            </div>
                          </div>

                          {/* Price and Checkbox */}
                          <div className="text-right ml-4">
                            <div className="text-xl font-bold text-gray-900">
                              {formatCurrency(doctor.consultationFee || 0)}
                            </div>
                            <div className="text-xs text-gray-500">Consultation Fee</div>
                            <div className="mt-2">
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                  isSelected
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && (
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Select Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <img
                      src={formData.doctorDetails?.image || "https://via.placeholder.com/60"}
                      alt={formData.doctorDetails?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold text-lg text-gray-900">
                        {formData.doctorDetails?.name}
                      </h3>
                      <p className="text-sm text-blue-600">
                        {formData.doctorDetails?.departmentId.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Time Slots *
                  </label>
                  {formData.date ? (
                    allSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3">
                        {allSlots.map((slot, i) => {
                          const isBooked = bookedSlots.includes(slot.start);
                          const isAvailable = slots.some(s => s.start === slot.start);
                          const isSelected = formData.slot === JSON.stringify(slot);

                          return (
                            <button
                              key={i}
                              onClick={() => {
                                if (!isBooked) {
                                  setFormData({ ...formData, slot: JSON.stringify(slot) });
                                }
                              }}
                              disabled={isBooked}
                              className={`px-4 py-3 rounded-lg border-2 font-medium transition ${
                                isBooked
                                  ? "bg-red-50 text-red-400 border-red-300 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : isAvailable
                                  ? "bg-white text-gray-700 border-green-500 hover:bg-green-50"
                                  : "bg-white text-gray-700 border-gray-300"
                              }`}
                            >
                              <div className="text-sm">{slot.start} - {slot.end}</div>
                              {isBooked && (
                                <div className="text-xs mt-1">Booked</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No slots configured for this day
                        {nextAvailableDate && (
                          <button
                            onClick={() =>
                              setFormData({ ...formData, date: nextAvailableDate, slot: "" })
                            }
                            className="block mt-3 mx-auto text-blue-600 hover:text-blue-700 underline font-medium"
                          >
                            Select next available date ({nextAvailableDate})
                          </button>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Patient Details */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    placeholder="Enter guardian name (optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition"
              >
                Back
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition"
              >
                Cancel
              </button>
            )}

            {step === 1 && (
              <button
                onClick={handleContinueFromDoctorSelect}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition flex items-center"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}

            {step === 2 && (
              <button
                onClick={() => setStep(3)}
                disabled={!formData.date || !formData.slot}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}

            {step === 3 && (
              <button
                onClick={handleSubmit}
                disabled={!formData.patientName || !formData.phone || phoneError !== ""}
                className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;