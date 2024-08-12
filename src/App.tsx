import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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

                    <Route
                        path="*"
                        element={<Navigate to={PAGES.FIBONACCI.path} />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
