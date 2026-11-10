import type { ReactNode } from "react";
import { PageHeader } from "@eylulg/ui/page-header";
import { Container } from "./container";

interface PageIntroProps {
    eyebrow: string;
    title: string;
    description?: string;
    children?: ReactNode;
}

/** The library's PageHeader with an eyebrow above it and room for actions or extra text below. */
export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
    return (
        <Container className="pt-6 pb-8 md:pb-12">
            <div className="flex max-w-3xl flex-col gap-4">
                <p className="text-sm font-semibold text-brand md:text-md">{eyebrow}</p>
                <PageHeader title={title} description={description} />
                {children}
            </div>
        </Container>
    );
}
