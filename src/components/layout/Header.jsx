import Button from '../ui/Button'
import FilterDropdown from '../invoice/FilterDropdown'
import { useState } from 'react'

import { useInvoices } from '../../context/InvoiceContext'
import InvoiceForm from '../invoice/InvoiceForm'
import { useEffect, useRef } from 'react'

export default function Header ({ filter, setFilter }) {
  const [open, setOpen] = useState(false)
  const { invoices } = useInvoices()
  const [openForm, setOpenForm] = useState(false)
  const [selected, setSelected] = useState([])
  const dropdownRef = useRef()
  useEffect(() => {
    function handleClickOutside (e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <div className='flex items-center justify-between mb-10 relative flex-col md:flex-row md:items-center justify-between gap-4 mb-10'>
      {/* Left */}
      <div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Invoices
        </h1>

        <p className='text-sm text-gray-500'>
          {invoices.length === 0
            ? 'No invoices'
            : `There are ${invoices.length} invoices`}
        </p>
      </div>

      {/* Right */}
      <div className='flex items-center gap-4 relative' ref={dropdownRef}>
        {/* Filter */}

        <button
          onClick={() => setOpen(!open)}
          className='text-sm font-medium text-gray-700 dark:text-white'
        >
          Filter ▼
        </button>


        {open && (
          <div className='absolute top-16 right-0 bg-white dark:bg-[#1E2139] shadow-lg rounded-lg p-4 w-40 z-50'>
            {['Draft', 'Pending', 'Paid'].map(status => (
              <label
                key={status}
                className='flex items-center gap-2 mb-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={filter.includes(status)}
                  onChange={() => {
                    if (filter.includes(status)) {
                      setFilter(filter.filter(f => f !== status))
                    } else {
                      setFilter([...filter, status])
                    }
                  }}
                  className='accent-purple-500 w-4 h-4'
                />
                <span className='text-sm dark:text-white'>{status}</span>
              </label>
            ))}
          </div>
        )}

        {/* <FilterDropdown selected={selected} setSelected={setSelected} /> */}
        {/* <button className="text-sm font-medium text-gray-700 dark:text-white">
          Filter ▼
        </button> */}

        {/* New Invoice */}
        {/* <Button>
          + New
        </Button> */}

        <Button onClick={() => setOpenForm(true)}> <button className="mx-2 w-6 h-6 rounded-full bg-[white] text-purple-500">+</button>  New Invoice</Button>
      </div>
      <InvoiceForm open={openForm} onClose={() => setOpenForm(false)} />
    </div>
  )
}

