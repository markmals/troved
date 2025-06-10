import type { PropsWithChildren } from "react";
import {
    href,
    isRouteErrorResponse,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
} from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "~/components/ui/navigation-menu.tsx";
import type { Route } from "./+types/root";
import stylesheet from "./styles/index.css?url";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <Meta />
                <Links />
            </head>
            <body className="bg-background">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

const navigation = {
    home: href("/"),
    search: href("/series/search"),
    subscriptions: href("/subscriptions"),
};

export default function App() {
    const location = useLocation();

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-background">
                <NavigationMenu className="h-14 px-6">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                    data-active={location.pathname === navigation.home}
                                    to={navigation.home}
                                >
                                    Home
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                    data-active={location.pathname === navigation.search}
                                    to={navigation.search}
                                >
                                    Search
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                    data-active={location.pathname === navigation.subscriptions}
                                    to={navigation.subscriptions}
                                >
                                    Subscriptions
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
            <Outlet />
        </>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
