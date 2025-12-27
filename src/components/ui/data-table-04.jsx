'use client'

import { useId, useMemo, useState, useEffect } from 'react'
import { SearchIcon } from 'lucide-react'

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

  // Fetch equipment from API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await api('/equipment') // <-- your API endpoint
        const data = res.data
        setEquipment(data)
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      )
    },
    {
      header: 'Image',
      accessorKey: 'image',
      cell: ({ row }) => (
        <Avatar className='rounded-sm w-10 h-10'>
          <AvatarImage src={row.getValue('image')} alt={row.getValue('name')} />
          <AvatarFallback>{row.getValue('name')[0]}</AvatarFallback>
        </Avatar>
      ),
      enableSorting: false
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => row.getValue('name')
    },
    {
      header: 'Owner Type',
      accessorKey: 'ownerType',
      cell: ({ row }) => row.getValue('ownerType'),
      meta: { filterVariant: 'select' }
    },
    {
      header: 'Member Name',
      accessorKey: 'memberName',
      cell: ({ row }) => row.getValue('memberName')
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      cell: ({ row }) => row.getValue('quantity'),
      meta: { filterVariant: 'range' }
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: ({ row }) => row.getValue('category'),
      meta: { filterVariant: 'select' }
    },
    {
      header: 'Bash',
      accessorKey: 'bash',
      cell: ({ row }) => row.getValue('bash')
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

  if (loading) return <div className='text-center p-10'>Loading...</div>

  return (
    <div className='w-full space-y-4'>
      <div className='rounded-md border bg-card'>
        {/* Filters */}
        <div className='flex flex-wrap gap-4 px-4 py-6 border-b'>
          <div className='w-44'><Filter column={table.getColumn('name')} /></div>
          <div className='w-44'><Filter column={table.getColumn('ownerType')} /></div>
          <div className='w-44'><Filter column={table.getColumn('memberName')} /></div>
          <div className='w-36'><Filter column={table.getColumn('quantity')} /></div>
          <div className='w-44'><Filter column={table.getColumn('category')} /></div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className='bg-muted/50'>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className='h-10 border-t select-none'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function Filter({ column }) {
  const id = useId()
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : ''

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === 'range') return []
    const values = Array.from(column.getFacetedUniqueValues().keys())
    return Array.from(new Set(values.flat())).sort()
  }, [column, filterVariant])

  if (filterVariant === 'range') {
    return (
      <div className='space-y-2'>
        <Label className="text-xs font-semibold uppercase text-muted-foreground">{columnHeader}</Label>
        <div className='flex items-center'>
          <Input
            className='rounded-r-none focus:z-10'
            value={columnFilterValue?.[0] ?? ''}
            onChange={e => column.setFilterValue(old => [e.target.value ? Number(e.target.value) : undefined, old?.[1]])}
            placeholder='Min'
            type='number'
          />
          <Input
            className='-ms-px rounded-l-none focus:z-10'
            value={columnFilterValue?.[1] ?? ''}
            onChange={e => column.setFilterValue(old => [old?.[0], e.target.value ? Number(e.target.value) : undefined])}
            placeholder='Max'
            type='number'
          />
        </div>
      </div>
    )
  }

  if (filterVariant === 'select') {
    return (
      <div className='space-y-2'>
        <Label className="text-xs font-semibold uppercase text-muted-foreground">{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? 'all'}
          onValueChange={value => column.setFilterValue(value === 'all' ? undefined : value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {sortedUniqueValues.map(value => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      <Label className="text-xs font-semibold uppercase text-muted-foreground">{columnHeader}</Label>
      <div className='relative'>
        <Input
          className='pl-9'
          value={columnFilterValue ?? ''}
          onChange={e => column.setFilterValue(e.target.value)}
          placeholder={`Search...`}
          type='text'
        />
        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/50'>
          <SearchIcon size={14} />
        </div>
      </div>
    </div>
  )
}

export default DataTableEquipment
