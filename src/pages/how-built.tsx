import { Button } from "@eylulg/ui/button";
import { PageHeader } from "@eylulg/ui/page-header";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/site/seo";
import { builtIntro, builtSections } from "@/content/how-built";

export default function HowBuiltPage() {
    return (
        <>
            <Seo
                title="How this portfolio was built"
                description="This portfolio and its projects were built in November 2026 with an AI agent workflow I designed and ran. What I decided, what the agents produced, and what went wrong."
            />
            <div className="max-w-3xl pt-6 pb-8 md:pb-12">
                <PageHeader eyebrow="About this site" title="How this portfolio was built" description={builtIntro} />
            </div>

            <div className="flex max-w-3xl flex-col gap-10 pb-16 md:pb-24">
                {builtSections.map((section) => (
                    <section key={section.id} aria-labelledby={`${section.id}-title`} className="flex flex-col gap-3 border-t border-subtle pt-8">
                        <h2 id={`${section.id}-title`} className="text-xl font-semibold text-primary">
                            {section.title}
                        </h2>
                        {section.intro && <p className="text-md text-secondary">{section.intro}</p>}
                        {section.points && (
                            <ul className="flex list-disc flex-col gap-2 pl-5 text-md text-tertiary marker:text-fg-tertiary">
                                {section.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}

                <div className="flex flex-wrap gap-3">
                    <Button href="/agents" variant="secondary" size="md" iconTrailing={ArrowRight}>
                        AI agents
                    </Button>
                    <Button href="/principles" variant="secondary" size="md" iconTrailing={ArrowRight}>
                        How I work
                    </Button>
                </div>
            </div>
        </>
    );
}
