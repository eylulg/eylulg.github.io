import { BadgeWithDot } from "@/components/base/badges/badges";
import type { ProjectStatus } from "@/content/projects";

export function StatusBadge({ status }: { status: ProjectStatus }) {
    return (
        <BadgeWithDot type="pill-color" size="sm" color={status === "live" ? "success" : "warning"}>
            {status === "live" ? "Live" : "In progress"}
        </BadgeWithDot>
    );
}
