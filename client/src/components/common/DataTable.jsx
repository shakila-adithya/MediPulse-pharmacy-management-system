import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Generic data table.
 * columns: [{ key, header, render?(row), className? }]
 * On small screens the table becomes horizontally scrollable; for a fully
 * card-based mobile view, pass `mobileCard` to render each row as a card.
 */
export default function DataTable({ columns, data, isLoading, emptyTitle, emptyDescription, mobileCard, keyField = "id" }) {
  if (isLoading) return <LoadingSpinner label="Loading data..." />;
  if (!data || data.length === 0) {
    return <EmptyState title={emptyTitle || "No records found."} description={emptyDescription} />;
  }

  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden md:block overflow-x-auto scrollbar-thin rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th key={col.key} className={`text-left font-semibold text-slate-600 px-4 py-3 whitespace-nowrap ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((row) => (
              <tr key={row[keyField]} className="hover:bg-slate-50/70 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3.5 text-slate-700 align-middle ${col.className || ""}`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {data.map((row) => (
          <div key={row[keyField]}>{mobileCard ? mobileCard(row) : <DefaultMobileCard row={row} columns={columns} />}</div>
        ))}
      </div>
    </>
  );
}

function DefaultMobileCard({ row, columns }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
      {columns.map((col) => (
        <div key={col.key} className="flex justify-between items-center gap-3 text-sm">
          <span className="text-slate-500">{col.header}</span>
          <span className="text-slate-800 font-medium text-right">{col.render ? col.render(row) : row[col.key]}</span>
        </div>
      ))}
    </div>
  );
}
