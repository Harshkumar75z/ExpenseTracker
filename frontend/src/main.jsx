import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PersistGate } from "redux-persist/lib/integration/react.js";
import { persistStore } from "redux-persist";
import axios from "axios";
axios.defaults.withCredentials = true;
const Persitor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persitor}>
      <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
