// Screen-reader-only table with the same numbers as a chart.
// columns: [{ key, label, format? }]
function ChartDataTable({ caption, columns, rows }) {
  const [rowHeader, ...valueColumns] = columns

  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[rowHeader.key]}>
            <th scope="row">{row[rowHeader.key]}</th>
            {valueColumns.map((column) => (
              <td key={column.key}>
                {column.format ? column.format(row[column.key]) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ChartDataTable
