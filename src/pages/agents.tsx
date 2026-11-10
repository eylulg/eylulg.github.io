import { Button } from "@eylulg/ui/button";
import { PageHeader } from "@eylulg/ui/page-header";
import { Tab, TabList, TabPanel, Tabs } from "@eylulg/ui/tabs";
import { ArrowRight } from "lucide-react";
import { AgentFlowDiagram } from "@/components/site/agent-flow-diagram";
import { Seo } from "@/components/site/seo";
import { agentFlow, agentIntro, agentSections } from "@/content/agents";

export default function AgentsPage() {
    return (
        <>
            <Seo
                title="AI agents"
                description="An engineering agent that takes tickets to pull requests with human approval gates, and a library of reusable agent skills."
            />
            <div className="flex max-w-3xl flex-col gap-4 pt-6 pb-8 md:pb-12">
                <PageHeader eyebrow="AI engineering" title="AI agents" description={agentIntro[0]} />
                <p className="text-md text-tertiary">{agentIntro[1]}</p>
            </div>

            <div className="flex flex-col gap-16 pb-16 md:pb-24">
                <section aria-labelledby="flow-title" className="grid items-start gap-10 lg:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <h2 id="flow-title" className="text-xl font-semibold text-primary">
                            From ticket to pull request
                        </h2>
                        <ol className="flex flex-col gap-3">
                            {agentFlow.map((step, index) => (
                                <li key={step.id} className="flex gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-solid text-xs font-semibold text-on-solid"
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
                    <h2 id="details-title" className="text-xl font-semibold text-primary">
                        How it's built
                    </h2>
                    <Tabs defaultSelectedKey={agentSections[0].id} className="gap-6">
                        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                            <TabList aria-label="Agent details" className="w-max">
                                {agentSections.map((section) => (
                                    <Tab key={section.id} id={section.id}>
                                        {section.title}
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                        {agentSections.map((section) => (
                            <TabPanel key={section.id} id={section.id} className="flex max-w-3xl flex-col gap-4 rounded-lg">
                                <p className="text-lg text-secondary">{section.intro}</p>
                                <ul className="flex list-disc flex-col gap-2 pl-5 text-md text-tertiary marker:text-fg-tertiary">
                                    {section.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </TabPanel>
                        ))}
                    </Tabs>
                </section>

                <section aria-labelledby="case-studies-title" className="flex flex-col items-start gap-4 rounded-xl bg-secondary p-6 md:p-8">
                    <h2 id="case-studies-title" className="text-xl font-semibold text-primary">
                        See it in practice
                    </h2>
                    <p className="max-w-3xl text-md text-tertiary">
                        Two case studies show the human side of working with agents: the dashboard an operator uses to approve, guard and route an engineering
                        agent, and a review tool where every AI finding passes through a person.
                    </p>
                    <p className="max-w-3xl text-md text-tertiary">
                        This site and its projects were built with the same kind of workflow, and the page about it says what the agents did, what I decided and
                        what went wrong.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button href="/how-this-was-built" variant="secondary" size="md" iconTrailing={ArrowRight}>
                            How this portfolio was built
                        </Button>
                        <Button href="/projects/agent-control-room" variant="secondary" size="md" iconTrailing={ArrowRight}>
                            Agent control room
                        </Button>
                        <Button href="/projects/review-companion" variant="secondary" size="md" iconTrailing={ArrowRight}>
                            Review Companion
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
