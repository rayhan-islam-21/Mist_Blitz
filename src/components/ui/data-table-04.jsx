'use client'

import { useId, useMemo, useState, useEffect } from 'react'
import { SearchIcon, Package, FilterIcon, ChevronUpDownIcon } from 'lucide-react'

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
          aria-label='Select all'
          className="translate-y-[2px] border-slate-300"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
          className="translate-y-[2px] border-slate-300"
        />
      )
    },
    {
      header: 'Equipment',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className='rounded-lg w-9 h-9 border border-slate-200 shadow-sm'>
            <AvatarImage src={row.original.image} alt={row.getValue('name')} />
            <AvatarFallback className="bg-slate-100 text-slate-900 font-bold">
              {row.getValue('name')?.[0]}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold text-slate-900">{row.getValue('name')}</span>
        </div>
      )
    },
    {
      header: 'Owner',
      accessorKey: 'ownerType',
      cell: ({ row }) => (
        <Badge variant="secondary" className="bg-slate-100 text-slate-900 hover:bg-slate-200 border-none px-2 py-0.5 rounded-md font-medium">
          {row.getValue('ownerType')}
        </Badge>
      ),
      meta: { filterVariant: 'select' }
    },
    {
      header: 'Member',
      accessorKey: 'memberName',
      cell: ({ row }) => <span className="text-slate-800 font-medium">{row.getValue('memberName') || '—'}</span>
    },
    {
      header: 'Qty',
      accessorKey: 'quantity',
      cell: ({ row }) => (
        <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full text-xs border border-blue-100">
          {row.getValue('quantity')}
        </span>
      ),
      meta: { filterVariant: 'range' }
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: ({ row }) => (
        <span className="text-slate-700 text-sm font-medium">{row.getValue('category')}</span>
      ),
      meta: { filterVariant: 'select' }
    }
  ]

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
    <div className='flex flex-col items-center justify-center p-20 space-y-4'>
      <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      <p className="text-slate-900 font-bold animate-pulse">Loading Inventory...</p>
    </div>
  )

  return (
    <div className='w-full space-y-6 animate-in fade-in duration-500'>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Equipment Inventory</h2>
          <p className="text-sm text-slate-500 font-medium">Manage and track all hardware assets</p>
        </div>
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 flex items-center gap-2">
          <Package size={16} />
          Total Items: {equipment.length}
        </div>
      </div>

      <div className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
        {/* Filters Header */}
        <div className='bg-slate-50/50 p-6 border-b border-slate-200'>
          <div className="flex items-center gap-2 mb-4">
            <FilterIcon size={14} className="text-slate-900" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Advanced Filters</span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
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
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className='bg-slate-50 hover:bg-slate-50 border-b border-slate-200'>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className='h-12 text-slate-900 font-black text-[11px] uppercase tracking-wider'>
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
                    data-state={row.getIsSelected() && 'selected'}
                    className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-32 text-center text-slate-500 font-medium'>
                    No equipment matches your filters.
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
  const id = useId()
  if (!column) return null

  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : ''

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === 'range') return []
    const values = Array.from(column.getFacetedUniqueValues().keys())
    return Array.from(new Set(values.flat())).sort()
  }, [column, filterVariant])

  return (
    <div className='space-y-2.5'>
      <Label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-1">
        {columnHeader}
      </Label>
      
      {filterVariant === 'range' ? (
        <div className='flex items-center shadow-sm rounded-lg overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-slate-900/10 transition-all'>
          <input
            className='w-full px-3 py-2 text-sm font-bold text-slate-900 outline-none border-r border-slate-100'
            value={columnFilterValue?.[0] ?? ''}
            onChange={e => column.setFilterValue(old => [e.target.value ? Number(e.target.value) : undefined, old?.[1]])}
            placeholder='Min'
            type='number'
          />
          <input
            className='w-full px-3 py-2 text-sm font-bold text-slate-900 outline-none'
            value={columnFilterValue?.[1] ?? ''}
            onChange={e => column.setFilterValue(old => [old?.[0], e.target.value ? Number(e.target.value) : undefined])}
            placeholder='Max'
            type='number'
          />
        </div>
      ) : filterVariant === 'select' ? (
        <Select
          value={columnFilterValue?.toString() ?? 'all'}
          onValueChange={value => column.setFilterValue(value === 'all' ? undefined : value)}
        >
          <SelectTrigger className='h-10 bg-white border-slate-200 rounded-xl shadow-sm focus:ring-slate-900 font-bold text-slate-900'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-200">
            <SelectItem value='all' className="font-bold">All Categories</SelectItem>
            {sortedUniqueValues.map(value => (
              <SelectItem key={String(value)} value={String(value)} className="font-medium text-slate-800">
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className='relative'>
          <Input
            className='pl-9 h-10 bg-white border-slate-200 rounded-xl shadow-sm focus-visible:ring-slate-900 font-bold text-slate-900 placeholder:text-slate-400'
            value={columnFilterValue ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search ${columnHeader}...`}
            type='text'
          />
          <SearchIcon size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
        </div>
      )}
    </div>
  )
}

export default DataTableEquipment