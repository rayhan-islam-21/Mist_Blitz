"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { 
  SearchIcon, Package, ShoppingCart, Terminal, 
  Rocket, Activity 
} from "lucide-react";
import { 
  flexRender, getCoreRowModel, getFilteredRowModel, 
  getSortedRowModel, useReactTable 
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/context/Authcontext";

const CheckoutEquipmentTable = () => {
  const [equipment, setEquipment] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Enriched User state from AuthProvider (contains 'info' object from MongoDB)
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log("LOGGED OPERATOR PROFILE:", user);
    }
  }, [user]);
  
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [checkoutQty, setCheckoutQty] = useState(1);

  // States for the form inputs
  const [receiverName, setReceiverName] = useState("");
  const [receiverBlitzId, setReceiverBlitzId] = useState("");
  const [receiverPhoto, setReceiverPhoto] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await api("/equipment");
        setEquipment(res.data);
      } catch (err) {
        toast.error("DATA LINK FAILURE");
      } finally {
        setDataLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  // 2. UPDATED AUTO-FILL: Pulls from user.info (MongoDB structure)
  const handleOpenCheckout = (asset) => {
    setSelectedAsset(asset);
    setCheckoutQty(1);

    // If MongoDB info exists, pre-fill the form with Rayhan's data
    if (user && user.info) {
      setReceiverName(user.info.name || "");        
      setReceiverBlitzId(user.info.blitzId || "");  
      setReceiverPhoto(user.info.image || "");      
    } else if (user) {
      // Fallback to Firebase basic data if MongoDB sync hasn't finished
      setReceiverName(user.displayName || "");
      setReceiverBlitzId("");
      setReceiverPhoto("");
    }
    
    setCheckoutModalOpen(true);
  };

  // 3. UPDATED SUBMIT: Uses MongoDB ID and specific fields for the payload
  const confirmCheckout = async () => {
    if (!selectedAsset) return;

    if (checkoutQty > selectedAsset.quantity) {
      toast.error("INSUFFICIENT STOCK");
      return;
    }
    
    if (!receiverName || !receiverBlitzId) {
      toast.error("RECEIVER NAME & ID REQUIRED");
      return;
    }

    const loadId = toast.loading("PROCESSING TRANSFER...");
    try {
      const payload = {
        equipmentId: selectedAsset._id,
        quantity: checkoutQty,
        item: {
          name: selectedAsset.name,
          productCode: selectedAsset.bash,
          photo: selectedAsset.image
        },
        receiver: {
          name: receiverName, 
          blitzId: receiverBlitzId,
          photo: receiverPhoto
        }
      };

      console.log(payload)

      await api.post("/logistics/checkout", payload);

      // Local state update to reflect new quantity immediately
      setEquipment(prev => prev.map(eq => 
        (eq._id === selectedAsset._id ? { ...eq, quantity: eq.quantity - checkoutQty } : eq)
      ));
      
      setCheckoutModalOpen(false);
      toast.success("CHECKOUT SUCCESSFUL", { id: loadId });
    } catch (err) {
      console.error(err);
      toast.error("CHECKOUT FAILED", { id: loadId });
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
    { header: "Ownership", accessorKey: "ownerType", cell: ({ row }) => ( <span className="px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter border bg-slate-100 border-slate-200 text-slate-500">{row.getValue("ownerType")}</span> )},
    { header: "Owner Name", accessorKey: "memberName", cell: ({ row }) => ( <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 uppercase italic"><Terminal size={10} className="text-red-500" />{row.getValue("memberName") || "- - - -"}</div> )},
    { header: "Stock Level", accessorKey: "quantity", cell: ({ row }) => { const qty = row.getValue("quantity"); return ( <span className={`px-2 py-1 rounded text-[14px] font-mono font-black ${qty > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{qty.toString().padStart(2, '0')} UNITS</span> ); }},


    { header: "Action", id: "actions", cell: ({ row }) => ( <button onClick={() => handleOpenCheckout(row.original)} disabled={row.original.quantity <= 0} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase italic tracking-widest rounded hover:bg-red-600 disabled:bg-slate-100 disabled:text-slate-300 transition-colors">Checkout</button> )},
  ];

  const table = useReactTable({
    data: equipment,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(searchTerm);
  }, [searchTerm, table]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-10">
      <Toaster position="top-center" />
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Asset <span className="text-red-600">Checkout</span></h1>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2"><ShoppingCart size={14} className="text-red-500/50" /> Logistics Distribution Portal</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
          <input type="text" placeholder="FILTER ASSETS..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                <tr><td colSpan="5" className="p-20 text-center font-black text-slate-200 uppercase tracking-[0.4em] italic text-xl animate-pulse">Scanning Data...</td></tr>
              ) : table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-4">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-6 flex justify-between items-center px-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Ready for {equipment.length} Asset Transfers</p>
        <div className="flex items-center gap-3"><span className="text-[10px] font-bold text-slate-900 uppercase">Mist Blitz</span><Activity className="text-red-500 animate-pulse" size={12} /></div>
      </footer>

      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        <DialogContent className="sm:max-w-xl rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white shadow-2xl">
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-3xl font-black font-sans uppercase italic tracking-tighter text-slate-950 leading-none">Confirm <span className="text-red-600">Checkout</span></h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Receiver Name</Label>
                  <Input 
                    value={receiverName} 
                    readOnly
                    placeholder="NAME"
                    className="rounded-none font-sans font-black text-slate-900 border-2 border-slate-950 h-12 italic uppercase" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Blitz ID</Label>
                  <Input 
                    value={receiverBlitzId} 
                    readOnly
                    placeholder="ID"
                    className="rounded-none text-3xl font-sans  italic text-slate-900 border-2 border-slate-950 h-12 font-black uppercase" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><div className="w-1 h-3 bg-slate-300" /> Target Asset</Label>
                <div className="bg-slate-50 p-4 border-l-4 border-slate-950"><span className="text-lg font-mono font-black text-slate-950 uppercase ">{selectedAsset?.name}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available</Label>
                  <div className="h-14 bg-slate-100 flex items-center px-4 border border-slate-200 font-mono font-black text-slate-500">{selectedAsset?.quantity} UNITS</div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Withdrawal Qty</Label>
                  <Input type="number" min={1} max={selectedAsset?.quantity} value={checkoutQty} onChange={(e) => setCheckoutQty(Number(e.target.value))} className="rounded border text-black border-slate-950 h-14 font-black text-3xl focus:ring-0" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 flex items-center justify-between gap-4">
            <button onClick={() => setCheckoutModalOpen(false)} className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Cancel</button>
            <button onClick={confirmCheckout} disabled={authLoading} className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-black uppercase italic tracking-widest transition-all border-b-4 border-red-800 active:border-b-0 active:translate-y-1 flex items-center gap-2 disabled:bg-slate-800">Confirm Checkout <Rocket size={16} className="animate-bounce" /></button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutEquipmentTable;