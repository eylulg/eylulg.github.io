import { agentFlow } from "@/content/agents";

const WIDTH = 360;
const NODE_X = 50;
const NODE_W = 230;
const NODE_H = 56;
const GAP = 28;
const TOP = 8;

const nodeStyle = {
    step: { fill: "var(--color-bg-primary)", stroke: "var(--color-border-primary)", label: "var(--color-text-primary)" },
    loop: { fill: "var(--color-bg-secondary)", stroke: "var(--color-border-primary)", label: "var(--color-text-primary)" },
    gate: { fill: "var(--color-bg-primary)", stroke: "var(--color-border-brand)", label: "var(--color-text-brand-secondary)" },
} as const;

const arrowColor = "var(--color-fg-quaternary)";

/**
 * Ticket-to-PR flow, drawn vertically so it stays legible at phone width.
 * All colours come from Untitled UI theme variables, so it follows light and dark mode.
 */
export function AgentFlowDiagram() {
    const height = TOP * 2 + agentFlow.length * NODE_H + (agentFlow.length - 1) * GAP;

    return (
        <figure className="flex flex-col items-center gap-3">
            <svg
                viewBox={`0 0 ${WIDTH} ${height}`}
                role="img"
                aria-labelledby="agent-flow-title"
                aria-describedby="agent-flow-desc"
                className="h-auto w-full max-w-md"
                fontFamily="inherit"
            >
                <title id="agent-flow-title">Ticket-to-pull-request flow</title>
                <desc id="agent-flow-desc">{agentFlow.map((step) => step.label).join(", then ")}. The CI fix loop and review replies repeat until done.</desc>
                <defs>
                    <marker id="agent-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0 0 L10 5 L0 10 z" style={{ fill: arrowColor }} />
                    </marker>
                </defs>

                {agentFlow.map((step, index) => {
                    const y = TOP + index * (NODE_H + GAP);
                    const style = nodeStyle[step.kind];
                    const cy = y + NODE_H / 2;
                    const right = NODE_X + NODE_W;

                    return (
                        <g key={step.id}>
                            {index > 0 && (
                                <line
                                    x1={NODE_X + NODE_W / 2}
                                    y1={y - GAP + 2}
                                    x2={NODE_X + NODE_W / 2}
                                    y2={y - 3}
                                    style={{ stroke: arrowColor }}
                                    strokeWidth={1.5}
                                    markerEnd="url(#agent-flow-arrow)"
                                />
                            )}
                            <rect
                                x={NODE_X}
                                y={y}
                                width={NODE_W}
                                height={NODE_H}
                                rx={step.kind === "gate" ? NODE_H / 2 : 10}
                                style={{ fill: style.fill, stroke: style.stroke }}
                                strokeWidth={step.kind === "gate" ? 2 : 1.25}
                                strokeDasharray={step.kind === "gate" ? "6 4" : undefined}
                            />
                            <text x={NODE_X + NODE_W / 2} y={cy - 4} textAnchor="middle" fontSize="15" fontWeight="600" style={{ fill: style.label }}>
                                {step.label}
                            </text>
                            <text x={NODE_X + NODE_W / 2} y={cy + 15} textAnchor="middle" fontSize="12" style={{ fill: "var(--color-text-tertiary)" }}>
                                {step.short}
                            </text>
                            {step.kind === "loop" && (
                                <>
                                    <path
                                        d={`M ${right} ${cy - 12} C ${right + 40} ${cy - 30}, ${right + 40} ${cy + 30}, ${right + 2} ${cy + 12}`}
                                        fill="none"
                                        style={{ stroke: arrowColor }}
                                        strokeWidth={1.5}
                                        markerEnd="url(#agent-flow-arrow)"
                                    />
                                    <text x={right + 36} y={cy + 4} fontSize="11" style={{ fill: "var(--color-text-tertiary)" }}>
                                        repeat
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}
            </svg>
            <figcaption className="text-sm text-tertiary">Dashed steps are approval gates where the owner decides.</figcaption>
        </figure>
    );
}
