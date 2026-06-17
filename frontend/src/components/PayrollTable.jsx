import { useMemo, useState } from 'react';

const columns = [
  { key: 'employeeId', label: 'Employee ID' },
  { key: 'name', label: 'Name' },
  { key: 'department', label: 'Department' },
  { key: 'payPeriod', label: 'Pay Period' },
  { key: 'grossPay', label: 'Gross Pay', numeric: true },
  { key: 'deductions', label: 'Deductions', numeric: true },
  { key: 'netPay', label: 'Net Pay', numeric: true },
  { key: 'status', label: 'Status' },
];

const PayrollTable = ({ payrollData = [], initialPageSize = 10 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'employeeId', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredData = useMemo(() => {
    if (!normalizedSearch) return payrollData;
    return payrollData.filter((row) =>
      columns.some((column) => String(row[column.key]).toLowerCase().includes(normalizedSearch))
    );
  }, [normalizedSearch, payrollData]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    const { key, direction } = sortConfig;
    sorted.sort((a, b) => {
      const aValue = a[key] ?? '';
      const bValue = b[key] ?? '';
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return direction === 'asc'
        ? String(aValue).localeCompare(String(bValue), undefined, { numeric: true })
        : String(bValue).localeCompare(String(aValue), undefined, { numeric: true });
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [currentPage, pageSize, sortedData]);

  const summary = useMemo(
    () =>
      sortedData.reduce(
        (acc, row) => {
          acc.grossPay += Number(row.grossPay) || 0;
          acc.deductions += Number(row.deductions) || 0;
          acc.netPay += Number(row.netPay) || 0;
          return acc;
        },
        { grossPay: 0, deductions: 0, netPay: 0 }
      ),
    [sortedData]
  );

  const handleSort = (columnKey) => {
    setCurrentPage(1);
    setSortConfig((current) =>
      current.key === columnKey
        ? { key: columnKey, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { key: columnKey, direction: 'asc' }
    );
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div className="flex-1 basis-60">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="payroll-search">
            Search payroll records
          </label>
          <input
            id="payroll-search"
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, department, status, or ID"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="min-w-[160px]">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="page-size-select">
            Rows per page
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-auto text-sm text-slate-500">
          <div>
            Showing {currentData.length} of {sortedData.length} record{sortedData.length === 1 ? '' : 's'}
          </div>
          <div>
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-[820px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((column) => {
                const isSorted = sortConfig.key === column.key;
                return (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className={`cursor-pointer select-none border-b-2 border-slate-200 px-3 py-3 font-semibold text-slate-600 ${
                      column.numeric ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span>{column.label}</span>
                    <span className="ml-2 text-xs text-slate-400">
                      {isSorted ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⏺'}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-slate-500">
                  No payroll records match your search.
                </td>
              </tr>
            ) : (
              currentData.map((row) => (
                <tr key={`${row.employeeId}-${row.payPeriod}`} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{row.employeeId}</td>
                  <td className="px-3 py-3">{row.name}</td>
                  <td className="px-3 py-3">{row.department}</td>
                  <td className="px-3 py-3">{row.payPeriod}</td>
                  <td className="px-3 py-3 text-right">${Number(row.grossPay).toFixed(2)}</td>
                  <td className="px-3 py-3 text-right">${Number(row.deductions).toFixed(2)}</td>
                  <td className="px-3 py-3 text-right">${Number(row.netPay).toFixed(2)}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                        row.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold">
              <td colSpan={4} className="px-3 py-3">
                Totals
              </td>
              <td className="px-3 py-3 text-right">${summary.grossPay.toFixed(2)}</td>
              <td className="px-3 py-3 text-right">${summary.deductions.toFixed(2)}</td>
              <td className="px-3 py-3 text-right">${summary.netPay.toFixed(2)}</td>
              <td className="px-3 py-3" />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            Next
          </button>
        </div>
        <div className="text-sm text-slate-500">
          Displaying {currentData.length} record{currentData.length === 1 ? '' : 's'} on this page
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;
