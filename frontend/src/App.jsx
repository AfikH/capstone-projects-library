import { RouterProvider } from "react-router-dom";

import Router from "./components/Router";

import './assets/css/main.css';

const App = () => (
    <RouterProvider router={Router} />
);

export default App;