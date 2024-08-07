import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PAGES from "@/constants/pages.ts";
import Fibonacci from "@/page/fibonacci.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={PAGES.FIBONACCI} element={<Fibonacci />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
