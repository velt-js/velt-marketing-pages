import type { LeavesAccountContent } from "./content";

import "./LeavesAccount.css";

type LeavesAccountProps = {
  content: LeavesAccountContent;
};

/**
 * Transparency table: what still leaves the customer's account once Velt runs
 * inside it. Rendered as a real table so the item and its answer stay
 * associated for screen readers and for agents reading the page.
 * @param {LeavesAccountProps} props Section content.
 * @returns {JSX.Element} The section.
 */
export default function LeavesAccount({ content }: LeavesAccountProps) {
  return (
    <section className="vla" id="what-leaves" data-section="what-leaves">
      <div className="wrap">
        <div className="vla-head">
          {content.kicker ? <p className="kicker">{content.kicker}</p> : null}
          <h2>{content.heading}</h2>
          {content.support ? <p className="vla-support">{content.support}</p> : null}
        </div>

        <table className="vla-table">
          <thead>
            <tr>
              <th scope="col">What</th>
              <th scope="col">What leaves your account</th>
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.item}>
                <th scope="row">{row.item}</th>
                <td>{row.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
