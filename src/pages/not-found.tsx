import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/site/container";
import { LinkButton } from "@/components/site/link-button";
import { Seo } from "@/components/site/seo";

export default function NotFoundPage() {
    return (
        <>
            <Seo title="Page not found" description="This page doesn't exist." />
            <Container className="flex flex-col gap-8 py-16 md:py-24">
                <div className="flex max-w-3xl flex-col gap-4">
                    <p className="text-md font-semibold text-brand">404 error</p>
                    <h1 className="text-2xl font-semibold text-primary md:text-3xl">Page not found</h1>
                    <p className="text-lg text-tertiary md:text-xl">The page you're looking for doesn't exist or has moved.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <LinkButton href="/" size="lg" iconLeading={ArrowLeft}>
                        Back to home
                    </LinkButton>
                    <LinkButton href="/projects" variant="secondary" size="lg">
                        See projects
                    </LinkButton>
                </div>
            </Container>
        </>
    );
}
