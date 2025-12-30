"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  SearchIcon, 
  Filter, 
  Download,
  Calendar
} from "lucide-react";
import { 
  flexRender, getCoreRowModel, getFilteredRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const TransitionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // Replace with your actual history/logs endpoint
        const res = await api.get("/logistics/history");
        setLogs(res.data);
      } catch (err) {
        toast.error("FAILED_TO_SYNC_HISTORY");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const columns = [
    {
      header: "Event",
      accessorKey: "type", // e.g., 'CHECKOUT' or 'RETURN'
      cell: ({ row }) => {
        const isCheckout = row.original.type === "CHECKOUT";
        return (
          <div className={`flex items-center gap-2 font-black italic text-[10px] uppercase tracking-widest ${isCheckout ? 'text-blue-600' : 'text-emerald-600'}`}>
            {isCheckout ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
            {row.original.type}
          </div>
        );
      }
    },
    {
      header: "Asset",
      accessorKey: "item.name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 relative bg-slate-100 rounded border border-slate-200 shrink-0">
             <Image src={row.original.item.photo} alt="" fill className="object-cover opacity-80" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase text-slate-900 leading-none">{row.original.item.name}</span>
            <span className="text-[9px] font-mono text-slate-400 mt-1">#{row.original.item.productCode}</span>
          </div>
        </div>
      )
    },
    {
      header: "Operator",
      accessorKey: "receiver.name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-200 relative">
             <Image src={row.original.receiver.photo} alt="" fill className="object-cover grayscale" />
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase">{row.original.receiver.name}</span>
        </div>
      )
    },
    {
        header: "Timestamp",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <div className="flex flex-col font-mono text-[10px]">
            <span className="text-slate-900 font-bold">{new Date(row.getValue("createdAt")).toLocaleDateString()}</span>
            <span className="text-slate-400">{new Date(row.getValue("createdAt")).toLocaleTimeString()}</span>
          </div>
        )
    },
    {
      header: "System Note",
      accessorKey: "note",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <p className="text-[10px] text-slate-500 font-medium italic truncate">
            {row.original.note || "Auto-logged by System"}
          </p>
        </div>
      )
    }
  ];

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-10 font-sans">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <History size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Registry_Archives</span>
            </div>
            <h1 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
              Transition <span className="text-slate-400 underline decoration-slate-200">Logs</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
               <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                  type="text" 
                  placeholder="SEARCH ARCHIVES..."
                  className="bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-[10px] font-bold uppercase focus:ring-2 focus:ring-slate-100 outline-none w-64"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    table.setGlobalFilter(e.target.value);
                  }}
               />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
               <Filter size={18} />
            </button>
            <button className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
               <Download size={14} /> Export_CSV
            </button>
          </div>
        </div>
      </div>

      {/* LOGS TABLE */}
      <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                   <td colSpan="5" className="py-20 text-center text-slate-300 font-black italic animate-pulse uppercase tracking-[0.5em]">Syncing_Archives...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                   <td colSpan="5" className="py-20 text-center text-slate-300 font-black italic uppercase tracking-[0.5em]">No_History_Found</td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4 border-l border-transparent first:border-l-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
         <div className="flex items-center gap-4">
            <span>Total Transitions: {logs.length}</span>
            <span>Archive Depth: 90 Days</span>
         </div>
         <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>Updated: {new Date().toLocaleTimeString()}</span>
         </div>
      </div>
    </div>
  );
};

export default TransitionLogs;