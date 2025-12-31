"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { 
  Package, 
  RotateCcw, 
  Activity, 
  ShoppingCart,
  Calendar,
  SearchIcon,
  History,
  CheckCircle2,
  Clock
} from "lucide-react";
import { 
  flexRender, getCoreRowModel, getFilteredRowModel, 
  getSortedRowModel, useReactTable 
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import AuthContext from "@/context/Authcontext";

const MyEquipmentTable = () => {
  const [userAssets, setUserAssets] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active"); // "active" or "history"
  const { user } = useContext(AuthContext);

  // 1. Fetch both Active and Historical assets
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.info?.blitzId) return;
      
      try {
        setDataLoading(true);
        // Fetch items currently held
        const activeRes = await api.get(`/logistics/checkout/${user.info.blitzId}`);
        setUserAssets(activeRes.data);

        // Fetch items previously returned (Archived logs)
        const historyRes = await api.get(`/logistics/history/user/${user.info.blitzId}`);
        setUserHistory(historyRes.data);
      } catch (err) {
        console.error(err);
        toast.error("DATA_SYNC_PROTOCOL_ERROR");
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // 2. Handle Return Action
  const handleReturn = async (logId, itemName) => {
    const confirmReturn = window.confirm(`Initiate digital return for: ${itemName}?`);
    if (!confirmReturn) return;

    const loadId = toast.loading("UPDATING REGISTRY...");
    try {
      await api.delete(`/logistics/return/${logId}`);
      
      // Move item from active to history locally for instant UI feedback
      const returnedItem = userAssets.find(a => a._id === logId);
      setUserAssets(prev => prev.filter(asset => asset._id !== logId));
      setUserHistory(prev => [{ ...returnedItem, type: "RETURN", createdAt: new Date() }, ...prev]);
      
      toast.success("ARCHIVED SUCCESSFULLY", { id: loadId });
    } catch (err) {
      toast.error("PROTOCOL_FAILURE", { id: loadId });
    }
  };

  const columns = [
    {
      header: "Possession Identity",
      accessorKey: "item.name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className={`relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-slate-200 transition-all ${activeTab === 'history' ? 'grayscale opacity-60' : 'group-hover:rotate-2'}`}>
            <Image src={row.original.item.photo} alt="" fill className="object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              {row.original.item.name}
            </h4>
            <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
              CODE: {row.original.item.productCode}
            </span>
          </div>
        </div>
      ),
    },
    { 
      header: "Quantity", 
      accessorKey: "quantity", 
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded text-[14px] font-mono font-black bg-slate-100 text-slate-900">
          {row.getValue("quantity").toString().padStart(2, '0')}
        </span>
      )
    },
    { 
      header: activeTab === "active" ? "Acquired" : "Returned", 
      accessorKey: "createdAt", 
      cell: ({ row }) => (
        <div className="flex flex-col text-[10px] font-bold uppercase italic">
          <span className="text-slate-700 flex items-center gap-1">
            <Calendar size={10} className="text-red-500" />
            {new Date(row.getValue("createdAt")).toLocaleDateString()}
          </span>
          <span className="text-slate-400 font-mono tracking-tighter">
            {new Date(row.getValue("createdAt")).toLocaleTimeString()}
          </span>
        </div>
      )
    },
    { 
      header: "Registry Status", 
      id: "status", 
      cell: () => (
        activeTab === "active" ? (
          <span className="px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border bg-red-50 border-red-100 text-red-600 animate-pulse">
            In_Possession
          </span>
        ) : (
          <span className="px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border bg-emerald-50 border-emerald-100 text-emerald-600">
            Archived_Success
          </span>
        )
      )
    },
    { 
      header: "Action / Verify", 
      id: "actions", 
      cell: ({ row }) => ( 
        activeTab === "active" ? (
          <button 
            onClick={() => handleReturn(row.original._id, row.original.item.name)} 
            className="px-4 py-2 bg-slate-950 text-white text-[9px] font-black uppercase italic tracking-[0.2em] rounded-md hover:bg-red-600 transition-all border-b-4 border-slate-800 active:border-b-0 active:translate-y-1"
          >
            Return Asset
          </button>
        ) : (
          <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase italic">
            <CheckCircle2 size={16} /> returned
          </div>
        )
      )
    },
  ];

  const table = useReactTable({
    data: activeTab === "active" ? userAssets : userHistory,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-10">
      <Toaster position="top-center" />
      
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
            User <span className="text-red-600">Registry</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-2 font-black uppercase tracking-[0.3em] flex items-center gap-2">
            <Activity size={14} className="text-red-500 animate-pulse" /> 
            Operator: {user?.info?.name || "Initializing..."}
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="relative w-full md:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="FILTER REGISTRY..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 outline-none transition-all text-black" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </header>

      {/* TAB SYSTEM */}
      <div className="max-w-7xl mx-auto mb-6 flex gap-2">
        <button 
          onClick={() => setActiveTab("active")}
          className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-t-xl border-t border-x ${activeTab === "active" ? "bg-white border-slate-200 text-slate-950 translate-y-[1px] z-10" : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <ShoppingCart size={14} /> Active Possession ({userAssets.length})
        </button>
        <button 
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-t-xl border-t border-x ${activeTab === "history" ? "bg-white border-slate-200 text-slate-950 translate-y-[1px] z-10" : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <History size={14} /> Log History ({userHistory.length})
        </button>
      </div>

      <main className="max-w-7xl mx-auto border border-slate-200 rounded-b-2xl rounded-tr-2xl overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {table.getHeaderGroups()[0].headers.map(header => (
                  <th key={header.id} className="p-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataLoading ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center font-black text-slate-200 uppercase tracking-[0.4em] italic text-xl animate-pulse">
                    Scanning Neural Link...
                  </td>
                </tr>
              ) : (activeTab === "active" ? userAssets : userHistory).length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center font-black text-slate-300 uppercase italic tracking-widest text-sm">
                    Registry Clear: No data found in this node
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-6 flex justify-between items-center px-2">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
          <span>Blitz ID: {user?.info?.blitzId}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Status: Synchronized</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-900 uppercase">Mist Blitz Logistics</span>
          <RotateCcw className="text-red-500" size={12} />
        </div>
      </footer>
    </div>
  );
};

export default MyEquipmentTable;