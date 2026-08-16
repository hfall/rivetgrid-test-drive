import * as React from "react";
import { RivetGrid, type Column } from "@rivetgrid/rivetgrid";

type RichRow = {
  id: string;
  ticker: { symbol: string; name: string; exchange: string };
  status: "Active" | "Review" | "Paused";
  rating: number;
  tags: string[];
  link: { url: string; label: string };
  trend: number[];
  progress: number;
  quantity: number;
};

const rows: RichRow[] = [
  {
    id: "atlas-rich",
    ticker: {
      symbol: "ATLS",
      name: "Atlas Grid",
      exchange: "NYSE",
    },
    status: "Active",
    rating: 4,
    tags: ["Enterprise", "Pilot"],
    link: {
      url: "https://rivetgrid.dev/docs",
      label: "Docs",
    },
    trend: [42, 44, 43, 47, 50, 52, 55, 58],
    progress: 72,
    quantity: 73,
  },
  {
    id: "pulse-rich",
    ticker: {
      symbol: "PLSE",
      name: "Pulse CRM",
      exchange: "NASDAQ",
    },
    status: "Review",
    rating: 3,
    tags: ["Renewal", "Risk"],
    link: {
      url: "https://rivetgrid.dev/roadmap",
      label: "Roadmap",
    },
    trend: [31, 33, 32, 34, 36, 35, 38, 37],
    progress: 46,
    quantity: 29,
  },
  {
    id: "forge-rich",
    ticker: {
      symbol: "FRGE",
      name: "Forge Ops",
      exchange: "NYSE",
    },
    status: "Paused",
    rating: 2,
    tags: ["Ops", "Paused"],
    link: {
      url: "https://rivetgrid.dev/support",
      label: "Support",
    },
    trend: [28, 27, 26, 25, 24, 24, 23, 22],
    progress: 28,
    quantity: 76,
  },
  {
    id: "vector-rich",
    ticker: {
      symbol: "VCTR",
      name: "Vector CRM",
      exchange: "NASDAQ",
    },
    status: "Active",
    rating: 5,
    tags: ["Expansion", "VIP"],
    link: {
      url: "https://rivetgrid.dev/pricing",
      label: "Pricing",
    },
    trend: [54, 56, 58, 60, 62, 65, 67, 70],
    progress: 88,
    quantity: 44,
  },
];
const statusVariants = {
  Active: "success",
  Review: "warning",
  Paused: "neutral",
} as const;

const allColumns: Column<RichRow>[] = [
  {
    id: "ticker",
    header: "Ticker",
    accessor: (row) => row.ticker.symbol,
    cellType: "ticker",
    ticker: {
      nameAccessor: (row) => row.ticker.name,
      exchangeAccessor: (row) => row.ticker.exchange,
    },
  },
  {
    id: "status",
    header: "Status",
    accessor: (row) => row.status,
    cellFormat: "enum",
    enumOptions: ["Active", "Review", "Paused"],
    richCell: { preset: "statusBadge", statusVariantByValue: statusVariants },
  },
  {
    id: "rating",
    header: "Rating",
    accessor: (row) => row.rating,
    cellFormat: "rating",
    richCell: { preset: "ratingStars", ratingMax: 5 },
  },
  {
    id: "tags",
    header: "Tags",
    accessor: (row) => row.tags,
    cellFormat: "tags",
  },
  {
    id: "link",
    header: "Link",
    accessor: (row) => row.link as unknown as React.ReactNode,
    richCell: { preset: "linkText" },
  },
  {
    id: "trend",
    header: "Trend",
    accessor: (row) => row.trend,
    cellType: "sparkline",
    sparkline: { minPoints: 2 },
  },
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
  },
  {
    id: "quantity",
    header: "Quantity",
    accessor: (row) => row.quantity,
    cellFormat: "percentage",
    richCell: { preset: "quantityBar" },
  },
];

const columns = ["ticker", "status", "tags", "rating"].map(
  (id) => allColumns.find((column) => column.id === id)!,
);

export function RichCellIdentityExample() {
  return (
    <RivetGrid
      ariaLabel="Documentation rich cells"
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      richCells={{ enabled: true }}
      stickyHeader
      density="medium"
      rowStyle="outline"
      enableSearch={false}
    />
  );
}
