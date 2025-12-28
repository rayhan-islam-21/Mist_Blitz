"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  FaLinkedin, FaSearch, FaTrash, FaEdit, 
  FaShieldAlt, FaRocket, FaTerminal, FaUser 
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";

const AllMembersTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/members"); 
        const data = res.data;
        setMembers(data);
      } catch (error) {
        toast.error("DATA LINK FAILURE");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.roll.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-10 selection:bg-red-50">
      <Toaster position="top-center" />
      
      {/* HEADER: Matching your Onboarding header style */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
            Active <span className="text-red-600">Members</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
            <FaShieldAlt className="text-red-500/50" /> Secure Admin Database
          </p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
          <input 
            type="text"
            placeholder="SEARCH REGISTRY..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* TACTICAL TABLE CONTAINER */}
      <main className="max-w-7xl mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Identity Card</th>
                <th className="p-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Command Level</th>
                <th className="p-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Team Mesh</th>
                <th className="p-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Serial ID</th>
                <th className="p-5 text-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Mod</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center font-black text-slate-200 uppercase tracking-[0.4em] italic text-xl animate-pulse">
                    Scanning Database...
                  </td>
                </tr>
              ) : filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-slate-50 transition-colors group">
                  {/* PERSONNE IDENTITY */}
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Mini ID Card Frame */}
                      <div className="relative h-14 w-14 shrink-0 bg-amber-400 p-0.5 rounded-lg hover:rotate-2 group-hover:rotate-0 transition-transform">
                        <div className="relative h-full w-full bg-slate-800 rounded-md overflow-hidden">
                          {member.image ? (
                            <Image src={member.image} alt="" fill className="object-cover" />
                          ) : (
                            <FaUser className="m-auto mt-4 text-slate-600" />
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                          {member.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          {member.linkedin && (
                            <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" className="text-[#0077b5] hover:text-red-600 transition-colors">
                              <FaLinkedin size={12} />
                            </a>
                          )}
                          <span className="text-[10px] font-bold text-slate-400">ID: {member.roll}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* COMMAND LEVEL */}
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter border ${
                      member.position.includes('Senior') || member.position === "Lead"
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-600'
                      : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}>
                      {member.position}
                    </span>
                  </td>

                  {/* TEAM MESH */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {member.techDept?.map((t, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[7px] font-black uppercase border border-red-100 rounded">
                          {t}
                        </span>
                      ))}
                      {member.nonTechDept?.map((nt, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[7px] font-black uppercase rounded">
                          {nt}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* SERIAL ID (Monospace) */}
                  <td className="p-4 font-mono">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                      <FaTerminal size={8} className="text-red-500" />
                      {member.blitzId || "UNASSIGNED"}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-all">
                        <FaEdit size={14} />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* FOOTER: Matching your sidebar status */}
      <footer className="max-w-7xl mx-auto mt-6 flex justify-between items-center px-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          Showing {filteredMembers.length} Active Personnel
        </p>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-900 uppercase">Mist Blitz © 2025</span>
            <FaRocket className="text-red-500 animate-pulse" size={12} />
        </div>
      </footer>
    </div>
  );
};

export default AllMembersTable;