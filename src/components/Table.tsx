import React, { useState } from 'react'
import { Paginator } from './Paginator'

export interface TableColumn<T> {
  key: keyof T
  label: string
  side?: 'left' | 'right' | 'center'
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  initialRowsPerPage?: number
  showRowsPerPage?: boolean
}

export const Table = <T,>({
  columns,
  data,
  initialRowsPerPage = 5,
  showRowsPerPage = true,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)

  const totalPages = Math.ceil(data?.length / rowsPerPage || 0)
  const paginatedData =
    data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) ||
    []

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-app-main text-app-white">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-2 ${
                    column.side ? `text-${column.side}` : 'text-center'
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-app-main bg-opacity-5 border-b border-app-white hover:bg-gray-50 text-xs sm:text-sm text-white"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-2 ${
                      column.side ? `text-${column.side}` : 'text-center'
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key], row, rowIndex)
                      : (row[column.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {totalPages === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="bg-app-main bg-opacity-20 border-b border-app-white hover:bg-gray-50 text-center h-14"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        showRowsPerPage={showRowsPerPage}
      />
    </div>
  )
}
