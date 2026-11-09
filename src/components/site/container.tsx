import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/utils/cx";

/** Page-width wrapper: 16px gutter on phones, 32px from md up. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
    return <div className={cx("mx-auto w-full max-w-container px-4 md:px-8", className)} {...props} />;
}
