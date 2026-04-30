import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Interactive Timeline', isActive: true },
    { label: 'Voter Quest', isActive: false },
    { label: 'Myth vs. Fact', isActive: false },
    { label: 'Civic Guru', isActive: false },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-[#FDFBF7]/90 backdrop-blur-lg border-b border-[#1A365D]/10 shadow-sm transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1A365D] rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-[#FDFBF7] font-bold text-xl">DJ</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#1A365D]">
            Democracy <span className="text-[#E47A2E]">Journey</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    link.isActive
                      ? 'text-[#E47A2E] border-b-2 border-[#E47A2E]'
                      : 'text-[#1A365D]/70 hover:text-[#1A365D]'
                  }`}
                  aria-current={link.isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#1A365D] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-[#1A365D]/10 shadow-lg py-4 px-6 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  className={`text-base font-semibold w-full text-left ${
                    link.isActive ? 'text-[#E47A2E]' : 'text-[#1A365D]/70'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
