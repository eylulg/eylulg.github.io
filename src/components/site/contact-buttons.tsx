import { FileDown, Mail } from "lucide-react";
import GitHub from "@/components/foundations/social-icons/github";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import { LinkButton } from "@/components/site/link-button";
import { site } from "@/content/site";

const GitHubIcon = ({ className }: { className?: string }) => <GitHub aria-hidden="true" className={className} />;
const LinkedInIcon = ({ className }: { className?: string }) => <LinkedIn aria-hidden="true" className={className} />;

interface ContactButtonsProps {
    size?: "sm" | "md" | "lg";
    /** Show the CV button first, as the primary action. */
    withCv?: boolean;
}

/** CV, GitHub, LinkedIn and email actions. External links open in a new tab. */
export function ContactButtons({ size = "md", withCv = true }: ContactButtonsProps) {
    return (
        <ul className="flex flex-wrap gap-3">
            {withCv && (
                <li>
                    <LinkButton href={site.cvPath} target="_blank" rel="noopener" size={size} iconLeading={FileDown}>
                        CV (PDF)
                    </LinkButton>
                </li>
            )}
            <li>
                <LinkButton href={site.links.github} target="_blank" rel="noopener noreferrer" variant="secondary" size={size} iconLeading={GitHubIcon}>
                    GitHub
                </LinkButton>
            </li>
            <li>
                <LinkButton href={site.links.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary" size={size} iconLeading={LinkedInIcon}>
                    LinkedIn
                </LinkButton>
            </li>
            <li>
                <LinkButton href={`mailto:${site.email}`} variant="secondary" size={size} iconLeading={Mail}>
                    Email
                </LinkButton>
            </li>
        </ul>
    );
}
