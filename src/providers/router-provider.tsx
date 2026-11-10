import { type PropsWithChildren } from "react";
import { RouterProvider } from "react-aria-components";
import { type NavigateOptions, useHref, useNavigate } from "react-router";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

const isExternal = (href: string) => /^([a-z][a-z\d+.-]*:|\/\/)/i.test(href);

/** React Router's useHref would mangle absolute URLs such as https: and mailto: links. */
function useRouterHref(href: string): string {
    const routerHref = useHref(isExternal(href) ? "/" : href);
    return isExternal(href) ? href : routerHref;
}

/** Lets React Aria links navigate client-side through React Router. */
export const RouteProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();

    return (
        <RouterProvider navigate={(to, options) => navigate(to, options)} useHref={useRouterHref}>
            {children}
        </RouterProvider>
    );
};
