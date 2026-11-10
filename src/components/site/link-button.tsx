import { type ButtonSize, type ButtonVariant, buttonSizes, buttonVariants } from "@eylulg/ui/button";
import { cx } from "@eylulg/ui/cx";
import { Link, type LinkProps, composeRenderProps } from "react-aria-components";
import type { IconComponent } from "@/types/icon";

const LINK_BUTTON_BASE =
    "relative inline-flex cursor-pointer items-center justify-center rounded-md font-semibold whitespace-nowrap transition-colors select-none outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-focus";

interface LinkButtonProps extends Omit<LinkProps, "children"> {
    children: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconLeading?: IconComponent;
    iconTrailing?: IconComponent;
}

/** A link that looks like the library's Button. The library's Button has no href, so this reuses its styles. */
export function LinkButton({
    variant = "primary",
    size = "md",
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    className,
    children,
    ...props
}: LinkButtonProps) {
    return (
        <Link {...props} className={composeRenderProps(className, (consumer) => cx(LINK_BUTTON_BASE, buttonVariants[variant], buttonSizes[size], consumer))}>
            {IconLeading && <IconLeading aria-hidden="true" className="size-4 shrink-0" />}
            {children}
            {IconTrailing && <IconTrailing aria-hidden="true" className="size-4 shrink-0" />}
        </Link>
    );
}
