import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@eylulg/ui/cx";

/**
 * Page-width wrapper. It cancels the side padding of AppShell's main landmark and applies the same
 * gutter inside a max width, so page content lines up with the top nav and footer.
 */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />
        </div>
    );
}
