import React, { useState, useMemo } from "react";

interface Column<T> {
  label: string;
  field?: keyof T;
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
  width?: number;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends { id: number }>({ columns, data }: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.some((column) => {
        const value = column.field ? item[column.field] : undefined;
        return (
          value !== undefined &&
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [data, columns, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render
                    ? column.render(column.field ? row[column.field] : undefined, row)
                    : (column.field && row[column.field]) as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <span>
          Trang {currentPage}/{totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Table;
