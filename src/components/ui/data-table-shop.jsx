"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { 
  SearchIcon, Package, ShoppingCart, Terminal, 
  Rocket, Activity, CheckCircle2, AlertTriangle 
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
  
  // user now contains synced MongoDB data (name, blitzId, etc.) from AuthContext
  const { user, loading: authLoading } = useContext(AuthContext);
  
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [checkoutQty, setCheckoutQty] = useState(1);

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

  const handleOpenCheckout = (asset) => {
    if (!user?.blitzId) {
      toast.error("PROFILE NOT LINKED: Contact admin to sync your Roll/Email");
      return;
    }
    setSelectedAsset(asset);
    setCheckoutQty(1);
    setCheckoutModalOpen(true);
  };

  const confirmCheckout = async () => {
    if (checkoutQty > selectedAsset.quantity) {
      toast.error("INSUFFICIENT STOCK");
      return;
    }

    const loadId = toast.loading("RESERVING ASSET...");
    try {
      const payload = {
        equipmentId: selectedAsset._id,
        quantity: checkoutQty,
        item: {
          name: selectedAsset.name,
          productCode: selectedAsset.bash,
          photo: selectedAsset.image
        },
        // AUTOMATIC: Using data fetched via the email match
        receiver: {
          name: user.name,
          blitzId: user.blitzId,
          photo: user.image
        },
        operator: {
          name: user.name,
          id: user._id,
          role: user.role || "member"
        }
      };

      await api.post("/logistics/checkout", payload);

      setEquipment(prev => prev.map(eq => 
        eq._id === selectedAsset._id ? { ...eq, quantity: eq.quantity - checkoutQty } : eq
      ));
      
      setCheckoutModalOpen(false);
      toast.success("TRANSFER REGISTERED", { id: loadId });
    } catch (err) {
      toast.error("CHECKOUT REFUSED", { id: loadId });
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
      header: "Action",
      id: "actions",
      cell: ({ row }) => (
        <button 
          onClick={() => handleOpenCheckout(row.original)}
          disabled={row.original.quantity <= 0}
          className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase italic tracking-widest rounded hover:bg-red-600 disabled:bg-slate-100 disabled:text-slate-300 transition-colors"
        >
          Checkout
        </button>
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

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(searchTerm);
  }, [searchTerm, table]);

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-10">
      <Toaster position="top-center" />

      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
            Asset <span className="text-red-600">Checkout</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium flex items-center gap-2">
            Logged in as: <span className="text-black font-bold underline">{user?.email}</span>
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="FILTER ASSETS..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* TABLE */}
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
                <tr><td colSpan="5" className="p-20 text-center animate-pulse">Scanning Registry...</td></tr>
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

      {/* CHECKOUT MODAL */}
      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        <DialogContent className="sm:max-w-xl rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white">
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
              Confirm <span className="text-red-600">Checkout</span>
            </h2>

            {/* SYNCED IDENTITY DISPLAY */}
            <div className="p-4 bg-slate-950 text-white rounded-lg flex items-center gap-4">
              <div className="h-16 w-16 relative rounded overflow-hidden border-2 border-red-600">
                <Image src={user?.image || "/avatar.png"} alt="" fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-red-600 px-2 py-0.5 rounded">VERIFIED MEMBER</span>
                </div>
                <h3 className="text-xl font-black uppercase italic">{user?.name}</h3>
                <p className="text-xs font-mono text-slate-400">{user?.blitzId} | {user?.roll}</p>
              </div>
            </div>

            <div className="space-y-4">
               <div className="bg-slate-50 p-4 border-l-4 border-black">
                  <Label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Target Asset</Label>
                  <span className="text-lg font-black uppercase">{selectedAsset?.name}</span>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[10px] font-black uppercase text-slate-400">Available</Label>
                    <div className="h-12 flex items-center font-mono font-black">{selectedAsset?.quantity} UNITS</div>
                  </div>
                  <div>
                    <Label className="text-[10px] font-black uppercase text-slate-400">Checkout Quantity</Label>
                    <Input 
                      type="number" 
                      min={1} 
                      max={selectedAsset?.quantity}
                      value={checkoutQty} 
                      onChange={(e) => setCheckoutQty(Number(e.target.value))}
                      className="border-2 border-black font-black text-xl"
                    />
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-slate-100 p-6 flex justify-end gap-4">
            <button onClick={() => setCheckoutModalOpen(false)} className="font-bold text-slate-500 uppercase text-xs">Cancel</button>
            <button 
              onClick={confirmCheckout}
              className="bg-red-600 text-white px-8 py-4 font-black uppercase italic tracking-widest flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              Confirm <Rocket size={16} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutEquipmentTable;