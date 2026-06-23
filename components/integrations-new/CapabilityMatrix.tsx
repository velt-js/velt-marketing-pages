import { MATRIX_COLUMNS, type Capabilities, type MatrixRow } from "./content";

type CapabilityMatrixProps = {
  rows: MatrixRow[];
  caption?: string;
};

/**
 * Render one capability cell with a state-appropriate style.
 * @param {string} [value] The capability value ("Yes" | "Annotations" | "n/a").
 * @returns {JSX.Element} The cell content.
 */
function Cell({ value }: { value?: string }) {
  const normalized = value ?? "n/a";
  if (normalized === "Yes") {
    return <span className="vintg-cell-yes" aria-label="Yes">Yes</span>;
  }
  if (normalized === "n/a" || normalized === "") {
    return <span className="vintg-cell-na" aria-label="Not applicable">n/a</span>;
  }
  return <span className="vintg-cell-alt">{normalized}</span>;
}

/**
 * The Surface x Capability matrix, derived from the integrationLibrary roster.
 * @param {CapabilityMatrixProps} props Matrix rows + caption.
 * @returns {JSX.Element} The matrix table.
 */
export default function CapabilityMatrix({ rows, caption }: CapabilityMatrixProps) {
  return (
    <div>
      <div className="vintg-matrix-scroll">
        <table className="vintg-matrix">
          <thead>
            <tr>
              <th scope="col">Surface</th>
              {MATRIX_COLUMNS.map((column) => (
                <th key={column.key} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug}>
                <th scope="row">
                  <a href={`/libraries/${row.slug}`}>{row.name}</a>
                  {row.beta ? <span className="vintg-chip-beta"> beta</span> : null}
                </th>
                {MATRIX_COLUMNS.map((column) => (
                  <td key={column.key}>
                    <Cell value={row.capabilities?.[column.key as keyof Capabilities]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? <p className="vintg-matrix-caption">{caption}</p> : null}
    </div>
  );
}
