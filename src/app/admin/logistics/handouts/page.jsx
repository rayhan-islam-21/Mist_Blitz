"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  SearchIcon, Package, Trash2, 
  ShieldAlert, Rocket, Terminal, Layers,
  Activity, Clock, User, RotateCcw
} from "lucide-react";
import { 
  flexRender, getCoreRowModel, getFilteredRowModel, 
  getSortedRowModel, useReactTable 
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CurrentHandouts = () => {
  const [handouts, setHandouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Return Modal State
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedHandout, setSelectedHandout] = useState(null);

  useEffect(() => {
    const fetchHandouts = async () => {
      try {
        const res = await api.get("/logistics/checkout");
        setHandouts(res.data);
      } catch (err) {
        toast.error("LOGISTICS LINK FAILURE");
      } finally {
        setLoading(false);
      }
    };
    fetchHandouts();
  }, []);

  // Sync TanStack filtering
  useEffect(() => {
    table.getColumn("receiver_name")?.setFilterValue(searchTerm);
  }, [searchTerm]);

  const initiateReturn = (handout) => {
    setSelectedHandout(handout);
    setReturnModalOpen(true);
  };

  const confirmReturn = async () => {
    const loadId = toast.loading("RE-INTEGRATING ASSET...");
    try {
      // Adjust this endpoint based on your backend
      await api.post(`/logistics/return/${selectedHandout._id}`);
      setHandouts(prev => prev.filter(h => h._id !== selectedHandout._id));
      setReturnModalOpen(false);
      toast.success("INVENTORY RESTORED", { id: loadId });
    } catch (err) {
      toast.error("RETURN PROTOCOL FAILED", { id: loadId });
    }
  };

  const columns = [
    {
      header: "Asset Identity",
      accessorKey: "item.name",
      id: "asset_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:rotate-2 transition-transform">
            <Image src={row.original.item.photo} alt="" fill className="object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              {row.original.item.name}
            </h4>
            <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase">
              CODE: {row.original.item.productCode}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Possessor",
      accessorKey: "receiver.name",
      id: "receiver_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-200 relative shrink-0">
                <Image src={row.original.receiver.photo} alt="" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
                <span className="text-[11px] font-black text-slate-700 uppercase italic leading-none">
                    {row.original.receiver.name}
                </span>
                <span className="text-[9px] font-mono font-bold text-red-500 uppercase">
                    {row.original.receiver.blitzId}
                </span>
            </div>
        </div>
      ),
    },
    {
      header: "Load Out",
      accessorKey: "quantity",
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded text-[14px] font-mono font-black bg-red-50 text-red-600">
          -{row.getValue("quantity").toString().padStart(2, '0')} UNITS
        </span>
      ),
    },
    {
      header: "Time Elapsed",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="flex flex-col text-[10px] font-bold text-slate-400 uppercase">
          <span className="flex items-center gap-1 text-slate-900 font-black italic">
            <Clock size={10} className="text-red-500" />
            {new Date(row.getValue("createdAt")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[8px] mt-1">{new Date(row.getValue("createdAt")).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      header: "Protocol",
      id: "actions",
      cell: ({ row }) => (
        <button 
          onClick={() => initiateReturn(row.original)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest hover:bg-green-600 transition-colors rounded-lg border-b-4 border-slate-800 active:border-b-0 active:translate-y-1"
        >
          <RotateCcw size={12} /> Return
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: handouts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white text-slate-900 font-sans p-4 md:p-10">
      <Toaster position="top-center" />

      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-slate-950">
            Active <span className="text-red-600">Handouts</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
            <Activity size={14} className="text-red-500 animate-pulse" /> Outbound Asset Monitoring
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="SEARCH OPERATORS..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* MAIN TABLE */}
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
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center font-black text-slate-200 uppercase tracking-[0.4em] italic text-xl animate-pulse">
                    Scanning Database...
                  </td>
                </tr>
              ) : handouts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center font-black text-slate-200 uppercase tracking-[0.4em] italic text-xl">
                    No Active Outflows
                  </td>
                </tr>
              ) : table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto mt-6 flex justify-between items-center px-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          Tracking {handouts.length} Outbound Sessions
        </p>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-900 uppercase">Mist Blitz</span>
            <Rocket className="text-red-500 animate-pulse" size={12} />
        </div>
      </footer>

      {/* RETURN MODAL (Reusing your Delete Modal style) */}
      <Dialog open={returnModalOpen} onOpenChange={setReturnModalOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white shadow-2xl">
          <div className="p-8 space-y-6 text-black">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 flex items-center justify-center shrink-0 border border-green-200">
                <RotateCcw size={22} className="text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-sans uppercase italic tracking-tighter text-slate-950">
                    Terminate <span className="text-green-600">Outflow</span>?
                </h3>
                <p className="text-[11px] font-mono font-semibold text-slate-600 leading-relaxed uppercase tracking-tighter">
                  You are about to re-integrate this asset into the main stock. This will close the active session for the operator.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 border-l-4 border-slate-950 shadow-inner">
              <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1 tracking-widest uppercase">Target_Asset:</span>
              <span className="text-sm font-mono font-black text-slate-950 break-all uppercase italic">
                {selectedHandout?.item?.name || "NULL_ENTITY"}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 block mt-2 tracking-widest uppercase">Possessor:</span>
              <span className="text-sm font-mono font-black text-red-600 uppercase">
                {selectedHandout?.receiver?.name || "NULL_USER"}
              </span>
            </div>
          </div>
          <div className="bg-slate-950 p-6 flex gap-4">
            <button 
                onClick={() => setReturnModalOpen(false)} 
                className="flex-1 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors border border-transparent hover:border-slate-700"
            >
                Cancel
            </button>
            <button 
                onClick={confirmReturn} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 font-black uppercase italic tracking-widest transition-all border-b-4 border-green-800 active:border-b-0 active:translate-y-0.5"
            >
                CONFIRM_RETURN
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrentHandouts;