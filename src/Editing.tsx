import * as React from "react";
import { RivetGrid, formatCellValue, type Column } from "@rivetgrid/rivetgrid";

type ProductRow = {
  id: string;
  product: string;
  owner: string;
  status: "Active" | "Review" | "Paused";
  priority: "High" | "Medium" | "Low";
  region: string;
  progress: number;
  price: number;
  due: string;
  available: boolean;
};

const rows: ProductRow[] = [
  {
    id: "atlas",
    product: "Atlas Grid",
    owner: "Maya",
    status: "Active",
    priority: "High",
    region: "North",
    progress: 72,
    price: 42000,
    due: "2026-07-08",
    available: true,
  },
  {
    id: "pulse",
    product: "Pulse CRM",
    owner: "Iris",
    status: "Review",
    priority: "Medium",
    region: "West",
    progress: 46,
    price: 26000,
    due: "2026-07-14",
    available: true,
  },
  {
    id: "forge",
    product: "Forge Ops",
    owner: "Nolan",
    status: "Paused",
    priority: "Low",
    region: "EMEA",
    progress: 28,
    price: 18500,
    due: "2026-08-02",
    available: false,
  },
  {
    id: "nova",
    product: "Nova Desk",
    owner: "Lena",
    status: "Active",
    priority: "Medium",
    region: "South",
    progress: 64,
    price: 31400,
    due: "2026-07-22",
    available: true,
  },
  {
    id: "signal",
    product: "Signal Ops",
    owner: "Omar",
    status: "Review",
    priority: "High",
    region: "East",
    progress: 39,
    price: 22800,
    due: "2026-08-11",
    available: false,
  },
  {
    id: "vector",
    product: "Vector CRM",
    owner: "Priya",
    status: "Active",
    priority: "High",
    region: "West",
    progress: 88,
    price: 52800,
    due: "2026-07-03",
    available: true,
  },
  {
    id: "orbit",
    product: "Orbit BI",
    owner: "Theo",
    status: "Paused",
    priority: "Low",
    region: "North",
    progress: 18,
    price: 12600,
    due: "2026-08-19",
    available: false,
  },
  {
    id: "ledger",
    product: "Ledger Flow",
    owner: "June",
    status: "Review",
    priority: "Medium",
    region: "EMEA",
    progress: 52,
    price: 33700,
    due: "2026-07-30",
    available: true,
  },
];

const statusVariants = {
  Active: "success",
  Review: "warning",
  Paused: "neutral",
} as const;

const allColumns: Column<ProductRow>[] = [
  {
    id: "product",
    header: "Product",
    accessor: (row) => row.product,
    width: 168,
  },
  { id: "owner", header: "Owner", accessor: (row) => row.owner, width: 120 },
  {
    id: "status",
    header: "Status",
    accessor: (row) => row.status,
    cellFormat: "enum",
    enumOptions: ["Active", "Review", "Paused"],
    richCell: { preset: "statusBadge", statusVariantByValue: statusVariants },
    width: 116,
  },
  {
    id: "priority",
    header: "Priority",
    accessor: (row) => row.priority,
    width: 112,
  },
  { id: "region", header: "Region", accessor: (row) => row.region, width: 112 },
  {
    id: "progress",
    header: "Progress",
    accessor: (row) => row.progress,
    cellFormat: "percentage",
    richCell: {
      preset: "progressBar",
      progressMax: 100,
      progressShowValue: true,
    },
    width: 132,
  },
  {
    id: "price",
    header: "Budget",
    accessor: (row) => row.price,
    cellFormat: "currency",
    isNumeric: true,
    aggregations: ["sum", "avg"],
    width: 124,
  },
  {
    id: "due",
    header: "Due",
    accessor: (row) => formatCellValue(row.due, { format: "date" }),
    cellFormat: "date",
    width: 122,
  },
];

function pickColumns(...ids: string[]) {
  return ids.map((id) => allColumns.find((column) => column.id === id)!);
}

export function SpreadsheetEditingExample() {
  const [editableRows, setEditableRows] = React.useState(rows);
  const onCommitCell = (rowId: string, columnId: string, value: unknown) => {
    setEditableRows((current) =>
      current.map((row) =>
        row.id === rowId ? { ...row, [columnId]: value } : row,
      ),
    );
  };

  return (
    <RivetGrid
      ariaLabel="Documentation editing"
      columns={pickColumns("product", "owner", "status", "progress", "price")}
      rows={editableRows}
      getRowId={(row) => row.id}
      keyboardNav="cells"
      editingEnabled
      spreadsheetDefaults={{
        enabled: true,
        rangeSelection: { enabled: true },
        fillHandle: { enabled: true },
        validateCell: (_rowId, columnId, value) =>
          columnId === "progress" && (Number(value) < 0 || Number(value) > 100)
            ? { valid: false, error: "Progress must stay between 0 and 100." }
            : { valid: true },
        onCommitCell,
      }}
      richCells={{ enabled: true }}
      enableColumnSettings
      enableSearch={false}
    />
  );
}
