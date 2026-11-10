import { PageHeader } from "@eylulg/ui/page-header";
import { Seo } from "@/components/site/seo";
import { principleGroups, principlesIntro } from "@/content/principles";

export default function PrinciplesPage() {
    return (
        <>
            <Seo
                title="How I work"
                description="How Eylül Güneş works: design and UI, code and checks, pull requests and review, and communication, with when each rule bends."
            />
            <div className="max-w-3xl pt-6 pb-8 md:pb-12">
                <PageHeader
                    eyebrow="Principles"
                    title="How I work"
                    description={principlesIntro}
                    meta={
                        <nav aria-label="On this page">
                            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                                {principleGroups.map((group) => (
                                    <li key={group.id}>
                                        <a
                                            href={`#${group.id}`}
                                            className="rounded text-brand underline-offset-2 outline-focus hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            {group.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    }
                />
            </div>

            <div className="grid gap-6 pb-16 md:grid-cols-2 md:pb-24">
                {principleGroups.map((group) => (
                    <section
                        key={group.id}
                        id={group.id}
                        aria-labelledby={`${group.id}-title`}
                        className="flex scroll-mt-20 flex-col gap-4 rounded-xl bg-primary p-5 ring-1 ring-default ring-inset md:p-6"
                    >
                        <h2 id={`${group.id}-title`} className="text-lg font-semibold text-primary">
                            {group.title}
                        </h2>
                        <ul className="flex list-disc flex-col gap-2 pl-5 text-md text-tertiary marker:text-fg-tertiary">
                            {group.principles.map((principle) => (
                                <li key={principle}>{principle}</li>
                            ))}
                        </ul>
                        <p className="text-md text-tertiary">
                            <span className="font-semibold text-secondary">When it bends.</span> {group.bends}
                        </p>
                    </section>
                ))}
            </div>
        </>
    );
}
