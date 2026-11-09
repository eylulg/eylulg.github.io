import { FileDownload02, Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import GitHub from "@/components/foundations/social-icons/github";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import { site } from "@/content/site";

const GitHubIcon = ({ className }: { className?: string }) => <GitHub aria-hidden="true" className={className} />;
const LinkedInIcon = ({ className }: { className?: string }) => <LinkedIn aria-hidden="true" className={className} />;

interface ContactButtonsProps {
    size?: "sm" | "md" | "lg" | "xl";
    /** Show the CV button first, as the primary action. */
    withCv?: boolean;
}

/** CV, GitHub, LinkedIn and email actions. External links open in a new tab. */
export function ContactButtons({ size = "md", withCv = true }: ContactButtonsProps) {
    return (
        <ul className="flex flex-wrap gap-3">
            {withCv && (
                <li>
                    <Button href={site.cvPath} target="_blank" rel="noopener" size={size} iconLeading={FileDownload02}>
                        CV (PDF)
                    </Button>
                </li>
            )}
            <li>
                <Button href={site.links.github} target="_blank" rel="noopener noreferrer" color="secondary" size={size} iconLeading={GitHubIcon}>
                    GitHub
                </Button>
            </li>
            <li>
                <Button href={site.links.linkedin} target="_blank" rel="noopener noreferrer" color="secondary" size={size} iconLeading={LinkedInIcon}>
                    LinkedIn
                </Button>
            </li>
            <li>
                <Button href={`mailto:${site.email}`} color="secondary" size={size} iconLeading={Mail01}>
                    Email
                </Button>
            </li>
        </ul>
    );
}
