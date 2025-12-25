"use client";

import { useState } from "react";

const AddMemberPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    dept: "Computer Science",
    image: "",
    linkedin: "",
  });

  const departments = ["Computer Science", "Electrical", "Mechanical", "Civil", "Business"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Member Data Submitted:", formData);
    // Add your API call here to save the data
    alert("Member added successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Add New Member</h2>
        <p className="text-slate-500 text-sm">Register a new student to a specific department.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              required
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="e.g. Jane Doe"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Roll */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Roll Number</label>
            <input
              type="text"
              required
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="e.g. 102938"
              onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
            />
          </div>
        </div>

        {/* Department Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Department</label>
          <select
            className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white"
            onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Image Link */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Image URL</label>
          <input
            type="url"
            className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="https://example.com/photo.jpg"
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>

        {/* LinkedIn ID */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">LinkedIn ID</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">linkedin.com/in/</span>
            <input
              type="text"
              className="w-full pl-32 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="username"
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98]"
        >
          Save Member
        </button>
      </form>
    </div>
  );
};

export default AddMemberPage;