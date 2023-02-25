import "./App.css";
import MiniDrawer from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationForm from "./components/application-form/ApplicationForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MiniDrawer />,
        children: [
            {
                path: "/",
                element: <div>sds</div>,
            },
            {
                path: "/application-form",
                element: <ApplicationForm />,
            },
            {
                path: "/xx",
                element: <div>sds</div>,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
