import * as React from "react";
import { RivetGrid, type Column } from "@rivetgrid/grid";

type IntegrationCredential = {
  id: string;
  integration: string;
  environment: string;
  apiKey: string;
};

const rows: IntegrationCredential[] = [
  {
    id: "github",
    integration: "GitHub",
    environment: "Production",
    apiKey: "rg_demo_github_7K2m",
  },
  {
    id: "sentry",
    integration: "Sentry",
    environment: "Production",
    apiKey: "rg_demo_sentry_4Xq9",
  },
];

const columns: Column<IntegrationCredential>[] = [
  {
    id: "integration",
    header: "Integration",
    accessor: (row) => row.integration,
  },
  {
    id: "environment",
    header: "Environment",
    accessor: (row) => row.environment,
  },
  {
    id: "apiKey",
    header: "API key",
    accessor: (row) => row.apiKey,
    cellFormat: "password",
  },
];

export function IntegrationCredentials() {
  const [editableRows, setEditableRows] = React.useState(rows);
  const editingDefaults = React.useMemo(
    () => ({
      enabled: true,
      onCommitCell: (rowId: string, columnId: string, value: unknown) => {
        const nextValue = String(value ?? "");
        setEditableRows((current) =>
          current.map((row) => {
            if (row.id !== rowId) return row;
            if (columnId === "integration")
              return { ...row, integration: nextValue };
            if (columnId === "environment")
              return { ...row, environment: nextValue };
            if (columnId === "apiKey") return { ...row, apiKey: nextValue };
            return row;
          }),
        );
      },
    }),
    [],
  );

  return (
    <RivetGrid
      ariaLabel="Integration credentials"
      columns={columns}
      rows={editableRows}
      getRowId={(row) => row.id}
      keyboardNav="cells"
      editingEnabled
      editingDefaults={editingDefaults}
    />
  );
}
