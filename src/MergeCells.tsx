/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  type Column,
  type FilteringState,
  type SortingState,
  type ColumnGroupingConfig,
} from "@rivetgrid/grid";
import { RivetGridPro } from "@rivetgrid/pro";
import "@rivetgrid/grid/styles.css";
import "@rivetgrid/pro/styles.css";

type AccountRow = {
  id: string;
  account: string;
  contact: string;
  stage: "Discovery" | "Pilot" | "Procurement" | "Won";
  dealSize: number;
  closeDate: string;
  health: number;
  region: string;
  probability: number;
  nextStep: string;
  lastTouch: string;
};

const stageVariants = {
  Discovery: "info",
  Pilot: "warning",
  Procurement: "neutral",
  Won: "success",
} as const;
const allColumns: Column<AccountRow>[] = [
  {
    id: "account",
    header: "Account",
    accessor: (row) => row.account,
    width: 196,
    minWidth: 170,
    type: "text",
    sortable: true,
  },
  {
    id: "contactAvatar",
    header: "Contact",
    accessor: (row) => row.contact,
    sortable: true,
  },
  {
    id: "contact",
    header: "Contact",
    accessor: (row) => row.contact,
    width: 150,
    type: "text",
    sortable: true,
  },
  {
    id: "stage",
    header: "Stage",
    accessor: (row) => row.stage,
    width: 134,
    richCell: { preset: "statusBadge", statusVariantByValue: stageVariants },
    sortable: true,
  },
  {
    id: "dealSize",
    header: "Deal Size",
    accessor: (row) => row.dealSize,
    type: "currency",
    cellFormat: "currency",
    align: "right",
    isNumeric: true,
    width: 122,
    sortable: true,
  },
  {
    id: "closeDate",
    header: "Close",
    accessor: (row) => row.closeDate,
    type: "date",
    cellFormat: "date",
    width: 116,
    sortable: true,
  },
  {
    id: "health",
    header: "Health",
    accessor: (row) => row.health,
    type: "percentage",
    cellFormat: "percentage",
    richCell: {
      preset: "progressBar",
      progressMax: 100,
      progressStatusAccessor: (row) => row.stage,
      statusVariantByValue: stageVariants,
    },
    width: 138,
    sortable: true,
  },
  {
    id: "region",
    header: "Region",
    accessor: (row) => row.region,
    width: 120,
    type: "text",
    sortable: true,
  },
  {
    id: "probability",
    header: "Probability",
    accessor: (row) => row.probability,
    type: "percentage",
    cellFormat: "percentage",
    align: "right",
    isNumeric: true,
    width: 124,
    sortable: true,
  },
  {
    id: "nextStep",
    header: "Next Step",
    accessor: (row) => row.nextStep,
    width: 178,
    type: "text",
    sortable: true,
  },
  {
    id: "lastTouch",
    header: "Last Touch",
    accessor: (row) => row.lastTouch,
    type: "date",
    cellFormat: "date",
    width: 124,
    minWidth: 124,
    sortable: true,
  },
];

const baseRows: AccountRow[] = [
  {
    id: "crm-001",
    account: "Northstar Health",
    contact: "Ari Bell",
    stage: "Pilot",
    dealSize: 124000,
    closeDate: "2026-07-12",
    health: 78,
    region: "West",
    probability: 62,
    nextStep: "Security review",
    lastTouch: "2026-06-10",
  },
  {
    id: "crm-002",
    account: "Cobalt Logistics",
    contact: "Ren Ito",
    stage: "Discovery",
    dealSize: 68000,
    closeDate: "2026-07-24",
    health: 55,
    region: "Central",
    probability: 34,
    nextStep: "Workflow mapping",
    lastTouch: "2026-06-09",
  },
  {
    id: "crm-003",
    account: "Atlas Retail",
    contact: "June Park",
    stage: "Procurement",
    dealSize: 211000,
    closeDate: "2026-08-01",
    health: 83,
    region: "East",
    probability: 74,
    nextStep: "Legal redlines",
    lastTouch: "2026-06-12",
  },
  {
    id: "crm-004",
    account: "Beacon Labs",
    contact: "Theo West",
    stage: "Won",
    dealSize: 94000,
    closeDate: "2026-06-30",
    health: 96,
    region: "West",
    probability: 100,
    nextStep: "Kickoff",
    lastTouch: "2026-06-11",
  },
  {
    id: "crm-005",
    account: "Harbor Foods",
    contact: "Mina Fox",
    stage: "Pilot",
    dealSize: 154000,
    closeDate: "2026-07-18",
    health: 69,
    region: "South",
    probability: 58,
    nextStep: "Sandbox import",
    lastTouch: "2026-06-07",
  },
  {
    id: "crm-006",
    account: "Summit Energy",
    contact: "Owen Lee",
    stage: "Discovery",
    dealSize: 81000,
    closeDate: "2026-08-09",
    health: 48,
    region: "Central",
    probability: 29,
    nextStep: "Architecture call",
    lastTouch: "2026-06-06",
  },
  {
    id: "crm-007",
    account: "Vector Bank",
    contact: "Nia Cruz",
    stage: "Procurement",
    dealSize: 287000,
    closeDate: "2026-07-29",
    health: 74,
    region: "East",
    probability: 81,
    nextStep: "Vendor review",
    lastTouch: "2026-06-12",
  },
  {
    id: "crm-008",
    account: "Cedar Schools",
    contact: "Lio Chen",
    stage: "Pilot",
    dealSize: 112000,
    closeDate: "2026-08-14",
    health: 66,
    region: "North",
    probability: 52,
    nextStep: "Admin training",
    lastTouch: "2026-06-08",
  },
  {
    id: "crm-009",
    account: "Monarch Studios",
    contact: "Greta Lane",
    stage: "Pilot",
    dealSize: 132500,
    closeDate: "2026-07-21",
    health: 81,
    region: "West",
    probability: 66,
    nextStep: "Security review",
    lastTouch: "2026-06-12",
  },
  {
    id: "crm-010",
    account: "Pioneer Transit",
    contact: "Malik Ross",
    stage: "Discovery",
    dealSize: 76500,
    closeDate: "2026-08-02",
    health: 58,
    region: "Central",
    probability: 38,
    nextStep: "Workflow mapping",
    lastTouch: "2026-06-11",
  },
  {
    id: "crm-011",
    account: "Luma Insurance",
    contact: "Eve Stone",
    stage: "Procurement",
    dealSize: 219500,
    closeDate: "2026-08-10",
    health: 86,
    region: "East",
    probability: 78,
    nextStep: "Legal redlines",
    lastTouch: "2026-06-14",
  },
  {
    id: "crm-012",
    account: "Evergreen Clinics",
    contact: "Rafa Silva",
    stage: "Won",
    dealSize: 102500,
    closeDate: "2026-07-09",
    health: 99,
    region: "West",
    probability: 100,
    nextStep: "Kickoff",
    lastTouch: "2026-06-13",
  },
  {
    id: "crm-013",
    account: "Copperline Media",
    contact: "Clara Ames",
    stage: "Pilot",
    dealSize: 162500,
    closeDate: "2026-07-27",
    health: 72,
    region: "South",
    probability: 62,
    nextStep: "Sandbox import",
    lastTouch: "2026-06-09",
  },
  {
    id: "crm-014",
    account: "Granite Works",
    contact: "Ben Harper",
    stage: "Discovery",
    dealSize: 89500,
    closeDate: "2026-08-18",
    health: 51,
    region: "Central",
    probability: 33,
    nextStep: "Architecture call",
    lastTouch: "2026-06-08",
  },
  {
    id: "crm-015",
    account: "Brightpath Tutors",
    contact: "Zoe Quinn",
    stage: "Procurement",
    dealSize: 295500,
    closeDate: "2026-08-07",
    health: 77,
    region: "East",
    probability: 85,
    nextStep: "Vendor review",
    lastTouch: "2026-06-14",
  },
  {
    id: "crm-016",
    account: "Aster Robotics",
    contact: "Milo Chen",
    stage: "Pilot",
    dealSize: 120500,
    closeDate: "2026-08-23",
    health: 69,
    region: "North",
    probability: 56,
    nextStep: "Admin training",
    lastTouch: "2026-06-10",
  },
  {
    id: "crm-017",
    account: "Lakeview Grocers",
    contact: "Tess Gray",
    stage: "Pilot",
    dealSize: 141000,
    closeDate: "2026-07-30",
    health: 84,
    region: "West",
    probability: 70,
    nextStep: "Security review",
    lastTouch: "2026-06-14",
  },
  {
    id: "crm-018",
    account: "Nimbus Travel",
    contact: "Nora Blake",
    stage: "Discovery",
    dealSize: 85000,
    closeDate: "2026-08-11",
    health: 61,
    region: "Central",
    probability: 42,
    nextStep: "Workflow mapping",
    lastTouch: "2026-06-13",
  },
  {
    id: "crm-019",
    account: "Bridgewell Legal",
    contact: "Hugo Price",
    stage: "Procurement",
    dealSize: 228000,
    closeDate: "2026-08-19",
    health: 89,
    region: "East",
    probability: 82,
    nextStep: "Legal redlines",
    lastTouch: "2026-06-16",
  },
  {
    id: "crm-020",
    account: "Keystone Apparel",
    contact: "Ivy Cole",
    stage: "Won",
    dealSize: 111000,
    closeDate: "2026-07-18",
    health: 99,
    region: "West",
    probability: 100,
    nextStep: "Kickoff",
    lastTouch: "2026-06-15",
  },
  {
    id: "crm-021",
    account: "Orbit Analytics",
    contact: "Ezra Moon",
    stage: "Pilot",
    dealSize: 171000,
    closeDate: "2026-08-05",
    health: 75,
    region: "South",
    probability: 66,
    nextStep: "Sandbox import",
    lastTouch: "2026-06-11",
  },
  {
    id: "crm-022",
    account: "Horizon Dental",
    contact: "Dina Wells",
    stage: "Discovery",
    dealSize: 98000,
    closeDate: "2026-08-27",
    health: 54,
    region: "Central",
    probability: 37,
    nextStep: "Architecture call",
    lastTouch: "2026-06-10",
  },
  {
    id: "crm-023",
    account: "Foundry Capital",
    contact: "Cole Rivera",
    stage: "Procurement",
    dealSize: 304000,
    closeDate: "2026-08-16",
    health: 80,
    region: "East",
    probability: 89,
    nextStep: "Vendor review",
    lastTouch: "2026-06-16",
  },
  {
    id: "crm-024",
    account: "Redwood Telecom",
    contact: "Ana Pierce",
    stage: "Pilot",
    dealSize: 129000,
    closeDate: "2026-09-01",
    health: 72,
    region: "North",
    probability: 60,
    nextStep: "Admin training",
    lastTouch: "2026-06-12",
  },
];

function makeRows(count: number): AccountRow[] {
  const flatRows = Array.from({ length: count }, (_, index) => ({
    ...baseRows[index % baseRows.length],
    id: "row-" + (index + 1),
  }));
  return flatRows;
}

function getFilterType(
  column: Column<AccountRow>,
): Column<AccountRow>["filterType"] {
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

const STRUCTURAL_COLUMN_TYPES = [
  { id: "text", label: "Text" },
  { id: "number", label: "Number" },
  { id: "currency", label: "Currency" },
  { id: "percentage", label: "Percentage" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "boolean", label: "Checkbox" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "datetime", label: "Date & Time" },
];

function getColumnTypePatch(typeId: string): Partial<Column<AccountRow>> {
  if (typeId === "currency")
    return {
      type: "currency",
      filterType: "currency",
      cellFormat: "currency",
      isNumeric: true,
      align: "right",
      minWidth: 120,
    };
  if (typeId === "percentage")
    return {
      type: "percentage",
      filterType: "percentage",
      cellFormat: "percentage",
      isNumeric: true,
      align: "right",
      minWidth: 120,
    };
  if (typeId === "number")
    return {
      type: "number",
      filterType: "number",
      isNumeric: true,
      align: "right",
      minWidth: 100,
    };
  if (typeId === "email")
    return { type: "email", filterType: "email", align: "left", minWidth: 180 };
  if (typeId === "phone")
    return { type: "phone", filterType: "phone", align: "left", minWidth: 140 };
  if (typeId === "boolean")
    return {
      type: "boolean",
      filterType: "boolean",
      cellFormat: "boolean",
      align: "center",
      minWidth: 100,
    };
  if (typeId === "date")
    return {
      type: "date",
      filterType: "date",
      cellFormat: "date",
      align: "left",
      minWidth: 120,
    };
  if (typeId === "time")
    return {
      filterType: "time",
      cellFormat: "time",
      align: "left",
      minWidth: 120,
    };
  if (typeId === "datetime")
    return {
      filterType: "datetime",
      cellFormat: "datetime",
      align: "left",
      minWidth: 160,
    };
  return { type: "text", filterType: "text", align: "left", minWidth: 120 };
}

function mapRows(
  rows: AccountRow[],
  update: (row: AccountRow) => AccountRow,
): AccountRow[] {
  return rows.map((row) => {
    const next = update(row);
    const children = (next as AccountRow & { children?: AccountRow[] })
      .children;
    return children?.length
      ? ({ ...next, children: mapRows(children, update) } as AccountRow)
      : next;
  });
}

function insertRow(
  rows: AccountRow[],
  rowId: string,
  position: "above" | "below",
  nextRow: AccountRow,
): { rows: AccountRow[]; inserted: boolean } {
  const anchorIndex = rows.findIndex((row) => row.id === rowId);
  if (anchorIndex >= 0) {
    const insertIndex = position === "above" ? anchorIndex : anchorIndex + 1;
    return {
      rows: [
        ...rows.slice(0, insertIndex),
        nextRow,
        ...rows.slice(insertIndex),
      ],
      inserted: true,
    };
  }
  for (let index = 0; index < rows.length; index += 1) {
    const children = (rows[index] as AccountRow & { children?: AccountRow[] })
      .children;
    if (!children?.length) continue;
    const nested = insertRow(children, rowId, position, nextRow);
    if (!nested.inserted) continue;
    const nextRows = [...rows];
    nextRows[index] = { ...rows[index], children: nested.rows } as AccountRow;
    return { rows: nextRows, inserted: true };
  }
  return { rows, inserted: false };
}

function deleteRow(rows: AccountRow[], rowId: string): AccountRow[] {
  return rows
    .filter((row) => row.id !== rowId)
    .map((row) => {
      const children = (row as AccountRow & { children?: AccountRow[] })
        .children;
      return children?.length
        ? ({ ...row, children: deleteRow(children, rowId) } as AccountRow)
        : row;
    });
}

function countRows(rows: AccountRow[]): number {
  return rows.reduce((count, row) => {
    const children =
      (row as AccountRow & { children?: AccountRow[] }).children ?? [];
    return count + 1 + countRows(children);
  }, 0);
}

const columnGrouping: ColumnGroupingConfig = {
  groups: [
    {
      id: "primary-details",
      label: "Primary",
      columnIds: ["account", "contactAvatar", "contact", "stage"],
    },
    {
      id: "supporting-details",
      label: "Details",
      columnIds: ["dealSize", "closeDate", "health"],
    },
  ],
};

const initialColumns: Column<AccountRow>[] = allColumns
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

export function CRMTable() {
  const [columns, setColumns] = React.useState(() => initialColumns);
  const [rows, setRows] = React.useState(() => makeRows(100));
  const insertedColumnId = React.useRef(1);
  const insertedRowId = React.useRef(1);

  const updateRow = React.useCallback(
    (
      current: AccountRow[],
      rowId: string,
      columnId: string,
      value: unknown,
    ): AccountRow[] => {
      return current.map((row) => {
        if (row.id === rowId) {
          return { ...row, [columnId]: value } as AccountRow;
        }
        const children = (row as AccountRow & { children?: AccountRow[] })
          .children;
        return children?.length
          ? ({
              ...row,
              children: updateRow(children, rowId, columnId, value),
            } as AccountRow)
          : row;
      });
    },
    [],
  );
  const handleCommitCell = React.useCallback(
    (rowId: string, columnId: string, value: unknown) => {
      setRows((current) => {
        return updateRow(current, rowId, columnId, value);
      });
    },
    [updateRow],
  );
  const [mergedCells, setMergedCells] = React.useState([
    {
      id: "starter-merge",
      rowId: "row-1",
      colId: "account",
      rowIds: ["row-1", "row-2"],
      columnIds: ["account", "contactAvatar"],
    },
  ]);
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
      ariaLabel="CRM table"
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      height={480}
      virtualization={{ enabled: true, overscan: 5 }}
      stickyHeader
      columnGrouping={columnGrouping}
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
      spreadsheet={{
        rangeSelection: { enabled: true },
      }}
      enableRowNumbers
      keyboardNav="cells"
      editingEnabled
      editingDefaults={{
        enabled: true,
        mergeCells: {
          enabled: true,
          mergedCells,
          onMergedCellsChange: setMergedCells,
        },
        structuralEditing: {
          enabled: true,
          columnTypes: STRUCTURAL_COLUMN_TYPES,
          onInsertColumn: ({ columnId, position, typeId }) => {
            const sequence = insertedColumnId.current;
            insertedColumnId.current += 1;
            const nextColumnId = "custom_" + typeId + "_" + sequence;
            const typePatch = getColumnTypePatch(typeId);
            const nextColumn: Column<AccountRow> = {
              id: nextColumnId,
              header:
                (STRUCTURAL_COLUMN_TYPES.find((option) => option.id === typeId)
                  ?.label ?? "Text") +
                " " +
                sequence,
              accessor: (row) =>
                ((row as unknown as Record<string, unknown>)[nextColumnId] ??
                  null) as React.ReactNode,
              width: typePatch.minWidth ?? 160,
              ...typePatch,
            };
            setColumns((current) => {
              const anchorIndex = current.findIndex(
                (column) => column.id === columnId,
              );
              const insertIndex =
                anchorIndex < 0
                  ? current.length
                  : position === "left"
                    ? anchorIndex
                    : anchorIndex + 1;
              return [
                ...current.slice(0, insertIndex),
                nextColumn,
                ...current.slice(insertIndex),
              ];
            });
            setRows((current) =>
              mapRows(
                current,
                (row) => ({ ...row, [nextColumnId]: null }) as AccountRow,
              ),
            );
          },
          onInsertRow: ({ rowId, position }) => {
            const nextRow = Object.fromEntries([
              ["id", "inserted-" + insertedRowId.current],
              ...columns.map((column) => [column.id, null]),
            ]) as unknown as AccountRow;
            insertedRowId.current += 1;
            setRows((current) => {
              const result = insertRow(current, rowId, position, nextRow);
              return result.inserted ? result.rows : [...current, nextRow];
            });
          },
          onRenameColumn: ({ columnId, header }) => {
            setColumns((current) =>
              current.map((column) =>
                column.id === columnId ? { ...column, header } : column,
              ),
            );
          },
          onConvertColumnType: ({ columnId, typeId }) => {
            setColumns((current) =>
              current.map((column) => {
                if (column.id !== columnId) return column;
                const {
                  cellFormat: _cellFormat,
                  cellType: _cellType,
                  enumOptions: _enumOptions,
                  filterType: _filterType,
                  isNumeric: _isNumeric,
                  priceAction: _priceAction,
                  richCell: _richCell,
                  type: _type,
                  align: _align,
                  ...base
                } = column;
                return {
                  ...base,
                  ...getColumnTypePatch(typeId),
                  accessor: (row) =>
                    ((row as unknown as Record<string, unknown>)[columnId] ??
                      null) as React.ReactNode,
                };
              }),
            );
          },
          onDeleteColumn: ({ columnId }) => {
            if (columns.length <= 1) return;
            setColumns((current) =>
              current.filter((column) => column.id !== columnId),
            );
            setRows((current) =>
              mapRows(current, (row) => {
                const next = { ...row } as AccountRow & Record<string, unknown>;
                delete next[columnId];
                return next;
              }),
            );
          },
          onDeleteRow: ({ rowId }) => {
            if (countRows(rows) <= 1) return;
            setRows((current) => deleteRow(current, rowId));
          },
        },
        onCommitCell: handleCommitCell,
      }}
    />
  );
}
