/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { type Column } from "@rivetgrid/grid";
import { RivetGridPro, type SavedView } from "@rivetgrid/pro";

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
  return flatRows;
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

function getColumnTypePatch(typeId: string): Partial<Column<StarterRow>> {
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
  rows: StarterRow[],
  update: (row: StarterRow) => StarterRow,
): StarterRow[] {
  return rows.map((row) => {
    const next = update(row);
    const children = (next as StarterRow & { children?: StarterRow[] })
      .children;
    return children?.length
      ? ({ ...next, children: mapRows(children, update) } as StarterRow)
      : next;
  });
}

function insertRow(
  rows: StarterRow[],
  rowId: string,
  position: "above" | "below",
  nextRow: StarterRow,
): { rows: StarterRow[]; inserted: boolean } {
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
    const children = (rows[index] as StarterRow & { children?: StarterRow[] })
      .children;
    if (!children?.length) continue;
    const nested = insertRow(children, rowId, position, nextRow);
    if (!nested.inserted) continue;
    const nextRows = [...rows];
    nextRows[index] = { ...rows[index], children: nested.rows } as StarterRow;
    return { rows: nextRows, inserted: true };
  }
  return { rows, inserted: false };
}

function deleteRow(rows: StarterRow[], rowId: string): StarterRow[] {
  return rows
    .filter((row) => row.id !== rowId)
    .map((row) => {
      const children = (row as StarterRow & { children?: StarterRow[] })
        .children;
      return children?.length
        ? ({ ...row, children: deleteRow(children, rowId) } as StarterRow)
        : row;
    });
}

function countRows(rows: StarterRow[]): number {
  return rows.reduce((count, row) => {
    const children =
      (row as StarterRow & { children?: StarterRow[] }).children ?? [];
    return count + 1 + countRows(children);
  }, 0);
}

const initialColumns: Column<StarterRow>[] = allColumns
  .slice(0, 7)
  .map((column) => ({
    ...column,
    pin: undefined,
    resizable: column.resizable ?? true,
    sortable: false,
    searchable: false,
    filterType: undefined,
  }));

export function UndoRedo() {
  const [columns, setColumns] = React.useState(() => initialColumns);
  const [rows, setRows] = React.useState(() => makeRows(100));
  const insertedColumnId = React.useRef(1);
  const insertedRowId = React.useRef(1);

  const updateRow = React.useCallback(
    (
      current: StarterRow[],
      rowId: string,
      columnId: string,
      value: unknown,
    ): StarterRow[] => {
      return current.map((row) => {
        if (row.id === rowId) {
          return { ...row, [columnId]: value } as StarterRow;
        }
        const children = (row as StarterRow & { children?: StarterRow[] })
          .children;
        return children?.length
          ? ({
              ...row,
              children: updateRow(children, rowId, columnId, value),
            } as StarterRow)
          : row;
      });
    },
    [],
  );
  const handleCommitCell = React.useCallback(
    (rowId: string, columnId: string, value: unknown) => {
      setRows((current) => {
        const previousRow = current.find((row) => row.id === rowId);
        const previousValue = previousRow
          ? (previousRow as unknown as Record<string, unknown>)[columnId]
          : undefined;
        if (previousRow && !Object.is(previousValue, value)) {
          setHistory((state) => ({
            undo: [...state.undo, { rowId, columnId, previousValue, value }],
            redo: [],
          }));
        }
        return updateRow(current, rowId, columnId, value);
      });
    },
    [updateRow],
  );
  const [comments, setComments] = React.useState([
    { rowId: "row-1", columnId: "category", text: "Needs final review" },
  ]);
  const [history, setHistory] = React.useState<{
    undo: Array<{
      rowId: string;
      columnId: string;
      previousValue: unknown;
      value: unknown;
    }>;
    redo: Array<{
      rowId: string;
      columnId: string;
      previousValue: unknown;
      value: unknown;
    }>;
  }>({ undo: [], redo: [] });
  const handleUndoRequest = React.useCallback(() => {
    const entry = history.undo[history.undo.length - 1];
    if (!entry) return;
    setRows((current) =>
      updateRow(current, entry.rowId, entry.columnId, entry.previousValue),
    );
    setHistory((state) => ({
      undo: state.undo.slice(0, -1),
      redo: [...state.redo, entry],
    }));
  }, [history.undo, updateRow]);
  const handleRedoRequest = React.useCallback(() => {
    const entry = history.redo[history.redo.length - 1];
    if (!entry) return;
    setRows((current) =>
      updateRow(current, entry.rowId, entry.columnId, entry.value),
    );
    setHistory((state) => ({
      undo: [...state.undo, entry],
      redo: state.redo.slice(0, -1),
    }));
  }, [history.redo, updateRow]);
  const [views, setViews] = React.useState<SavedView[]>([
    { id: "default", name: "Default", state: {} },
    { id: "builder-starter", name: "Builder starter", state: {} },
  ]);

  return (
    <RivetGridPro
      ariaLabel="Custom table"
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      height={480}
      stickyHeader
      density={"medium"}
      rowStyle="outline"
      theme="light"
      rivetGridWidthMode="fill"
      resizeMode="live"
      enableGrouping={false}
      richCells={{ enabled: true }}
      savedViews={{ enabled: true, views, onViewsChange: setViews }}
      spreadsheet={{
        rangeSelection: { enabled: true },
        comments: {
          enabled: true,
          comments,
          onCellCommentChange: ({ rowId, columnId, text }) =>
            setComments((current) => [
              ...current.filter(
                (comment) =>
                  comment.rowId !== rowId || comment.columnId !== columnId,
              ),
              ...(text.trim() ? [{ rowId, columnId, text }] : []),
            ]),
        },
        undo: {
          enabled: true,
          canUndo: history.undo.length > 0,
          onUndoRequest: handleUndoRequest,
        },
        redo: {
          enabled: true,
          canRedo: history.redo.length > 0,
          onRedoRequest: handleRedoRequest,
        },
      }}
      keyboardNav="cells"
      editingEnabled
      editingDefaults={{
        enabled: true,
        structuralEditing: {
          enabled: true,
          columnTypes: STRUCTURAL_COLUMN_TYPES,
          onInsertColumn: ({ columnId, position, typeId }) => {
            const sequence = insertedColumnId.current;
            insertedColumnId.current += 1;
            const nextColumnId = "custom_" + typeId + "_" + sequence;
            const typePatch = getColumnTypePatch(typeId);
            const nextColumn: Column<StarterRow> = {
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
                (row) => ({ ...row, [nextColumnId]: null }) as StarterRow,
              ),
            );
          },
          onInsertRow: ({ rowId, position }) => {
            const nextRow = Object.fromEntries([
              ["id", "inserted-" + insertedRowId.current],
              ...columns.map((column) => [column.id, null]),
            ]) as unknown as StarterRow;
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
                const next = { ...row } as StarterRow & Record<string, unknown>;
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
