'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
  }[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function DataTable<T>({
  title,
  data,
  columns,
  pageSize = 5,
  searchable = false,
  searchPlaceholder = 'Search...',
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filteredData = searchable
    ? data.filter((item) =>
        Object.entries(item).some(([key, value]) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          if (typeof value === 'number') {
            return value.toString().includes(searchQuery);
          }
          return false;
        })
      )
    : data;

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          {searchable && (
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3 text-sm"
                      >
                        {column.cell
                          ? column.cell(item)
                          : (item[column.accessorKey] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center text-sm text-muted-foreground"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredData.length)} of{' '}
              {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        'h-8 w-8 rounded-md text-sm',
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted'
                      )}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

