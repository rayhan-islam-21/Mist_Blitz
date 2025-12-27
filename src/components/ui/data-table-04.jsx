'use client'

import { useId, useMemo, useState, useEffect } from 'react'
import { SearchIcon, Package, FilterIcon, ChevronUpDownIcon, Hash, User, Layers } from 'lucide-react'

import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { cn } from '@/lib/utils'
import api from '@/lib/axios'

const DataTableEquipment = () => {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [columnFilters, setColumnFilters] = useState([])
  const [sorting, setSorting] = useState([{ id: 'name', desc: false }])

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await api('/equipment')
        setEquipment(res.data)
      } catch (err) {
        console.error('Failed to fetch equipment:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEquipment()
  }, [])

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          className="border-slate-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          className="border-slate-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
        />
      )
    },
    {
      header: 'Equipment Asset',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-4 py-1">
          <Avatar className='rounded-xl w-14 h-14 border-2 border-slate-100 shadow-sm'>
            <AvatarImage src={row.original.image} alt={row.getValue('name')} className="object-cover" />
            <AvatarFallback className="bg-slate-50 text-slate-400">
              <Package size={16} />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-sans font-black italic uppercase  text-slate-900 text-sm leading-none">
              {row.getValue('name')}
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400 mt-1 uppercase">
              ID: {row.original.id?.substring(0, 8) || 'UNT-092'}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Ownership Status',
      accessorKey: 'ownerType',
      cell: ({ row }) => (
        <Badge className="bg-red-600 text-white font-black font-sans italic uppercase tracking-widest text-[9px] px-2 py-0.5 rounded-sm border-none shadow-sm ring-1 ring-slate-200 ring-offset-1">
          {row.getValue('ownerType')}
        </Badge>
      ),
      meta: { filterVariant: 'select' }
    },
    {
      header: 'Assigned To',
      accessorKey: 'memberName',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <User size={12} className="text-red-500" />
            <span className="font-bold text-slate-700 font-sans italic uppercase tracking-tight text-xs">
                {row.getValue('memberName') || 'Unassigned'}
            </span>
        </div>
      )
    },
    {
      header: 'Availability',
      accessorKey: 'quantity',
      cell: ({ row }) => {
        const qty = row.getValue('quantity')
        return (
          <div className="flex items-center gap-3">
             <span className={cn(
                "w-8 h-8 flex items-center justify-center font-mono font-black text-sm rounded-lg border-b-2",
                qty > 0 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-red-50 text-red-700 border-red-200"
             )}>
                {qty}
             </span>
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest hidden sm:inline">Units</span>
          </div>
        )
      },
      meta: { filterVariant: 'range' }
    },
    {
      header: 'Categorization',
      accessorKey: 'category',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Layers size={12} className="text-slate-300" />
            <span className="text-slate-900 font-black font-sans italic uppercase text-[11px] tracking-widest">
                {row.getValue('category')}
            </span>
        </div>
      ),
      meta: { filterVariant: 'select' }
    }
  ]

  // ... table configuration stays the same ...
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
    enableSortingRemoval: false
  })

  if (loading) return (
    <div className='flex flex-col items-center justify-center p-32 space-y-6'>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-red-600 rounded-full animate-spin" />
        <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200" size={24} />
      </div>
      <p className="text-slate-900 font-black italic uppercase tracking-[0.3em] text-sm animate-pulse">Initializing Ledger</p>
    </div>
  )

  return (
    <div className='w-full p-6 space-y-8 animate-in fade-in  slide-in-from-bottom-4 duration-700'>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-16 bg-red-600" />
            <h2 className="text-5xl italic font-sans font-black text-slate-900 uppercase tracking-tighter leading-none">
              Asset <span className="text-red-600">Ledger</span>
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.4em] ml-4"> Inventory Management</p>
        </div>
        <div className="bg-slate-900 text-white px-6 py-3 rounded-none skew-x-[-12deg] shadow-xl flex items-center gap-4 border-r-4 border-red-600">
          <div className="skew-x-[12deg] flex items-center gap-3">
            <Package size={20} className="text-red-500" />
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none text-slate-400">Total Stockpile</span>
                <span className="text-xl font-mono font-black leading-none mt-1">{equipment.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-none border-x border-b border-slate-200 bg-white  overflow-hidden'>
        {/* Filters Header */}
        <div className='bg-slate-900 p-6 border-b-4 border-red-600'>
          <div className="flex items-center gap-2 mb-6">
            <FilterIcon size={14} className="text-red-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">System Filter Parameters</span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            <Filter column={table.getColumn('name')} />
            <Filter column={table.getColumn('ownerType')} />
            <Filter column={table.getColumn('memberName')} />
            <Filter column={table.getColumn('quantity')} />
            <Filter column={table.getColumn('category')} />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className='h-14 text-slate-900 font-black text-[10px] uppercase tracking-[0.15em] px-6'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow 
                    key={row.id} 
                    className="hover:bg-red-50/30 transition-all border-b border-slate-100 last:border-0"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="px-6 py-5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-64 text-center'>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">Sector Empty: No data matches criteria</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function Filter({ column }) {
  if (!column) return null
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : 'Field'

  return (
    <div className='space-y-3'>
      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
        {columnHeader}
      </Label>
      
      <div className="relative group">
        {filterVariant === 'range' ? (
            <div className='flex gap-2'>
                <input
                    className='w-full bg-slate-800 border-none px-3 py-2 text-[11px] font-mono font-black text-white outline-none focus:ring-1 focus:ring-red-600 transition-all'
                    value={columnFilterValue?.[0] ?? ''}
                    onChange={e => column.setFilterValue(old => [e.target.value ? Number(e.target.value) : undefined, old?.[1]])}
                    placeholder='MIN'
                    type='number'
                />
                <input
                    className='w-full bg-slate-800 border-none px-3 py-2 text-[11px] font-mono font-black text-white outline-none focus:ring-1 focus:ring-red-600 transition-all'
                    value={columnFilterValue?.[1] ?? ''}
                    onChange={e => column.setFilterValue(old => [old?.[0], e.target.value ? Number(e.target.value) : undefined])}
                    placeholder='MAX'
                    type='number'
                />
            </div>
        ) : (
            <Input
                className='h-10 bg-slate-800 border-none rounded-none focus-visible:ring-1 focus-visible:ring-red-600 font-black italic text-xs uppercase text-white placeholder:text-slate-600 tracking-widest'
                value={columnFilterValue ?? ''}
                onChange={e => column.setFilterValue(e.target.value)}
                placeholder={`Search...`}
            />
        )}
      </div>
    </div>
  )
}

export default DataTableEquipment