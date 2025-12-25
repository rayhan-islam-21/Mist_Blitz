"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaCheck, FaSearch } from "react-icons/fa";
import { AiOutlineTeam } from 'react-icons/ai';

const PremiumDropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Helper to check if an option is selected (handles both string and array)
  const isSelected = (option) => {
    if (Array.isArray(selected)) {
      return selected.includes(option);
    }
    return selected === option;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between pl-11 pr-5 py-3.5 rounded-2xl border transition-all duration-300 outline-none
          ${
            isOpen
              ? "border-red-500 ring-4 ring-red-500/10 bg-white shadow-lg shadow-red-50"
              : "border-slate-200 bg-slate-50/50 hover:border-red-300 hover:bg-white"
          }`}
      >
        <AiOutlineTeam
          className={`absolute left-4 transition-colors duration-300 ${
            isOpen ? "text-red-500" : "text-slate-400"
          }`}
        />
        <span
          className={`text-sm font-semibold truncate pr-2 ${
            selected && (Array.isArray(selected) ? selected.length > 0 : true) 
              ? "text-slate-900" 
              : "text-slate-400"
          }`}
        >
          {/* Display logic: comma separated if array, else single string */}
          {Array.isArray(selected) 
            ? (selected.length > 0 ? selected.join(", ") : "Select Departments")
            : (selected || "Select Option")}
        </span>
        <FaChevronDown
          className={`text-xs transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180 text-red-500" : "text-slate-400"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[100] w-full mt-2 bg-white rounded-2xl shadow-2xl shadow-red-900/10 border border-slate-100 overflow-hidden"
          >
            <div className="p-3 border-b border-slate-50">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-red-500/20 outline-none"
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const active = isSelected(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onSelect(option);
                        // If it's a single select (Position), close it. 
                        // If it's multi (Array), keep it open for more selections.
                        if (!Array.isArray(selected)) setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all text-left
                        ${
                          active
                            ? "bg-red-50 text-red-600 font-bold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-red-600"
                        }`}
                    >
                      <span className="flex-1">{option}</span>
                      {active && <FaCheck size={10} className="shrink-0 ml-2" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 font-medium">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumDropdown;