import type { AgentLayerContent } from "./content";

import "./solutions.css";

type AgentLayerProps = {
  content: AgentLayerContent;
};

/**
 * Agent Action Layer, vertical edition: agents propose, humans approve, in this
 * vertical's stakes. Copy on the left, the proposal/approve storyboard visual
 * on the right.
 * @param {AgentLayerProps} props Section content.
 * @returns {JSX.Element} The agent-layer section.
 */
export default function AgentLayer({ content }: AgentLayerProps) {
  return (
    <section className="band band-soft" id="agent-layer" data-section="agent-layer">
      <div className="wrap agent-grid">
        <div className="agent-copy">
          <p className="kicker">{content.kicker}</p>
          <h2>{content.heading}</h2>
          <p className="agent-body">{content.body}</p>
        </div>
        <div className="agent-stage">{content.visual}</div>
      </div>
    </section>
  );
}
