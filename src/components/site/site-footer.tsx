import { site } from "@/content/site";
import { ContactButtons } from "./contact-buttons";
import { Container } from "./container";

export function SiteFooter() {
    return (
        <footer className="border-t border-secondary bg-secondary py-10 md:py-12">
            <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-md font-semibold text-primary">{site.name}</p>
                    <p className="text-sm text-tertiary">
                        {site.role} · {site.location} · {site.availability}
                    </p>
                </div>
                <ContactButtons size="sm" />
            </Container>
        </footer>
    );
}
