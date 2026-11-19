import { Button } from "@eylulg/ui/button";
import { ArrowRight, Layers, Monitor, Workflow } from "lucide-react";
import { ContactButtons } from "@/components/site/contact-buttons";
import { ProjectCard } from "@/components/site/project-card";
import { Seo } from "@/components/site/seo";
import { VariantsStrip } from "@/components/site/variants-strip";
import { featuredProjects } from "@/content/projects";
import { type ProofPoint, proofPoints, site } from "@/content/site";
import type { IconComponent } from "@/types/icon";

const proofIcons: Record<ProofPoint["id"], IconComponent> = {
    "product-ui": Monitor,
    "design-systems": Layers,
    "ai-agents": Workflow,
};

export default function HomePage() {
    return (
        <>
            <Seo description={`${site.tagline} Portfolio, projects and experience of ${site.name}.`} />

            <section aria-labelledby="hero-title" className="border-b border-subtle">
                <div className="flex flex-col gap-8 py-10 md:py-14">
                    <div className="flex max-w-3xl flex-col gap-4">
                        <p className="text-sm font-semibold text-brand md:text-md">{site.location}</p>
                        <h1 id="hero-title" className="text-3xl font-semibold text-primary">
                            {site.name}
                        </h1>
                        <p className="text-lg text-tertiary md:text-xl">{site.tagline}</p>
                        <p className="text-md font-semibold text-primary">{site.availability}</p>
                    </div>
                    <ContactButtons size="lg" />
                    <VariantsStrip />
                </div>
            </section>

            <section aria-labelledby="proof-title" className="py-12 md:py-16">
                <div className="flex flex-col gap-8">
                    <h2 id="proof-title" className="text-xl font-semibold text-primary md:text-2xl">
                        Three things I can show you
                    </h2>
                    <ul className="grid gap-6 lg:grid-cols-3">
                        {proofPoints.map((point) => {
                            const Icon = proofIcons[point.id];
                            return (
                                <li key={point.id} className="flex flex-col gap-4 rounded-xl bg-secondary p-5 md:p-6">
                                    <span className="flex size-12 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                                        <Icon aria-hidden="true" className="size-6" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-primary">{point.title}</h3>
                                    <p className="flex-1 text-md text-tertiary">{point.body}</p>
                                    <Button href={point.href} variant="tertiary" size="md" iconTrailing={ArrowRight} className="self-start">
                                        {point.linkLabel}
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="featured-title" className="pb-16 md:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 id="featured-title" className="text-xl font-semibold text-primary md:text-2xl">
                            Featured projects
                        </h2>
                        <Button href="/projects" variant="secondary" size="md" iconTrailing={ArrowRight}>
                            All projects
                        </Button>
                    </div>
                    <ul className="grid gap-6 md:grid-cols-2">
                        {featuredProjects.map((project) => (
                            <li key={project.slug}>
                                <ProjectCard project={project} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
