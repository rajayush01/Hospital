import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
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
    // {
    //   icon: Building2,
    //   label: "Excellence Centers",
    //   bgColor: "bg-blue-50",
    //   iconColor: "text-blue-600",
    //   expandBg: "bg-blue-100",
    //   action: () => console.log("Excellence Center"),
    // },
    // {
    //   icon: Shield,
    //   label: "Insurance Partners",
    //   bgColor: "bg-teal-50",
    //   iconColor: "text-teal-600",
    //   expandBg: "bg-teal-100",
    //   action: () => console.log("Insurance Partner"),
    // },
    // {
    //   icon: Stethoscope,
    //   label: "Health Services",
    //   bgColor: "bg-gray-50",
    //   iconColor: "text-gray-600",
    //   expandBg: "bg-gray-100",
    //   action: () => console.log("Healt Services"),
    // },
    // {
    //   icon: Search,
    //   label: "Search",
    //   bgColor: "bg-orange-500",
    //   iconColor: "text-white",
    //   expandBg: "bg-orange-500",
    //   action: () => console.log("Search"),
    // },
  ];

  return (
    <>
      <div
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-0">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="bg-blue-800 hover:bg-blue-700 text-white relative overflow-hidden transition-all duration-300 ease-out shadow-lg hover:shadow-xl group"
              style={{
                width: "2.0rem",
                height: "200px",
                borderTopLeftRadius: index === 0 ? "0.75rem" : "0",
                borderBottomLeftRadius: index === menuItems.length - 1 ? "0.75rem" : "0",
              }}
              aria-label={item.label}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Vertical text */}
                <span
                  className="font-semibold text-sm tracking-wider whitespace-nowrap"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {item.label}
                </span>
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