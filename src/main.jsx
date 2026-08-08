import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={persistor}
        >
            <BrowserRouter>
                <Routes>
                    <Route
                        path="*"
                        element={<App />}
                    />
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
