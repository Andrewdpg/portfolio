import React from 'react'
import { Select } from './Select'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Button } from './Button'

interface PaginatorProps {
  currentPage: number
  totalPages: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  showRowsPerPage?: boolean
}

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  showRowsPerPage = true,
}) => {
  if (totalPages <= 0) {
    return null
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, currentPage + 1)

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 text-sm ${
            currentPage === 1
              ? 'bg-black text-white rounded'
              : 'text-app-gray hover:text-gray-700'
          }`}
        >
          1
        </button>
      )
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 text-sm ${
            currentPage === i
              ? 'bg-black text-white rounded'
              : 'text-app-gray hover:text-gray-700'
          }`}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>)
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 text-sm ${
            currentPage === totalPages
              ? 'bg-black text-white rounded'
              : 'text-app-gray hover:text-gray-700'
          }`}
        >
          {totalPages}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
      <div className="sm:w-40" />
      <div>
        <div className="flex sm:flex-row items-center gap-2">
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            variant="text"
            disabled={currentPage === 1}
            className="flex items-center sm:gap-1 flex-col sm:flex-row py-0 px-0 sm:px-2 sm:py-1"
          >
            <ArrowBack fontSize="small" />
            <span className="hidden sm:block">Previous</span>
          </Button>
          <div className="flex items-center gap-1">{renderPageNumbers()}</div>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            variant="text"
            disabled={currentPage === totalPages}
            className="flex items-center sm:gap-1 flex-col-reverse sm:flex-row py-0 px-0 sm:px-2 sm:py-1"
          >
            <span className="hidden sm:block">Next</span>
            <ArrowForward fontSize="small" />
          </Button>
        </div>
      </div>

      {showRowsPerPage && (
        <div className="flex items-center gap-2">
          <Select
            className="w-20"
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Select>
          <span className="text-sm text-app-gray">Per page</span>
        </div>
      )}
    </div>
  )
}
