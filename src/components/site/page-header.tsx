import type { ReactNode } from "react";
import { Container } from "./container";

interface PageHeaderProps {
    eyebrow?: string;
    title: string;
    description?: ReactNode;
    children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
    return (
        <Container className="pt-12 pb-8 md:pt-20 md:pb-12">
            <div className="flex max-w-3xl flex-col gap-4">
                {eyebrow && <p className="text-sm font-semibold text-brand-secondary md:text-md">{eyebrow}</p>}
                <h1 className="text-display-sm font-semibold text-primary md:text-display-md">{title}</h1>
                {description && <div className="text-lg text-tertiary md:text-xl">{description}</div>}
                {children}
            </div>
        </Container>
    );
}
