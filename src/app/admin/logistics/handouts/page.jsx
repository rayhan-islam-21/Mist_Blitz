"use client";

import { useEffect, useState } from "react";
import { Clock, RotateCcw, User, Package, Terminal, Activity } from "lucide-react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";

const CurrentHandouts = () => {
  const [handouts, setHandouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHandouts = async () => {
      try {
        const res = await api.get("/handouts?status=ACTIVE");
        setHandouts(res.data);
      } catch (err) {
        toast.error("HANDOUT_LINK_FAILURE");
      } finally {
        setLoading(false);
      }
    };
    fetchHandouts();
  }, []);

  const handleReturn = async (handout) => {
    const loadId = toast.loading("RE-INTEGRATING ASSET...");
    try {
      // 1. Logic: Update main inventory (Increment)
      // 2. Logic: Mark handout as RETURNED or Delete it
      await api.post(`/handouts/return/${handout._id}`); 
      
      setHandouts(prev => prev.filter(h => h._id !== handout._id));
      toast.success("INVENTORY_RESTORED", { id: loadId });
    } catch (err) {
      toast.error("RETURN_PROTOCOL_FAILED", { id: loadId });
    }
  };

  const columns = [
    {
      header: "Asset_In_Field",
      accessorKey: "assetName",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
            <Package size={16} className="text-slate-400" />
          </div>
          <span className="font-black uppercase italic text-sm text-slate-900 tracking-tighter">
            {row.getValue("assetName")}
          </span>
        </div>
      ),
    },
    {
      header: "Possessor",
      accessorKey: "memberName",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 uppercase italic">
          <User size={12} className="text-red-500" />
          {row.getValue("memberName")}
        </div>
      ),
    },
    {
      header: "Qty_Out",
      accessorKey: "quantity",
      cell: ({ row }) => (
        <span className="font-mono font-black text-red-600 bg-red-50 px-2 py-1 rounded">
          -{row.getValue("quantity")} UNITS
        </span>
      ),
    },
    {
        header: "Time_Elapsed",
        accessorKey: "issueDate",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
            <Clock size={12} />
            {new Date(row.getValue("issueDate")).toLocaleTimeString()}
          </div>
        ),
      },
    {
      header: "Protocol",
      id: "actions",
      cell: ({ row }) => (
        <button 
          onClick={() => handleReturn(row.original)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest hover:bg-green-600 transition-colors rounded"
        >
          <RotateCcw size={12} /> Return_Asset
        </button>
      ),
    },
  ];

  const table = useReactTable({ data: handouts, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="p-10 space-y-8 bg-white min-h-screen">
      <Toaster />
      <header className="border-b border-slate-100 pb-6">
        <h1 className="text-5xl font-sans font-black uppercase italic tracking-tighter text-slate-950 leading-none">
          Active <span className="text-red-600">Handouts</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <Activity size={14} className="text-red-500 animate-pulse" /> Outbound Asset Monitoring
        </p>
      </header>

      <main className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th key={header.id} className="p-5 text-left text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default CurrentHandouts;