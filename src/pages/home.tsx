import { ArrowRight, Dataflow03, LayersThree01, Monitor01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { ContactButtons } from "@/components/site/contact-buttons";
import { Container } from "@/components/site/container";
import { ProjectCard } from "@/components/site/project-card";
import { Seo } from "@/components/site/seo";
import { featuredProjects } from "@/content/projects";
import { type ProofPoint, proofPoints, site } from "@/content/site";

const proofIcons: Record<ProofPoint["id"], typeof Monitor01> = {
    "product-ui": Monitor01,
    "design-systems": LayersThree01,
    "ai-agents": Dataflow03,
};

export default function HomePage() {
    return (
        <>
            <Seo description={`${site.tagline} Portfolio, projects and experience of ${site.name}.`} />

            <section aria-labelledby="hero-title" className="border-b border-secondary">
                <Container className="flex flex-col gap-8 py-14 md:py-24">
                    <div className="flex max-w-3xl flex-col gap-4">
                        <p className="text-sm font-semibold text-brand-secondary md:text-md">
                            {site.role} · {site.pronouns}
                        </p>
                        <h1 id="hero-title" className="text-display-md font-semibold text-primary md:text-display-xl">
                            {site.name}
                        </h1>
                        <p className="text-lg text-tertiary md:text-xl">{site.tagline}</p>
                    </div>
                    <ContactButtons size="lg" />
                </Container>
            </section>

            <section aria-labelledby="proof-title" className="py-14 md:py-20">
                <Container className="flex flex-col gap-8">
                    <h2 id="proof-title" className="text-display-xs font-semibold text-primary md:text-display-sm">
                        What I bring
                    </h2>
                    <ul className="grid gap-6 md:grid-cols-3">
                        {proofPoints.map((point) => (
                            <li key={point.id} className="flex flex-col gap-4 rounded-xl bg-secondary p-5 md:p-6">
                                <FeaturedIcon icon={proofIcons[point.id]} color="brand" theme="light" size="lg" />
                                <h3 className="text-lg font-semibold text-primary">{point.title}</h3>
                                <p className="flex-1 text-md text-tertiary">{point.body}</p>
                                <Button href={point.href} color="link-color" size="md" iconTrailing={ArrowRight}>
                                    {point.linkLabel}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            <section aria-labelledby="featured-title" className="pb-16 md:pb-24">
                <Container className="flex flex-col gap-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 id="featured-title" className="text-display-xs font-semibold text-primary md:text-display-sm">
                            Featured projects
                        </h2>
                        <Button href="/projects" color="secondary" size="md" iconTrailing={ArrowRight}>
                            All projects
                        </Button>
                    </div>
                    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredProjects.map((project) => (
                            <li key={project.slug}>
                                <ProjectCard project={project} />
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>
        </>
    );
}
