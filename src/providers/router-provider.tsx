import { type PropsWithChildren } from "react";
import { LinkRouter } from "@eylulg/ui/chrome";
import { type NavigateOptions, useHref, useNavigate } from "react-router";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

/** Lets React Aria links navigate through React Router, and load other projects as pages. */
export const RouteProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();

    return (
        <LinkRouter navigate={navigate} useHref={useHref}>
            {children}
        </LinkRouter>
    );
};
