import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PAGES from "@/constants/pages.ts";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {Object.values(PAGES).map((item, index) => (
                        <Route
                            key={index}
                            path={item.path}
                            element={<item.page />}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
