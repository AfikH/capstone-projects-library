import { RouterProvider } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Router from "./components/Router";

import './assets/css/main.css';

const App = () => (
    <MainLayout>
        <RouterProvider router={Router} />
    </MainLayout>
);

export default App