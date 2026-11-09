import { ArrowRight } from "@untitledui/icons";
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { AgentFlowDiagram } from "@/components/site/agent-flow-diagram";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { Seo } from "@/components/site/seo";
import { agentFlow, agentIntro, agentSections } from "@/content/agents";

export default function AgentsPage() {
    return (
        <>
            <Seo
                title="AI agents"
                description="An engineering agent that takes tickets to pull requests with human approval gates, and a library of reusable agent skills."
            />
            <PageHeader eyebrow="AI engineering" title="AI agents" description={agentIntro[0]}>
                <p className="text-md text-tertiary">{agentIntro[1]}</p>
            </PageHeader>

            <Container className="flex flex-col gap-16 pb-16 md:pb-24">
                <section aria-labelledby="flow-title" className="grid items-start gap-10 lg:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <h2 id="flow-title" className="text-display-xs font-semibold text-primary">
                            From ticket to pull request
                        </h2>
                        <ol className="flex flex-col gap-3">
                            {agentFlow.map((step, index) => (
                                <li key={step.id} className="flex gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-solid text-xs font-semibold text-white"
                                    >
                                        {index + 1}
                                    </span>
                                    <p className="text-md text-tertiary">
                                        <span className="font-semibold text-primary">{step.label}.</span> {step.detail}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <AgentFlowDiagram />
                </section>

                <section aria-labelledby="details-title" className="flex flex-col gap-6">
                    <h2 id="details-title" className="text-display-xs font-semibold text-primary">
                        How it's built
                    </h2>
                    <Tabs defaultSelectedKey={agentSections[0].id} className="gap-6">
                        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                            <Tabs.List
                                type="button-minimal"
                                size="sm"
                                aria-label="Agent details"
                                className="w-max rounded-lg bg-secondary p-1 ring-1 ring-secondary ring-inset"
                            >
                                {agentSections.map((section) => (
                                    <Tabs.Item key={section.id} id={section.id}>
                                        {section.title}
                                    </Tabs.Item>
                                ))}
                            </Tabs.List>
                        </div>
                        {agentSections.map((section) => (
                            <Tabs.Panel key={section.id} id={section.id} className="flex max-w-3xl flex-col gap-4 rounded-lg">
                                <p className="text-lg text-secondary">{section.intro}</p>
                                <ul className="flex list-disc flex-col gap-2 pl-5 text-md text-tertiary marker:text-fg-quaternary">
                                    {section.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </Tabs.Panel>
                        ))}
                    </Tabs>
                </section>

                <section aria-labelledby="rewrite-title" className="flex flex-col items-start gap-4 rounded-xl bg-secondary p-6 md:p-8">
                    <h2 id="rewrite-title" className="text-xl font-semibold text-primary">
                        The open rewrite
                    </h2>
                    <p className="max-w-3xl text-md text-tertiary">
                        I'm rewriting the agent from scratch in TypeScript as a generic project, with a dry-run mode so anyone can see the flow without tokens.
                    </p>
                    <Button href="/projects/ticket-to-pr-agent" color="secondary" size="md" iconTrailing={ArrowRight}>
                        Read the case study
                    </Button>
                </section>
            </Container>
        </>
    );
}
