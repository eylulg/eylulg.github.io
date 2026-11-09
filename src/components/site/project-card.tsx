import { ArrowRight } from "@untitledui/icons";
import { Link } from "react-router";
import { Badge } from "@/components/base/badges/badges";
import type { Project } from "@/content/projects";
import { StatusBadge } from "./status-badge";

interface ProjectCardProps {
    project: Project;
    headingLevel?: "h2" | "h3";
}

/** The whole card is one link to the case study; the heading names it. */
export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
    return (
        <article className="group relative flex h-full flex-col gap-4 rounded-xl bg-primary p-5 shadow-xs ring-1 ring-secondary transition duration-100 ease-linear ring-inset focus-within:ring-2 focus-within:ring-brand hover:ring-primary md:p-6">
            <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={project.status} />
            </div>
            <Heading className="text-lg font-semibold text-primary">
                <Link to={`/projects/${project.slug}`} className="outline-hidden after:absolute after:inset-0 after:rounded-xl after:content-['']">
                    {project.title}
                </Link>
            </Heading>
            <p className="flex-1 text-md text-tertiary">{project.summary}</p>
            <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                    <li key={tag}>
                        <Badge type="modern" size="sm" color="gray">
                            {tag}
                        </Badge>
                    </li>
                ))}
            </ul>
            <span aria-hidden="true" className="flex items-center gap-1.5 text-sm font-semibold text-brand-secondary">
                Read the case study
                <ArrowRight className="size-4 transition duration-100 ease-linear group-hover:translate-x-0.5" />
            </span>
        </article>
    );
}
