import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RivetGridLicense } from "@rivetgrid/pro/license";

const result = RivetGridLicense.setLicenseKey(
  import.meta.env.VITE_RIVETGRID_LICENSE_KEY ?? "",
);

if (result.state !== "ready-for-server-validation") {
  console.warn(result.message);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
