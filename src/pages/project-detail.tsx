import type { ReactNode } from "react";
import { Badge } from "@eylulg/ui/badge";
import { Button } from "@eylulg/ui/button";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useParams } from "react-router";
import { Seo } from "@/components/site/seo";
import { StatusBadge } from "@/components/site/status-badge";
import { getProject, projectLinks } from "@/content/projects";
import NotFoundPage from "./not-found";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
        <section aria-labelledby={id} className="flex flex-col gap-3 border-t border-subtle pt-8">
            <h2 id={id} className="text-xl font-semibold text-primary">
                {title}
            </h2>
            {children}
        </section>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="flex list-disc flex-col gap-2 pl-5 text-md text-tertiary marker:text-fg-tertiary">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const project = getProject(slug);

    if (!project) return <NotFoundPage />;

    const links = projectLinks(project);
    const inProgress = project.status === "in progress";

    return (
        <>
            <Seo title={project.title} description={project.summary} />
            <div className="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
                <Button href="/projects" variant="tertiary" size="md" iconLeading={ArrowLeft} className="-ml-3 self-start">
                    All projects
                </Button>

                <header className="flex max-w-3xl flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={project.status} />
                        {project.tags.map((tag) => (
                            <Badge key={tag} size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-2xl font-semibold text-primary md:text-3xl">{project.title}</h1>
                    <p className="text-lg text-tertiary md:text-xl">{project.summary}</p>
                    {inProgress && (
                        <p className="rounded-lg bg-warning-subtle px-4 py-3 text-sm text-warning">
                            This project is in progress. The sections below describe the scope I'm building to.
                        </p>
                    )}
                </header>

                <div className="flex max-w-3xl flex-col gap-8">
                    <Section id="problem" title="Problem">
                        <p className="text-md text-tertiary">{project.problem}</p>
                    </Section>

                    <Section id="built" title="What I built">
                        <BulletList items={project.built} />
                    </Section>

                    <Section id="stack" title="Stack">
                        <ul className="flex flex-wrap gap-2">
                            {project.stack.map((item) => (
                                <li key={item}>
                                    <Badge size="md" color="brand">
                                        {item}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section id="tested" title="What I tested">
                        <BulletList items={project.tested} />
                    </Section>

                    <Section id="outcome" title="Outcome">
                        <p className="text-md text-tertiary">{project.outcome}</p>
                    </Section>

                    <Section id="links" title="Links">
                        {links.length > 0 ? (
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link.href} className="flex flex-wrap items-center gap-2">
                                        <Button
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="tertiary"
                                            size="md"
                                            iconTrailing={ArrowUpRight}
                                        >
                                            {link.label}
                                        </Button>
                                        {link.planned && <Badge size="sm">Not deployed yet</Badge>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-md text-tertiary">The repository isn't public yet.</p>
                        )}
                    </Section>

                    <Section id="screenshots" title="Screenshots">
                        <ul className="grid gap-6 sm:grid-cols-2">
                            {project.screenshots.map((shot) => (
                                <li key={shot.alt}>
                                    <img
                                        src={shot.src}
                                        alt={shot.alt}
                                        width={640}
                                        height={400}
                                        loading="lazy"
                                        className="h-auto w-full rounded-lg bg-secondary ring-1 ring-default"
                                    />
                                </li>
                            ))}
                        </ul>
                    </Section>
                </div>
            </div>
        </>
    );
}
