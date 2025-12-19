import React, { useState, useEffect } from "react";
import { User, Building2, Shield, Stethoscope, Search } from "lucide-react";
import BookingModal from "../ui/BookingModal";

interface FloatingSidebarProps {
  heroSectionId?: string;
}

const FloatingSidebar: React.FC<FloatingSidebarProps> = ({
  heroSectionId = "hero-section",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById(heroSectionId);
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroSectionId]);

  const menuItems = [
    {
      icon: User,
      label: "Book Appointment",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      expandBg: "bg-amber-100",
      action: () => setIsModalOpen(true),
    },
    {
      icon: Building2,
      label: "Excellence Centers",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      expandBg: "bg-blue-100",
      action: () => console.log("Excellence Center"),
    },
    {
      icon: Shield,
      label: "Insurance Partners",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      expandBg: "bg-teal-100",
      action: () => console.log("Insurance Partner"),
    },
    {
      icon: Stethoscope,
      label: "Health Services",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      expandBg: "bg-gray-100",
      action: () => console.log("Healt Services"),
    },
    {
      icon: Search,
      label: "Search",
      bgColor: "bg-orange-500",
      iconColor: "text-white",
      expandBg: "bg-orange-500",
      action: () => console.log("Search"),
    },
  ];

  return (
    <>
      <div
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`${item.bgColor} ${item.iconColor} group relative overflow-hidden transition-all duration-300 ease-out shadow-lg hover:shadow-xl`}
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "1.75rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.width = "280px";
                e.currentTarget.style.borderRadius = "1.75rem";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.width = "3rem";
                e.currentTarget.style.borderRadius = "1.75rem";
              }}
              aria-label={item.label}
            >
              <div className="absolute inset-0 flex items-center">
                {/* Icon container - stays on left */}
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>

                {/* Text and arrow - appear on hover */}
                <div className="flex items-center justify-between flex-1 pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className={`font-semibold text-base whitespace-nowrap ${index === 4 ? "text-white" : "text-gray-800"}`}
                  >
                    {item.label}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${index === 4 ? "bg-orange-600" : "bg-blue-500"}`}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FloatingSidebar;
