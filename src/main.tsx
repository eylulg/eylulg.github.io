import { StrictMode } from "react";
import "@fontsource-variable/inter";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { routes } from "@/router";
import "@/styles/globals.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
