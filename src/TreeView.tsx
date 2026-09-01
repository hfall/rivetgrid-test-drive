import * as React from "react";
import {
  type Column,
  type FilteringState,
  type SortingState,
} from "@rivetgrid/grid";
import { RivetGridPro } from "@rivetgrid/pro";

type StarterRow = {
  id: string;
  category: string;
  brand: string;
  price: number;
  change: number | null;
  changePercent: number | null;
  stock: number;
  rating: number;
  supplier: string;
  status: "Active" | "Review" | "Paused";
  progress: number;
};

const allColumns: Column<StarterRow>[] = [
  {
    id: "category",
    header: "Category",
    accessor: (row) => row.category,
    type: "text",
    width: 200,
    sortable: true,
  },
  {
    id: "brand",
    header: "Brand",
    accessor: (row) => row.brand,
    type: "text",
    width: 200,
    sortable: true,
  },
  {
    id: "price",
    header: "Price",
    accessor: (row) => row.price,
    type: "currency",
    cellFormat: "currency",
    align: "right",
    isNumeric: true,
    width: 150,
    sortable: true,
  },
  {
    id: "change",
    header: "Change",
    accessor: (row) => row.change,
    type: "number",
    align: "right",
    isNumeric: true,
    width: 150,
    sortable: true,
    priceAction: {},
  },
  {
    id: "changePercent",
    header: "Change %",
    accessor: (row) => row.changePercent,
    type: "percentage",
    cellFormat: "percentage",
    align: "right",
    isNumeric: true,
    width: 150,
    sortable: true,
    priceAction: { displayFormat: "percent" },
  },
  {
    id: "stock",
    header: "Stock",
    accessor: (row) => row.stock,
    type: "number",
    align: "right",
    isNumeric: true,
    width: 92,
    sortable: true,
  },
  {
    id: "rating",
    header: "Rating",
    accessor: (row) => row.rating,
    type: "number",
    cellFormat: "rating",
    align: "right",
    isNumeric: true,
    width: 104,
    sortable: true,
  },
  {
    id: "supplier",
    header: "Supplier",
    accessor: (row) => row.supplier,
    type: "text",
    width: 142,
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    accessor: (row) => row.status,
    type: "enum",
    cellFormat: "enum",
    enumOptions: ["Active", "Review", "Paused"],
    width: 118,
    sortable: true,
  },
  {
    id: "progress",
    header: "Progress",
    accessor: (row) => row.progress,
    type: "percentage",
    cellFormat: "percentage",
    align: "right",
    isNumeric: true,
    width: 118,
    sortable: true,
  },
];

const baseRows: StarterRow[] = [
  {
    id: "custom-1",
    category: "Furniture",
    brand: "TechLink",
    price: 402.98,
    change: 8.42,
    changePercent: 5.6,
    stock: 84,
    rating: 4.8,
    supplier: "Northstar",
    status: "Active",
    progress: 82,
  },
  {
    id: "custom-2",
    category: "Accessories",
    brand: "ComfortPlus",
    price: 329.31,
    change: -3.11,
    changePercent: -1.72,
    stock: 132,
    rating: 4.4,
    supplier: "Atlas",
    status: "Review",
    progress: 68,
  },
  {
    id: "custom-3",
    category: "Audio",
    brand: "ViewMaster",
    price: 438.54,
    change: 0,
    changePercent: 0,
    stock: 46,
    rating: 4.6,
    supplier: "Summit",
    status: "Active",
    progress: 91,
  },
  {
    id: "custom-4",
    category: "Office",
    brand: "KeyStroke",
    price: 488.64,
    change: null,
    changePercent: null,
    stock: 24,
    rating: 4.2,
    supplier: "Northstar",
    status: "Paused",
    progress: 54,
  },
  {
    id: "custom-5",
    category: "Home",
    brand: "DataVault",
    price: 268.4,
    change: -2.5,
    changePercent: -0.85,
    stock: 118,
    rating: 4.7,
    supplier: "Atlas",
    status: "Active",
    progress: 76,
  },
  {
    id: "custom-6",
    category: "Sports",
    brand: "HomePro",
    price: 352.54,
    change: null,
    changePercent: null,
    stock: 69,
    rating: 4.1,
    supplier: "Summit",
    status: "Review",
    progress: 63,
  },
  {
    id: "custom-7",
    category: "Clothing",
    brand: "FitLife",
    price: 66.08,
    change: 0.93,
    changePercent: -0.57,
    stock: 205,
    rating: 4.5,
    supplier: "Northstar",
    status: "Active",
    progress: 88,
  },
  {
    id: "custom-8",
    category: "Electronics",
    brand: "SoundMax",
    price: 137.5,
    change: 4.42,
    changePercent: -2.66,
    stock: 97,
    rating: 4.3,
    supplier: "Atlas",
    status: "Paused",
    progress: 47,
  },
];

function makeRows(count: number): StarterRow[] {
  const flatRows = Array.from({ length: count }, (_, index) => ({
    ...baseRows[index % baseRows.length],
    id: "row-" + (index + 1),
  }));
  return Array.from(
    { length: Math.ceil(flatRows.length / 4) },
    (_, groupIndex) => {
      const start = groupIndex * 4;
      const parent = flatRows[start];
      const children = flatRows.slice(start + 1, start + 4);
      return children.length > 0
        ? ({ ...parent, children } as StarterRow)
        : parent;
    },
  );
}

function getFilterType(
  column: Column<StarterRow>,
): Column<StarterRow>["filterType"] {
  if (
    column.cellType === "avatar" ||
    column.type === "image" ||
    column.cellFormat === "image"
  )
    return undefined;
  if (column.type === "enum") return "enum";
  if (column.type === "date") return "date";
  if (column.type === "currency" || column.cellFormat === "currency")
    return "currency";
  if (column.type === "percentage" || column.cellFormat === "percentage")
    return "percentage";
  if (column.type === "number" || column.isNumeric) return "number";
  return "text";
}

const initialColumns: Column<StarterRow>[] = allColumns
  .slice(0, 7)
  .map((column) => ({
    ...column,
    pin: undefined,
    resizable: column.resizable ?? true,
    sortable: column.sortable ?? true,
    searchable:
      column.cellType === "avatar" || column.type === "image"
        ? false
        : (column.searchable ?? true),
    filterType: getFilterType(column),
  }));

export function TreeView() {
  const columns = initialColumns;
  const rows = React.useMemo(() => makeRows(100), []);
  const [density, setDensity] = React.useState<
    "compact" | "medium" | "relaxed" | "spacious"
  >("medium");
  const [filteringState, setFilteringState] = React.useState<FilteringState>({
    columnFilters: [],
    globalFilter: "",
  });
  const [sortingState, setSortingState] = React.useState<SortingState>([]);

  return (
    <RivetGridPro
      ariaLabel="Custom table"
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      height={480}
      virtualization={{ enabled: true, overscan: 5 }}
      density={density}
      onDensityChange={setDensity}
      rowStyle="outline"
      theme="light"
      rivetGridWidthMode="fill"
      resizeMode="live"
      filteringState={filteringState}
      onFilteringChange={(event) => {
        setFilteringState(event.next);
      }}
      sortingState={sortingState}
      onSortingChange={(event) => {
        setSortingState(event.next);
      }}
      enableDownloadMenu
      enableDensityToggle
      enableColumnSettings
      enableSearch
      enablePagination
      defaultPageSize={25}
      enableGrouping={false}
      richCells={{ enabled: true }}
      tree={{
        enabled: true,
        getChildren: (row) =>
          (row as StarterRow & { children?: StarterRow[] }).children,
      }}
      enableRowNumbers
    />
  );
}
