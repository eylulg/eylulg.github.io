import { Mail, MapPin } from "lucide-react";
import { ContactButtons } from "@/components/site/contact-buttons";
import { Container } from "@/components/site/container";
import { PageIntro } from "@/components/site/page-intro";
import { Seo } from "@/components/site/seo";
import { languages, site } from "@/content/site";

export default function ContactPage() {
    const githubHandle = site.links.github.replace("https://", "");
    const linkedinHandle = site.links.linkedin.replace("https://www.", "");

    return (
        <>
            <Seo title="Contact" description={`Contact ${site.name} by email, LinkedIn or GitHub. Based in ${site.location}, open to remote work.`} />
            <PageIntro
                eyebrow="Get in touch"
                title="Contact"
                description="The quickest way to reach me is email. I'm based in Türkiye and open to remote work."
            >
                <ContactButtons size="lg" />
            </PageIntro>

            <Container className="grid gap-6 pb-16 md:grid-cols-2 md:pb-24">
                <section aria-labelledby="details-title" className="flex flex-col gap-4 rounded-xl bg-primary p-5 ring-1 ring-default ring-inset md:p-6">
                    <h2 id="details-title" className="text-lg font-semibold text-primary">
                        Details
                    </h2>
                    <dl className="flex flex-col gap-4 text-md">
                        <div className="flex flex-col gap-0.5">
                            <dt className="text-sm font-semibold text-secondary">Email</dt>
                            <dd>
                                <a
                                    href={`mailto:${site.email}`}
                                    className="inline-flex items-center gap-2 rounded text-brand underline-offset-2 outline-focus hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    <Mail aria-hidden="true" className="size-4" />
                                    {site.email}
                                </a>
                            </dd>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <dt className="text-sm font-semibold text-secondary">LinkedIn</dt>
                            <dd>
                                <a
                                    href={site.links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded break-all text-brand underline-offset-2 outline-focus hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    {linkedinHandle}
                                </a>
                            </dd>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <dt className="text-sm font-semibold text-secondary">GitHub</dt>
                            <dd>
                                <a
                                    href={site.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded text-brand underline-offset-2 outline-focus hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    {githubHandle}
                                </a>
                            </dd>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <dt className="text-sm font-semibold text-secondary">Location</dt>
                            <dd className="inline-flex items-center gap-2 text-tertiary">
                                <MapPin aria-hidden="true" className="size-4" />
                                {site.location}. {site.availability}
                            </dd>
                        </div>
                    </dl>
                </section>

                <section aria-labelledby="languages-title" className="flex flex-col gap-4 rounded-xl bg-primary p-5 ring-1 ring-default ring-inset md:p-6">
                    <h2 id="languages-title" className="text-lg font-semibold text-primary">
                        Languages
                    </h2>
                    <dl className="flex flex-col gap-4 text-md">
                        {languages.map((language) => (
                            <div key={language.name} className="flex flex-col gap-0.5">
                                <dt className="text-sm font-semibold text-secondary">{language.name}</dt>
                                <dd className="text-tertiary">{language.level}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </Container>
        </>
    );
}
