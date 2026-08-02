import React from "react";
import ReactDOM from "react-dom/client";
import { RivetGridLicense } from "@rivetgrid/rivetgrid/license";
import App from "./App.tsx";
import "./index.css";
import "@rivetgrid/rivetgrid/styles.css";

RivetGridLicense.setLicenseKey(
  import.meta.env.VITE_RIVETGRID_LICENSE_KEY ?? "",
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
