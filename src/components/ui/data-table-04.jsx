"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  SearchIcon, Package, Trash2, Edit2, 
  ShieldAlert, Rocket, Terminal, Layers,
  ChevronRight, Activity, X
} from "lucide-react";
import { 
  flexRender, getCoreRowModel, getFilteredRowModel, 
  getSortedRowModel, useReactTable 
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "./retro-btn";

const DataTableEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [nameToDelete, setNameToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    quantity: 0,
    memberName: "",
    category: "",
    ownerType: "",
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await api("/equipment");
        setEquipment(res.data);
      } catch (err) {
        toast.error("DATA LINK FAILURE");
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  // Sync TanStack filtering with the search input
  useEffect(() => {
    table.getColumn("name")?.setFilterValue(searchTerm);
  }, [searchTerm]);

  const initiateDelete = (id, name) => {
    setIdToDelete(id);
    setNameToDelete(name);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const loadId = toast.loading("PURGING RECORD...");
    try {
      await api.delete(`/equipment/${idToDelete}`);
      setEquipment(prev => prev.filter(e => e._id !== idToDelete));
      setDeleteModalOpen(false);
      toast.success("ASSET REMOVED", { id: loadId });
    } catch (err) {
      toast.error("DELETION FAILED", { id: loadId });
    }
  };

  const handleEdit = (row) => {
    setEditingRow(row);
    setEditForm({
      name: row.name || "",
      quantity: row.quantity || 0,
      memberName: row.memberName || "",
      category: row.category || "",
      ownerType: row.ownerType || "",
    });
    setEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    const loadId = toast.loading("UPDATING DATA...");
    try {
      const res = await api.put(`/equipment/${editingRow._id}`, editForm);
      setEquipment(prev => prev.map(eq => (eq._id === editingRow._id ? res.data : eq)));
      setEditModalOpen(false);
      toast.success("CHANGES COMMITTED", { id: loadId });
    } catch (err) {
      toast.error("UPDATE FAILED", { id: loadId });
    }
  };

  const columns = [
    {
      header: "Asset Identity",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:rotate-2 transition-transform">
            {row.original.image ? (
              <Image src={row.original.image} alt="" fill className="object-cover" />
            ) : (
              <Package className="m-auto mt-4 text-slate-300" size={20} />
            )}
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              {row.getValue("name")}
            </h4>
            <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
              ID: {row.original.bash || "UNASSIGNED"}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Ownership",
      accessorKey: "ownerType",
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter border bg-slate-100 border-slate-200 text-slate-500">
          {row.getValue("ownerType")}
        </span>
      ),
    },
    {
      header: "Owner Name",
      accessorKey: "memberName",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 uppercase italic">
          <Terminal size={10} className="text-red-500" />
          {row.getValue("memberName") || "-----"}
        </div>
      ),
    },
    {
      header: "Stock Level",
      accessorKey: "quantity",
      cell: ({ row }) => {
        const qty = row.getValue("quantity");
        return (
          <span className={`px-2 py-1 rounded text-[14px] font-mono font-black ${
            qty > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {qty.toString().padStart(2, '0')} UNITS
          </span>
        );
      },
    },
    {
      header: "Mod",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-2 w-16">
          <button onClick={() => handleEdit(row.original)} className="p-2 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <Edit2 size={14} />
          </button>
          <button onClick={() => initiateDelete(row.original._id, row.original.name)} className="p-2 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors text-red-500">
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: equipment,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white text-slate-900 font-sans p-4 md:p-10">
      <Toaster position="top-center" />

      {/* HEADER: Matches AllMembersTable */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
            Asset <span className="text-red-600">Inventory</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
            <ShieldAlert size={14} className="text-red-500/50" /> Secure Admin Database
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="SEARCH REGISTRY..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* MAIN TABLE: Matches AllMembersTable */}
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

      {/* FOOTER: Matches AllMembersTable */}
      <footer className="max-w-7xl mx-auto mt-6 flex justify-between items-center px-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          Tracking {equipment.length} System Assets
        </p>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-900 uppercase">Mist Blitz</span>
            <Rocket className="text-red-500 animate-pulse" size={12} />
        </div>
      </footer>

      {/* DELETE MODAL: Matches AllMembersTable */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white shadow-2xl">
          <div className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center shrink-0 border border-red-200">
                <Trash2 size={22} className="text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-sans uppercase italic tracking-tighter text-slate-950">Confirm <span className="text-red-600">Action</span>?</h3>
                <p className="text-[11px] font-mono font-semibold text-slate-600 leading-relaxed uppercase tracking-tighter">
                  You are about to permanently remove this asset from the database. This action is logged and <span className="text-red-600 underline decoration-2 underline-offset-2">irreversible</span>.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 border-l-4 border-slate-950 shadow-inner">
              <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1 tracking-widest">TARGET_NAME:</span>
              <span className="text-sm font-mono font-black text-slate-950 break-all">{nameToDelete || "NULL_ENTITY"}</span>
            </div>
          </div>
          <div className="bg-slate-950 p-6 flex gap-4">
            <button onClick={() => setDeleteModalOpen(false)} className="flex-1 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors border border-transparent hover:border-slate-700">Cancel</button>
            <button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 font-black uppercase italic tracking-widest transition-all border-b-4 border-red-800 active:border-b-0 active:translate-y-0.5">CONFIRM_DELETE</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL: Re-styled to match the clean Admin look */}
    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
  <DialogContent className="sm:max-w-xl rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white shadow-2xl">
    {/* TOP STATUS BAR */}


    <div className="p-8 space-y-8">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-4xl font-sans md:text-4xl font-black uppercase italic tracking-tighter text-slate-950 leading-none">
          Modify <span className="text-red-600">Equipment</span>
        </h2>
        <p className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest mt-2">
          Asset UID: {editingRow?.bash || "UNKNOWN_ID"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
        {/* READ ONLY IDENTIFIER */}
        <div className="col-span-2 space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <div className="w-1 h-3 bg-slate-300" /> Asset Designation
          </Label>
          <div className="bg-slate-50 p-4 border-l-4 border-slate-950 shadow-inner group">
             <span className="text-lg font-mono font-black text-slate-950 uppercase italic  transition-colors">
              {editForm.name}
            </span>
          </div>
        </div>

        {/* EDITABLE INPUT */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Inventory Count
          </Label>
          <div className="relative group">
            <Input 
              type="number" 
              min={0}
              max={1000}
              value={editForm.quantity} 
              onChange={(e) => setEditForm({...editForm, quantity: Number(e.target.value)})} 
              className="rounded border-2 text-black border-slate-200 h-14 font-black text-3xl  focus:ring-0 transition-all pl-4" 
            />
          </div>
        </div>

        {/* READ ONLY CATEGORY */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Category
          </Label>
          <div className="h-14 bg-slate-100 flex font-sans italic items-center px-4 border border-slate-200">
             <span className="text-[11px] font-black uppercase tracking-tighter text-slate-500">
              {editForm.category || "UNCLASSIFIED"}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* ACTION FOOTER */}
    <div className="bg-slate-950 p-6 flex items-center justify-between gap-4">
      <button 
        onClick={() => setEditModalOpen(false)} 
        className="px-16 py-4 rounded text-[11px] hover:border border-slate-600 font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
      >
       Cancel
      </button>
      
      <Button

        onClick={handleSaveChanges} 
        className="  bg-red-600 hover:bg-red-700 text-white py-2 font-black uppercase italic tracking-[0.15em] transition-all border-b-4 border-red-800 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2"
      >
        Change save <Rocket size={16} className="animate-bounce" />
      </Button>
    </div>
  </DialogContent>
</Dialog>
    </div>
  );
};

export default DataTableEquipment;