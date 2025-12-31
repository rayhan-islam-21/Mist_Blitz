"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  History,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Download,
} from "lucide-react";
import api from "@/lib/axios";

const AdminHistoryPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMasterLogs = async () => {
      try {
        const res = await api.get("/logistics/history");
        setLogs(res.data);
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

    // 1. Define CSV Headers
    const headers = [
      "Event Type,Asset Name,Product Code,Operator Name,Blitz ID,Date,Time\n",
    ];

    // 2. Format Data Rows
    const rows = filteredLogs.map((log) => {
      const date = new Date(log.createdAt).toLocaleDateString();
      const time = new Date(log.createdAt).toLocaleTimeString();

      return [
        log.type,
        `"${log.item.name}"`, // Quotes handle names with commas
        log.item.productCode,
        `"${log.receiver.name}"`,
        log.receiver.blitzId,
        date,
        time,
      ].join(",");
    });

    // 3. Create the Blob and Download
    const csvContent = headers.concat(rows.join("\n")).join("");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Blitz_Logistics_Audit_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
  };
  return (
    <div className="p-8 bg- min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase text-slate-900">
              Admin {" "}<span className="text-red-600">Archives</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">
              Transition History
            </p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="SEARCH BY ITEM, NAME, OR ID..."
                className="pl-10 pr-4 py-2 text-slate-900 bg-white border border-slate-200 rounded-lg text-[10px] font-bold w-72 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={exportToCSV}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition-colors cursor-pointer"
            >
              <Download size={14} /> Export_CSV
            </button>
          </div>
        </div>

        {/* LOG TABLE */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">
                  Event
                </th>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">
                  Asset Details
                </th>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">
                  Operator (User)
                </th>
                <th className="p-5 text-[9px] font-black uppercase text-slate-400">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-20 text-center animate-pulse font-black text-slate-300"
                  >
                    SYNCHRONIZING_ARCHIVES...
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-5">
                      <span
                        className={`flex items-center gap-1 text-[10px] font-black italic tracking-widest ${
                          log.type === "RETURN"
                            ? "text-emerald-500"
                            : "text-blue-600"
                        }`}
                      >
                        {/* Visual Directional Icons */}
                        {log.type === "RETURN" ? (
                          <>
                            <ArrowDownLeft size={14} className="stroke-[3px]" />
                            <span>RETURNED</span>
                          </>
                        ) : (
                          <>
                            <ArrowUpRight size={14} className="stroke-[3px]" />
                            <span>CHECKOUT</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 relative rounded bg-slate-100 border border-slate-200 overflow-hidden grayscale opacity-70">
                          <Image
                            src={log.item.photo}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black uppercase text-slate-800 leading-none">
                            {log.item.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-400 mt-1">
                            ID: {log.item.productCode}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 relative rounded-full overflow-hidden border border-slate-200">
                          <Image
                            src={log.receiver.photo}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-700 uppercase leading-none">
                            {log.receiver.name}
                          </span>
                          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">
                            {log.receiver.blitzId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 font-mono text-[10px]">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-slate-400">
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER STATS */}
        <div className="mt-4 flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">
          <span>Total Archives Recorded: {logs.length}</span>
          <span className="flex items-center gap-1">
            <History size={10} /> Data_Integrity: Verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminHistoryPage;
