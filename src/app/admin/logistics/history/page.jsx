"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  History,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
} from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const AdminHistoryPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMasterLogs = async () => {
      try {
        const res = await api.get("/logistics/history");
        setLogs(res.data);
      } catch (err) {
        toast.error("FAILED TO FETCH ARCHIVES");
      } finally {
        setLoading(false);
      }
    };
    fetchMasterLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.item.name.toLowerCase().includes(search.toLowerCase()) ||
      log.receiver.name.toLowerCase().includes(search.toLowerCase()) ||
      log.receiver.blitzId.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
    if (logs.length === 0) {
      toast.error("NO DATA AVAILABLE TO EXPORT");
      return;
    }
    const headers = ["Event Type,Asset Name,Product Code,Operator Name,Blitz ID,Date,Time\n"];
    const rows = filteredLogs.map((log) => {
      const date = new Date(log.createdAt).toLocaleDateString();
      const time = new Date(log.createdAt).toLocaleTimeString();
      return [
        log.type,
        `"${log.item.name}"`,
        log.item.productCode,
        `"${log.receiver.name}"`,
        log.receiver.blitzId,
        date,
        time,
      ].join(",");
    });

    const csvContent = headers.concat(rows.join("\n")).join("");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Blitz_Audit_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8  min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-none">
              Admin <span className="text-red-600">Archives</span>
            </h1>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">
              Logistics Transition History
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="SEARCH ARCHIVES..."
                className="pl-10 pr-4 py-3 md:py-2 text-slate-900 bg-white border border-slate-200 rounded-xl lg:rounded-lg text-[10px] font-bold w-full lg:w-72 focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-sm lg:shadow-none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={exportToCSV}
              className="bg-slate-900 text-white px-5 py-3 md:py-2 rounded-xl lg:rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 transition-colors cursor-pointer shadow-lg shadow-slate-200 lg:shadow-none"
            >
              <Download size={14} /> <span className="sm:inline">Export_CSV</span>
            </button>
          </div>
        </div>

        {/* LOG TABLE (Desktop) & CARDS (Mobile) */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Desktop Table View */}
          <table className="w-full text-left hidden md:table">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">Event</th>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">Asset Details</th>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">Operator</th>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-20 text-center animate-pulse font-black text-slate-300">
                    SYNCHRONIZING_ARCHIVES...
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5">
                      <StatusBadge type={log.type} />
                    </td>
                    <td className="p-5">
                      <AssetInfo item={log.item} />
                    </td>
                    <td className="p-5">
                      <OperatorInfo receiver={log.receiver} />
                    </td>
                    <td className="p-5">
                      <Timestamp date={log.createdAt} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {loading ? (
              <div className="p-10 text-center animate-pulse font-black text-slate-300 text-xs">
                SYNCHRONIZING...
              </div>
            ) : filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <div key={log._id} className="p-4 flex flex-col gap-4 bg-white">
                  <div className="flex justify-between items-start">
                    <AssetInfo item={log.item} />
                    <StatusBadge type={log.type} />
                  </div>
                  
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <OperatorInfo receiver={log.receiver} />
                    <Timestamp date={log.createdAt} align="right" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-slate-400 text-[10px] font-bold">NO MATCHING ARCHIVES FOUND</div>
            )}
          </div>
        </div>

        {/* FOOTER STATS */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">
          <span>Total Archives Recorded: {logs.length}</span>
        </div>
      </div>
    </div>
  );
};

/* HELPER COMPONENTS FOR CLEANER CODE */

const StatusBadge = ({ type }) => (
  <span className={`flex items-center gap-1 text-[9px] md:text-[10px] font-black italic tracking-widest ${
    type === "RETURN" ? "text-emerald-500" : "text-blue-600"
  }`}>
    {type === "RETURN" ? (
      <><ArrowDownLeft size={14} className="stroke-[3px]" /> <span>RETURNED</span></>
    ) : (
      <><ArrowUpRight size={14} className="stroke-[3px]" /> <span>CHECKOUT</span></>
    )}
  </span>
);

const AssetInfo = ({ item }) => (
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 relative rounded bg-slate-100 border border-slate-200 overflow-hidden grayscale opacity-70 flex-shrink-0">
      <Image src={item.photo} alt="" fill className="object-cover" />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[11px] font-black uppercase text-slate-800 leading-none truncate">
        {item.name}
      </span>
      <span className="text-[9px] font-mono font-bold text-slate-400 mt-1">
        #{item.productCode}
      </span>
    </div>
  </div>
);

const OperatorInfo = ({ receiver }) => (
  <div className="flex items-center gap-2">
    <div className="h-6 w-6 relative rounded-full overflow-hidden border border-slate-200 shrink-0">
      <Image src={receiver.photo} alt="" fill className="object-cover" />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] font-bold text-slate-700 uppercase leading-none truncate">
        {receiver.name}
      </span>
      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">
        {receiver.blitzId}
      </span>
    </div>
  </div>
);

const Timestamp = ({ date, align = "left" }) => (
  <div className={`flex flex-col font-mono text-[9px] md:text-[10px] ${align === "right" ? "text-right" : "text-left"}`}>
    <span className="text-slate-900 font-bold">{new Date(date).toLocaleDateString()}</span>
    <span className="text-slate-400">{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
  </div>
);

export default AdminHistoryPage;