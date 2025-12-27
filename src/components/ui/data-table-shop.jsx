"use client";

import { useState, useEffect } from "react";
import {
  Package,
  FilterIcon,
  User,
  Layers,
  Activity,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";

const CheckoutEquipmentTable = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([{ id: "name", desc: false }]);

  // Checkout State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [checkoutQty, setCheckoutQty] = useState(1);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await api.get("/equipment");
        console.log("Fetched Equipment:", res.data);
        setEquipment(res.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  const handleOpenCheckout = (asset) => {
    setSelectedAsset(asset);
    setCheckoutQty(1);
    setCheckoutModalOpen(true);
  };

  const confirmCheckout = async () => {
    if (!selectedAsset || checkoutQty > selectedAsset.quantity) {
      toast.error("ERROR: Insufficient stock.");
      return;
    }

    try {
      const newQty = selectedAsset.quantity - checkoutQty;
      const res = await api.put(`/equipment/${selectedAsset._id}`, { quantity: newQty });

      setEquipment((prev) =>
        prev.map((eq) => (eq._id === selectedAsset._id ? res.data : eq))
      );

      setCheckoutModalOpen(false);
      toast.success("CHECKOUT_COMPLETE");
    } catch (err) {
      toast.error("SYSTEM_FAILURE: Checkout failed.");
    }
  };

  const columns = [
    {
      header: "Equipment Asset",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4 py-1">
          <Avatar className="rounded-xl w-14 h-14 border-2 border-slate-100 shadow-sm">
            <AvatarImage src={row.original.image} className="object-cover" />
            <AvatarFallback className="bg-slate-50 text-slate-400"><Package size={16} /></AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-sans font-black italic uppercase text-slate-900 text-sm leading-none">
              {row.getValue("name")}
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400 mt-1 uppercase">
              ID: {row.original.bash}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Owner Name",
      accessorKey: "memberName",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <User size={12} className="text-red-500" />
          <span className="font-bold text-slate-700 font-sans italic uppercase tracking-tight text-xs">
            {row.getValue("memberName") || "MIST_BLITZ"}
          </span>
        </div>
      ),
    },
    {
      header: "Availability",
      accessorKey: "quantity",
      cell: ({ row }) => {
        const qty = row.getValue("quantity");
        return (
          <div className="flex items-center gap-3">
            <span className={cn(
              "w-8 h-8 flex items-center justify-center font-mono font-black text-sm rounded-lg border-b-2",
              qty > 0 ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
            )}>
              {qty}
            </span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Units</span>
          </div>
        );
      },
    },
    {
      header: "System Actions",
      id: "actions",
      cell: ({ row }) => (
        <Button
          disabled={row.original.quantity <= 0}
          onClick={() => handleOpenCheckout(row.original)}
          className="bg-slate-950 hover:bg-red-600 text-white rounded-none border-b-4  border-red-800 cursor-pointer italic uppercase text-[10px] tracking-widest transition-all active:translate-y-1"
        >
          {row.original.quantity > 0 ? "Checkout" : "Out_Of_Stock"}
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: equipment,
    columns,
    state: { columnFilters, sorting },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) return <div className="h-screen flex items-center justify-center font-black uppercase italic tracking-widest">Loading_Ledger...</div>;

  return (
    <div className="w-full px-6 py-12 space-y-8 animate-in fade-in duration-700">
        <Toaster position="top-right" reverseOrder={false} />
      
      {/* Header Section (Same Skew UI) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl italic font-sans font-black text-slate-900 uppercase tracking-tighter leading-none">
            Asset <span className="text-red-600">Checkout</span>
          </h2>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.4em] ml-1">Logistics Terminal</p>
        </div>

        <div className="bg-slate-900 text-white px-6 py-3 rounded-none skew-x-[-12deg] shadow-xl flex items-center gap-4 border-r-4 border-red-600">
          <div className="skew-x-[12deg] flex items-center gap-3">
            <ShoppingCart size={20} className="text-red-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none text-slate-400">Inventory_Items</span>
              <span className="text-xl font-mono font-black leading-none mt-1">{equipment.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal (Same Heavy Border UI) */}
      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
  <DialogContent className="sm:max-w-3xl border-[6px] border-slate-950 p-0 overflow-hidden bg-white font-sans shadow-[30px_30px_0px_0px_rgba(0,0,0,0.1)] selection:bg-red-600 selection:text-white">
    
    {/* HEADER: TERMINAL STYLE */}
    <div className="bg-slate-950 px-6 py-4 flex justify-between items-center border-b-[6px] border-red-600 relative overflow-hidden">
      {/* Background Scanline Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-4 bg-red-600 animate-[pulse_0.8s_infinite]" />
          <span className="w-2.5 h-4 bg-slate-700" />
          <span className="w-2.5 h-4 bg-slate-800" />
        </div>
        <div className="flex flex-col">
          <DialogTitle className="text-white font-black uppercase italic tracking-[0.2em] text-[11px] leading-none">
            Checkout_Protocol_Active
          </DialogTitle>
          <span className="text-[8px] font-bold text-red-500 uppercase tracking-[0.3em] mt-1">
            Status: Priority_Override_Authorized
          </span>
        </div>
      </div>
      <div className="text-slate-700 font-mono text-[10px] hidden sm:block">
        SYS_LOG: {new Date().getTime()}
      </div>
    </div>

    <div className="p-10 space-y-10 relative">
      {/* Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden select-none">
        <span className="text-[12rem] font-black italic uppercase -rotate-12">
          OUT_BOUND
        </span>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-red-600" />
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">Transaction_Start</span>
            </div>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter text-slate-950 leading-[0.8] py-2">
              Checkout <span className="text-red-600">Window</span>
            </h3>
          </div>
          <div className="w-16 h-16 bg-slate-950 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] transform transition-transform hover:scale-105 cursor-help">
            <ShoppingCart size={32} className="text-white" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 mt-10">
          {/* [01] Asset Display */}
          <div className="col-span-12 space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <span className="text-slate-950">[ 01 ]</span> Target_Designation
            </Label>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-slate-200 group-hover:bg-red-600 transition-colors duration-300" />
              <Input 
                value={selectedAsset?.name} 
                readOnly 
                className="relative rounded-none border-none bg-white h-16 px-6 text-2xl font-black uppercase italic text-slate-950 focus-visible:ring-0" 
              />
            </div>
          </div>

          {/* [02] Availability */}
          <div className="col-span-12 md:col-span-6 space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span className="text-slate-950">[ 02 ]</span> Max_Available
            </Label>
            <div className="h-16 border-2 border-dashed border-slate-200 flex items-center justify-between px-5 font-black text-2xl text-slate-300 bg-slate-50/50">
              <span className="text-sm font-mono opacity-50 uppercase">Count:</span>
              <span>{selectedAsset?.quantity} <span className="text-sm font-mono tracking-tighter uppercase ml-1">Units</span></span>
            </div>
          </div>

          {/* [03] Withdraw Input */}
          <div className="col-span-12 md:col-span-6 space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-red-600 animate-pulse">
              [ 03 ] Withdraw_Amount
            </Label>
            <div className="relative group">
               {/* Accent corners for input */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-600 z-20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-600 z-20" />
              <Input 
                type="number" 
                min="1" 
                max={selectedAsset?.quantity} 
                value={checkoutQty} 
                onChange={(e) => setCheckoutQty(Number(e.target.value))}
                className="rounded-none border-2 text-black border-slate-950 h-16 px-6 font-black text-3xl focus-visible:ring-0 focus-visible:border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)] bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* FOOTER: ACTION ZONE */}
    <div className="bg-slate-950 p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-1 text-left w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
            System_Ready_For_Transfer
          </span>
        </div>
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest max-w-[200px]">
          Proceeding will decrease stock levels permanently.
        </p>
      </div>

      <div className="flex w-full sm:w-auto gap-4">
        <button 
          onClick={() => setCheckoutModalOpen(false)} 
          className="flex-1 sm:flex-none px-8 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors border border-transparent hover:border-red-900/30"
        >
          _ABORT
        </button>
        <Button 
          onClick={confirmCheckout} 
          className="flex-1 sm:flex-none bg-red-600 hover:bg-white hover:text-red-600 text-white rounded-none px-10 py-8 font-black uppercase italic tracking-[0.2em] transition-all border-2 border-red-600 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1 group"
        >
          <span className="flex items-center gap-3">
            COMMIT_TRANSFER 
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </span>
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

      {/* Table Container (Same Design) */}
      <div className="rounded-none border-x border-b border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="bg-slate-900 p-6 border-b-4 border-red-600">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Filter column={table.getColumn("name")} />
            <Filter column={table.getColumn("memberName")} />
            <Filter column={table.getColumn("quantity")} />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map(header => (
                  <TableHead key={header.id} className="h-14 text-slate-900 font-black text-[10px] uppercase tracking-[0.15em] px-6">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className="hover:bg-red-50/30 transition-all border-b border-slate-100">
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="px-6 py-5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Filter Component (Original Terminal Style)
function Filter({ column }) {
  if (!column) return null;
  const columnFilterValue = column.getFilterValue();
  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
        {typeof column.columnDef.header === "string" ? column.columnDef.header : "Field"}
      </Label>
      <Input
        className="h-10 bg-slate-800 border-none rounded-none focus-visible:ring-1 focus-visible:ring-red-600 font-black italic text-xs uppercase text-white placeholder:text-slate-600 tracking-widest px-4"
        value={columnFilterValue ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder="Filter..."
      />
    </div>
  );
}

export default CheckoutEquipmentTable;