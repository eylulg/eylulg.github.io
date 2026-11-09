import { useMemo, useState } from "react";
import { ArrowRight, SearchLg } from "@untitledui/icons";
import type { Key } from "react-aria-components";
import { useSearchParams } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Tag, TagGroup, TagList } from "@/components/base/tags/tags";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { ProjectCard } from "@/components/site/project-card";
import { Seo } from "@/components/site/seo";
import { projectTags, projects, tagFromSlug, tagToSlug } from "@/content/projects";

const ALL = "all";

export default function ProjectsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState("");
    const activeTag = tagFromSlug(searchParams.get("tag"));

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return projects.filter((project) => {
            if (activeTag && !project.tags.includes(activeTag)) return false;
            if (!needle) return true;
            return [project.title, project.summary, ...project.stack].some((text) => text.toLowerCase().includes(needle));
        });
    }, [activeTag, query]);

    const onTagChange = (keys: Set<Key> | "all") => {
        const [key] = keys === "all" ? [ALL] : [...keys];
        setSearchParams(key && key !== ALL ? { tag: String(key) } : {}, { replace: true, preventScrollReset: true });
    };

    return (
        <>
            <Seo
                title="Projects"
                description="Projects by Eylül Güneş: a component library, a design-token tool, an engineering agent, and React and Vue apps."
            />
            <PageHeader
                eyebrow="Work"
                title="Projects"
                description="Public projects I'm building or rebuilding, each with tests, CI and a deployment. Filter by tag or search by name or stack."
            />

            <Container className="flex flex-col gap-8 pb-16 md:pb-24">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <TagGroup
                        label="Filter projects by tag"
                        selectionMode="single"
                        size="lg"
                        selectedKeys={[activeTag ? tagToSlug(activeTag) : ALL]}
                        onSelectionChange={onTagChange}
                    >
                        <TagList className="flex flex-wrap gap-2">
                            <Tag id={ALL}>All</Tag>
                            {projectTags.map((tag) => (
                                <Tag key={tag} id={tagToSlug(tag)}>
                                    {tag}
                                </Tag>
                            ))}
                        </TagList>
                    </TagGroup>
                    <Input
                        className="md:w-72"
                        label="Search projects"
                        placeholder="Search by name or stack"
                        icon={SearchLg}
                        value={query}
                        onChange={setQuery}
                        type="search"
                    />
                </div>

                <p role="status" className="text-sm text-tertiary">
                    {visible.length === 1 ? "1 project" : `${visible.length} projects`}
                    {activeTag ? ` tagged ${activeTag}` : ""}
                    {query.trim() ? ` matching "${query.trim()}"` : ""}
                </p>

                {visible.length > 0 ? (
                    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {visible.map((project) => (
                            <li key={project.slug}>
                                <ProjectCard project={project} headingLevel="h2" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-start gap-3 rounded-xl bg-secondary p-6">
                        <p className="text-md text-tertiary">
                            {activeTag === "Microsoft 365"
                                ? "No public projects yet. My Microsoft 365 work, Word and Outlook add-ins with Office.js and Microsoft Graph, lives in private company repositories."
                                : "No projects match. Try another tag or a shorter search."}
                        </p>
                        {activeTag === "Microsoft 365" && (
                            <Button href="/experience" color="link-color" size="md" iconTrailing={ArrowRight}>
                                Read about it on the Experience page
                            </Button>
                        )}
                    </div>
                )}
            </Container>
        </>
    );
}
