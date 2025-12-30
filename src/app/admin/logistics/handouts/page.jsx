"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  SearchIcon,
  Rocket,
  Activity,
  Clock,
  Mail,
  User, // Added fallback icon
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";

const CurrentHandouts = () => {
  const [handouts, setHandouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHandouts = async () => {
      try {
        const res = await api.get("/logistics/checkout");
        setHandouts(res.data);
      } catch (err) {
        toast.error("LOGISTICS_DATA_OFFLINE");
      } finally {
        setLoading(false);
      }
    };
    fetchHandouts();
  }, []);

  const handlePing = (handout) => {
    const recipientEmail =
      handout.receiver.email ||
      `${handout.receiver.name.toLowerCase().replace(/\s+/g, ".")}@mist.ac.bd`;

    const subject = `URGENT: Equipment Return Required - ${handout.item.name}`;

    const body = `DEAR ${handout.receiver.name.toUpperCase()},

Our logistics overwatch system indicates that the following equipment is currently assigned to your ID:

--------------------------------------------------
ASSET: ${handout.item.name}
CODE: ${handout.item.productCode}
QUANTITY: ${handout.quantity} Units
ISSUED ON: ${new Date(handout.createdAt).toLocaleString()}
--------------------------------------------------

If your task is complete, please return the physical asset to the Logistics Hub and ensure you click the "RETURN ASSET" button in your Member Portal to clear your registry.

Best Regards,
MIST Blitz Admin Team`;

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  const columns = [
    {
      header: "Asset Identity",
      accessorKey: "item.name",
      id: "asset_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            <Image
              src={row.original.item.photo}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-sans font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              {row.original.item.name}
            </h4>
            <span className="text-[10px] tracking-wide font-mono font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase">
              CODE: {row.original.item.productCode}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Current Possessor",
      accessorKey: "receiver.name",
      id: "receiver_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {/* USER PHOTO SECTION */}
          <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden border-2 border-slate-100 bg-slate-50 shadow-sm">
            {row.original.receiver.photo ? (
              <Image
                src={row.original.receiver.photo}
                alt={row.original.receiver.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-slate-200 text-slate-400">
                <User size={16} />
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <span className="text-[11px] font-sans font-black text-slate-700 uppercase italic leading-none">
              {row.original.receiver.name}
            </span>
            <span className="text-[9px] font-mono font-bold text-red-500 uppercase mt-1">
              ID: {row.original.receiver.blitzId}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Load Out",
      accessorKey: "quantity",
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded text-[14px] font-mono font-black bg-slate-100 text-slate-900">
          {row.getValue("quantity").toString().padStart(2, "0")} UNITS
        </span>
      ),
    },
    {
      header: "Duration",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const hoursOut = Math.floor(
          (new Date() - new Date(row.getValue("createdAt"))) / (1000 * 60 * 60)
        );
        return (
          <div className="flex font-sans not-italic! flex-col text-[10px] font-bold uppercase">
            <span
              className={`flex items-center  not-italic!  gap-1 italic ${
                hoursOut > 24 ? "text-red-600 animate-pulse" : "text-slate-900"
              }`}
            >
              <Clock size={10} /> {hoursOut}H ELAPSED
            </span>
            <span className="text-[8px] text-slate-400 mt-1">
              {new Date(row.getValue("createdAt")).toLocaleDateString()}
            </span>
          </div>
        );
      },
    },
    {
      header: "Overwatch",
      id: "actions",
      cell: ({ row }) => (
        <button
          onClick={() => handlePing(row.original)}
          className="flex items-center gap-2 px-4 py-3 bg-slate-950 text-white font-mono cursor-pointer text-[8px] font-black uppercase tracking-widest hover:bg-red-600 transition-all rounded-md border-b-4 border-slate-800 active:border-b-0 active:translate-y-1"
        >
          <Mail size={12} /> Contact_Operator
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
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-10">
      <Toaster position="top-center" />

      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-sans md:text-5xl font-black tracking-tighter uppercase italic text-slate-950">
            Tracking <span className="text-red-600">Assets</span>
          </h1>
          <p className="text-slate-500 text-xs mt-2 font-medium flex items-center gap-2 uppercase tracking-widest">
            <Activity size={14} className="text-red-500 animate-pulse" />{" "}
            Supervisor Live Monitor
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="FILTER BY OPERATOR..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-[10px] font-black tracking-[0.2em] uppercase focus:border-red-500 outline-none transition-all text-black"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              table.getColumn("receiver_name")?.setFilterValue(e.target.value);
            }}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-20 font-sans text-center font-black text-slate-200 uppercase tracking-[0.4em] italic text-xl animate-pulse">
                    Initializing Link...
                  </td>
                </tr>
              ) : handouts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center font-black text-slate-200 uppercase tracking-[0.4em] italic text-xl">
                    Clear Field: No Assets Out
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-6 flex justify-between items-center px-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          Tracking {handouts.length} Outbound Sessions
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-900 uppercase italic">
            Mist Blitz
          </span>
          <Rocket className="text-red-500 animate-pulse" size={12} />
        </div>
      </footer>
    </div>
  );
};

export default CurrentHandouts;