import "./bootstrap";
import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
const appName = import.meta.env.VITE_APP_NAME || "Công Ty TNHH Dịch Vụ Kỹ Thuật Thợ Việt";

createInertiaApp({
    title: (title) => `${title} - Công Ty TNHH Dịch Vụ Kỹ Thuật Thợ Việt`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props, index }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient} >
                <App {...props} key={index} />
                <ToastContainer />
            </QueryClientProvider>

        );
    },
    progress: {
        color: "#4B5563",
    },
});
