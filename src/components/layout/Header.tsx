import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  label: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const navigate = useNavigate();
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between mx-auto max-w-7xl">

        {/* Mobile Logo (left) */}
        <div className="flex items-center lg:hidden">
          <img src={logo} alt="JK Hospitals" className="h-14 rounded-full" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center w-full">

          {/* Left Nav */}
          <div className="flex items-center gap-6 flex-1 justify-end pr-8">
            <NavItem label="DISCOVER JK" />
            <NavItem label="FIND HOSPITAL" />
          </div>

          {/* Center Logo */}
          <div onClick={() => navigate("/")} className="flex justify-center cursor-pointer transition-all duration-300">
            <img
              src={logo}
              alt="JK Hospitals"
              className="h-20 rounded-full"
            />
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-6 flex-1 justify-start pl-8">
            <NavItem label="MEDICAL SERVICES" />
            <NavItem label="HEALTH LIBRARY" />
          </div>
        </div>

        {/* Hamburger Menu (mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white hover:text-gray-300 p-2"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown (unchanged) */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-gray-900 bg-opacity-95 rounded-lg shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <MobileNavItem label="DISCOVER JK" />
            <MobileNavItem label="FIND HOSPITAL" />
            <MobileNavItem label="MEDICAL SERVICES" />
            <MobileNavItem label="HEALTH LIBRARY" />
          </div>
        </div>
      )}
    </nav>
  );
};

/* ---------- Reusable Components ---------- */

const NavItem: React.FC<NavItemProps> = ({ label }) => (
  <button className="text-white hover:text-gray-300 flex items-center gap-2 text-sm xl:text-base">
    {label}
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

const MobileNavItem: React.FC<NavItemProps> = ({ label }) => (
  <button className="text-white hover:text-gray-300 flex items-center justify-between py-2 px-3 rounded hover:bg-gray-800">
    <span>{label}</span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

export default Header;
