import "./bootstrap";
import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./Utils/SocketContext";
import { AppProvider } from "./Utils/AppContext";
const queryClient = new QueryClient();
const appName =
    import.meta.env.VITE_APP_NAME || "Công Ty TNHH Dịch Vụ Kỹ Thuật Thợ Việt";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props, index }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    <AppProvider>
                        <App {...props} key={index} />
                    </AppProvider>
                    <ToastContainer />
                </SocketProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
