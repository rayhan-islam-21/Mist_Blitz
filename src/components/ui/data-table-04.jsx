"use client";

import { useId, useMemo, useState, useEffect } from "react";
import {
  SearchIcon,
  Package,
  FilterIcon,
  ChevronUpDownIcon,
  Hash,
  User,
  Layers,
  Activity,
  Edit2,
  Trash2,
  Plus,
  Terminal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import toast from "react-hot-toast";

const DataTableEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([{ id: "name", desc: false }]);
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
    const [nameToDelete, setNameToDelete] = useState(null);

  // Form State
  const [editForm, setEditForm] = useState({
    name: "",
    quantity: 0,
    memberName: "",
    category: "",
    ownerType: "",
  });

  // Fetch Logic
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await api("/equipment");
        setEquipment(res.data);
      } catch (err) {
        console.error("Failed to fetch equipment:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  // Delete logic
  // Opens the modal and stores the ID
  const initiateDelete = (id) => {
    setIdToDelete(id);
    setDeleteModalOpen(true);
  };
  const initiateDeleteName = (name) => {
    setNameToDelete(name);
    setDeleteModalOpen(true);
  };

  // Executes the actual database removal
  const confirmDelete = async () => {
    if (!idToDelete) return;

    try {
      await api.delete(`/equipment/${idToDelete}`);

      // Update UI state
      setEquipment((prev) => prev.filter((e) => e._id !== idToDelete));

      // Close modal and show success
      setDeleteModalOpen(false);
      toast.success("ASSET_PURGED: Ledger updated successfully.");
      setIdToDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("SYSTEM_ERROR: Deletion protocol failed.");
    }
  };

  // OPEN MODAL & SYNC DATA
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

  // SAVE UPDATED QUANTITY TO DB
  const handleSaveChanges = async () => {
    if (!editingRow) return;
    try {

      const res = await api.put(`/equipment/${editingRow._id}`, editForm);

      setEquipment((prev) =>
        prev.map((eq) => (eq._id === editingRow._id ? res.data : eq))
      );
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update equipment:", err);
      alert("Failed to save changes. Check console for details.");
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className="border-slate-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="border-slate-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
        />
      ),
    },
    {
      header: "Equipment Asset",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4 py-1">
          <Avatar className="rounded-xl w-14 h-14 border-2 border-slate-100 shadow-sm">
            <AvatarImage
              src={row.original.image}
              alt={row.getValue("name")}
              className="object-cover"
            />
            <AvatarFallback className="bg-slate-50 text-slate-400">
              <Package size={16} />
            </AvatarFallback>
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
      header: "Ownership Status",
      accessorKey: "ownerType",
      cell: ({ row }) => (
        <Badge className="bg-red-600 text-white font-black font-sans italic uppercase tracking-widest text-[9px] px-2 py-0.5 rounded-sm border-none shadow-sm ring-1 ring-slate-200 ring-offset-1">
          {row.getValue("ownerType")}
        </Badge>
      ),
      meta: { filterVariant: "select" },
    },
    {
      header: "Member Name",
      accessorKey: "memberName",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <User size={12} className="text-red-500" />
          <span className="font-bold text-slate-700 font-sans italic uppercase tracking-tight text-xs">
            {row.getValue("memberName") || "Unassigned"}
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
            <span
              className={cn(
                "w-8 h-8 flex items-center justify-center font-mono font-black text-sm rounded-lg border-b-2",
                qty > 0
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              )}
            >
              {qty}
            </span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest hidden sm:inline">
              Units
            </span>
          </div>
        );
      },
      meta: { filterVariant: "range" },
    },
    {
      header: "Categorization",
      accessorKey: "category",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Layers size={12} className="text-slate-300" />
          <span className="text-slate-900 font-black font-sans italic uppercase text-[11px] tracking-widest">
            {row.getValue("category")}
          </span>
        </div>
      ),
      meta: { filterVariant: "select" },
    },
    {
      header: "System Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded border-2 bg-white cursor-pointer text-black  border-slate-900 hover:bg-slate-900 hover:text-white"
            onClick={() => handleEdit(row.original)}
          >
            <Edit2 size={14} />
          </Button>
          <Button
            size="sm"
            className="bg-white cursor-pointer rounded border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            onClick={() => {
                initiateDelete(row.original._id)
                initiateDeleteName(row.original.name)
            }}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: equipment,
    columns,
    state: { sorting, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableSortingRemoval: false,
  });
  console.log(editingRow);
  if (loading)
    return (
      <div className="flex flex-col h-screen items-center justify-center p-32 space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-red-600 rounded-full animate-spin" />
          <Package
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200"
            size={24}
          />
        </div>
        <p className="text-slate-900 font-black italic uppercase tracking-[0.3em] text-sm animate-pulse">
          Initializing Ledger
        </p>
      </div>
    );

  return (
    <div className="w-full px-6 py-12  space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="sm:max-w-md rounded-none border-[6px] border-black/20 p-0 overflow-hidden bg-white ">

            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center shrink-0">
                  <Trash2 size={24} className="text-red-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-sans font-black uppercase italic tracking-tight text-slate-950">
                    Confirm <span className="text-red-600">Action</span>?
                  </h3>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed uppercase">
                    You are about to permanently remove this asset from the
                    Data BAse. This action is logged and{" "}
                    <span className="text-red-600 underline">irreversible</span>
                    .
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 border-l-4 border-slate-950">
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                  TARGET_NAME:
                </span>
                <span className="text-sm font-mono font-black text-slate-950">
                  {nameToDelete || "NULL_PTR"}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-slate-950 p-6 flex gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                CANCEL
              </button>
              <Button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 font-sans hover:bg-red-700 hover:text-gray-200 text-white rounded-none py-6 font-black uppercase italic tracking-widest transition-all border-2 border-red-600"
              >
                CONFIRM_Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div>
          <div className="flex items-center gap-2 mb-1">
            {/* <div className="w-2 h-16 bg-red-600" /> */}
            <h2 className="text-4xl italic font-sans font-black text-slate-900 uppercase tracking-tighter leading-none">
              All <span className="text-red-600">Equipmnets</span>
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.4em] ml-1">
            Inventory Management
          </p>
        </div>

        {/* STATS CHIP */}
        <div className="bg-slate-900 text-white px-6 py-3 rounded-none skew-x-[-12deg] shadow-xl flex items-center gap-4 border-r-4 border-red-600">
          <div className="skew-x-[12deg] flex items-center gap-3">
            <Package size={20} className="text-red-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none text-slate-400">
                Total Stockpile
              </span>
              <span className="text-xl font-mono font-black leading-none mt-1">
                {equipment.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-2xl rounded-none border-[6px] border-slate-950 p-0 overflow-hidden bg-white shadow-[30px_30px_0px_0px_rgba(0,0,0,0.1)] selection:bg-red-600 selection:text-white font-sans">
          <div className="bg-slate-950 px-6 py-4 flex justify-between items-center border-b-[6px] border-red-600">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-4 bg-red-600 animate-[pulse_1s_infinite]" />
                <span className="w-2.5 h-4 bg-slate-700" />
                <span className="w-2.5 h-4 bg-slate-800" />
              </div>
              <div className="flex flex-col">
                <DialogTitle className="text-white font-black uppercase italic tracking-[0.2em] text-[11px] leading-none">
                  System_Override_Console
                </DialogTitle>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Status: Authorizing_Changes...
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] overflow-hidden">
              <span className="text-[15rem] font-black italic uppercase -rotate-12 select-none">
                DATABASE
              </span>
            </div>

            <div className="p-10 space-y-10 relative">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-6xl font-black uppercase italic tracking-tighter text-slate-950 leading-[0.8]">
                    Modify <span className="text-red-600">Asset</span>
                  </h3>
                </div>
                <div className="w-14 h-14 bg-slate-950 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
                  <Package size={28} className="text-white" />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-x-8 gap-y-10">
                {/* [01] Designation - Read Only */}
                <div className="col-span-12 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-red-600" />
                    <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-950">
                      [ 01 ] Unit_Designation
                    </Label>
                  </div>
                  <Input
                    value={editForm.name}
                    readOnly
                    className="rounded-none border-2 border-slate-200 bg-slate-50 h-16 px-5 text-2xl font-black uppercase italic text-slate-400 cursor-not-allowed"
                  />
                </div>

                {/* [02] Quantity - EDITABLE */}
                <div className="col-span-12 md:col-span-4 space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    [ 02 ] Qty_Stock
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="9999"
                    value={editForm.quantity}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        quantity: Number(e.target.value),
                      })
                    }
                    className="rounded-none border-2 border-slate-950 h-14 font-black text-2xl focus-visible:ring-0 focus-visible:border-red-600 bg-white text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                {/* [03] Member - Read Only */}
                <div className="col-span-12 md:col-span-8 space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    [ 03 ] Private Member Name
                  </Label>
                  <div className="relative">
                    <Input
                      value={editForm.memberName || "UNASSIGNED"}
                      readOnly
                      className="rounded-none border-2 border-slate-200 h-14 font-black uppercase italic bg-slate-50 text-slate-400 pl-12 cursor-not-allowed"
                    />
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                      size={18}
                    />
                  </div>
                </div>

                {/* [04] Category - Read Only */}
                <div className="col-span-6 space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    [ 04 ] Category
                  </Label>
                  <Input
                    value={editForm.category}
                    readOnly
                    className="rounded-none border-2 border-slate-200 h-12 font-black uppercase bg-slate-50 text-slate-400 cursor-not-allowed"
                  />
                </div>

                {/* [05] Ownership - Read Only */}
                <div className="col-span-6 space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    [ 05 ] Ownership_Status
                  </Label>
                  <Input
                    value={editForm.ownerType}
                    readOnly
                    className="rounded-none border-2 border-red-200 h-12 font-black uppercase bg-red-50/50 text-red-300 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="bg-slate-950 p-8 sm:flex justify-between items-center gap-6">
            <div className="hidden sm:flex flex-col gap-1 text-left">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">
                  Secure_Protocol_Active
                </span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-4">
                Authorized quantity override only.
              </span>
            </div>

            <div className="flex w-full sm:w-auto gap-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="flex-1 sm:flex-none px-8 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                _CANCEL
              </button>

              <Button
                onClick={handleSaveChanges}
                className="flex-1 sm:flex-none bg-red-600 hover:bg-white hover:text-red-600 text-white rounded-none px-12 py-8 font-black uppercase italic tracking-[0.2em] transition-all border-2 border-red-600 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <span className="flex items-center gap-2">
                  PUSH_CHANGES <Activity size={18} />
                </span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* TABLE CONTAINER */}
      <div className="rounded-none border-x border-b border-slate-200 bg-white overflow-hidden">
        <div className="bg-slate-900 p-6 border-b-4 border-red-600">
          <div className="flex items-center gap-2 mb-6">
            <FilterIcon size={14} className="text-red-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              System Filter Parameters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <Filter column={table.getColumn("name")} />
            <Filter column={table.getColumn("ownerType")} />
            <Filter column={table.getColumn("memberName")} />
            <Filter column={table.getColumn("quantity")} />
            <Filter column={table.getColumn("category")} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-14 text-slate-900 font-black text-[10px] uppercase tracking-[0.15em] px-6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-red-50/30 transition-all border-b border-slate-100 last:border-0"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">
                      Sector Empty: No data matches criteria
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

// Filter Component (unchanged as requested)
function Filter({ column }) {
  if (!column) return null;
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader =
    typeof column.columnDef.header === "string"
      ? column.columnDef.header
      : "Field";

  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
        {columnHeader}
      </Label>
      <div className="relative group">
        {filterVariant === "range" ? (
          <div className="flex gap-2">
            <input
              className="w-full bg-slate-800 border-none px-3 py-2 text-[11px] font-mono font-black text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
              value={columnFilterValue?.[0] ?? ""}
              onChange={(e) =>
                column.setFilterValue((old) => [
                  e.target.value ? Number(e.target.value) : undefined,
                  old?.[1],
                ])
              }
              placeholder="MIN"
              type="number"
            />
            <input
              className="w-full bg-slate-800 border-none px-3 py-2 text-[11px] font-mono font-black text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
              value={columnFilterValue?.[1] ?? ""}
              onChange={(e) =>
                column.setFilterValue((old) => [
                  old?.[0],
                  e.target.value ? Number(e.target.value) : undefined,
                ])
              }
              placeholder="MAX"
              type="number"
            />
          </div>
        ) : (
          <Input
            className="h-10 bg-slate-800 border-none rounded-none focus-visible:ring-1 focus-visible:ring-red-600 font-black italic text-xs uppercase text-white placeholder:text-slate-600 tracking-widest"
            value={columnFilterValue ?? ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
          />
        )}
      </div>
    </div>
  );
}

export default DataTableEquipment;
