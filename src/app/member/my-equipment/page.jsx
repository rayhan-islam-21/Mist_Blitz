"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { 
  Package, 
  RotateCcw, 
  Activity, 
  ShoppingCart,
  Calendar,
  SearchIcon
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
  const [dataLoading, setDataLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  // 1. Fetch assets specifically checked out to this user
  useEffect(() => {
    const fetchMyAssets = async () => {
      if (!user?.info?.blitzId) return;
      
      try {
        const res = await api.get(`/logistics/checkout/${user.info.blitzId}`);
        setUserAssets(res.data);
      } catch (err) {
        console.error(err);
        toast.error("FAILED TO SYNC PERSONAL REGISTRY");
      } finally {
        setDataLoading(false);
      }
    };

    fetchMyAssets();
  }, [user]);

  // 2. Handle Return Action
  const handleReturn = async (logId, itemName) => {
    const confirmReturn = window.confirm(`Return ${itemName} to main inventory?`);
    if (!confirmReturn) return;

    const loadId = toast.loading("PROCESSING RETURN...");
    try {
      await api.delete(`/logistics/return/${logId}`);
      setUserAssets(prev => prev.filter(asset => asset._id !== logId));
      toast.success("ASSET RETURNED SUCCESSFULLY", { id: loadId });
    } catch (err) {
      toast.error("RETURN PROTOCOL FAILED", { id: loadId });
    }
  };

  const columns = [
    {
      header: "Possession Identity",
      accessorKey: "item.name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:rotate-2 transition-transform">
            {row.original.item.photo ? (
              <Image src={row.original.item.photo} alt="" fill className="object-cover" />
            ) : (
              <Package className="m-auto mt-4 text-slate-300" size={20} />
            )}
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              {row.original.item.name}
            </h4>
            <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
              CODE: {row.original.item.productCode || "UNASSIGNED"}
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
          {row.getValue("quantity").toString().padStart(2, '0')} UNITS
        </span>
      )
    },
    { 
      header: "Acquisition Date", 
      accessorKey: "createdAt", 
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 uppercase italic">
          <Calendar size={10} className="text-red-500" />
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </div>
      )
    },
    { 
        header: "Status", 
        accessorKey: "status", 
        cell: () => (
          <span className="px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter border bg-green-50 border-green-200 text-green-600">
            Active / In Use
          </span>
        )
      },
    { 
      header: "Action", 
      id: "actions", 
      cell: ({ row }) => ( 
          <button 
            onClick={() => handleReturn(row.original._id, row.original.item.name)} 
            className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase italic tracking-widest rounded hover:bg-red-600 transition-colors"
          >
            Return Asset
          </button> 
      )
    },
  ];

  const table = useReactTable({
    data: userAssets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Filter logic for search bar
  useEffect(() => {
    table.getColumn("item_name")?.setFilterValue(searchTerm);
  }, [searchTerm, table]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-10">
      <Toaster position="top-center" />
      
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
            My <span className="text-red-600">Equipment</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
            <ShoppingCart size={14} className="text-red-500/50" /> 
            Personal Possession Registry
          </p>
        </div>
        <div className="relative w-full md:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="FILTER POSSESSIONS..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 outline-none transition-all" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
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
                    Scanning Personal Registry...
                  </td>
                </tr>
              ) : userAssets.length > 0 ? (
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
                    No equipment currently assigned to your ID
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-6 flex justify-between items-center px-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          Syncing {userAssets.length} Active Assignments
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-900 uppercase">Mist Blitz</span>
          <Activity className="text-red-500 animate-pulse" size={12} />
        </div>
      </footer>
    </div>
  );
};

export default MyEquipmentTable;