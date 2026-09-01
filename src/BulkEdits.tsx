/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { type Column } from "@rivetgrid/grid";
import { RivetGridPro, type SavedView } from "@rivetgrid/pro";
import "@rivetgrid/grid/styles.css";
import "@rivetgrid/pro/styles.css";

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

export function BulkEdits() {
  const [columns, _setColumns] = React.useState(() => initialColumns);
  const [rows, setRows] = React.useState(() => makeRows(100));

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

  const [filterDirtyRows, setFilterDirtyRows] = React.useState(false);
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
  const [editingColId, setEditingColId] = React.useState<string | null>(null);
  const editButtonRefs = React.useRef<Record<string, HTMLButtonElement | null>>(
    {},
  );
  const [drafts, setDrafts] = React.useState<
    Record<string, Partial<StarterRow>>
  >({});
  const [invalidDraftInputs, setInvalidDraftInputs] = React.useState<
    Record<string, string>
  >({});

  const dirtyRowIds = Object.keys(drafts);
  const returnFocusToEdit = React.useCallback((rowId: string) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          const sameRowEditButton = editButtonRefs.current[rowId];
          const focusTarget = sameRowEditButton?.isConnected
            ? sameRowEditButton
            : Object.values(editButtonRefs.current).find(
                (button) => button?.isConnected,
              );
          focusTarget?.focus();
        }, 0);
      });
    });
  }, []);
  const isNumericColumn = React.useCallback(
    (column: Column<StarterRow>) =>
      column.isNumeric ||
      column.type === "number" ||
      column.type === "currency" ||
      column.type === "percentage" ||
      column.cellFormat === "currency" ||
      column.cellFormat === "percentage",
    [],
  );
  const updateDraft = React.useCallback(
    (
      rowId: string,
      column: Column<StarterRow>,
      rawValue: string | string[],
    ) => {
      const columnId = column.id;
      const key = rowId + ":" + columnId;
      const invalidNumericValue =
        typeof rawValue === "string" &&
        isNumericColumn(column) &&
        (!rawValue.trim() || !Number.isFinite(Number(rawValue)));
      if (invalidNumericValue) {
        setInvalidDraftInputs((current) => ({ ...current, [key]: rawValue }));
        return;
      }
      setInvalidDraftInputs((current) => {
        const { [key]: _cleared, ...remaining } = current;
        return remaining;
      });
      const value =
        typeof rawValue === "string" && isNumericColumn(column)
          ? Number(rawValue)
          : rawValue;

      setDrafts((current) => ({
        ...current,
        [rowId]: {
          ...current[rowId],
          [columnId]: value,
        } as Partial<StarterRow>,
      }));
    },
    [isNumericColumn],
  );
  const saveDraft = React.useCallback(
    (rowId: string) => {
      const patch = drafts[rowId];
      if (!patch) return;
      if (
        Object.keys(invalidDraftInputs).some((key) =>
          key.startsWith(rowId + ":"),
        )
      )
        return;

      setRows((current) =>
        Object.entries(patch).reduce(
          (nextRows, [columnId, value]) =>
            updateRow(nextRows, rowId, columnId, value),
          current,
        ),
      );
      setDrafts((current) => {
        const { [rowId]: _saved, ...remaining } = current;
        return remaining;
      });
      setEditingRowId(null);
      setEditingColId(null);
      returnFocusToEdit(rowId);
    },
    [drafts, invalidDraftInputs, returnFocusToEdit, updateRow],
  );
  const discardDraft = React.useCallback(
    (rowId: string) => {
      setDrafts((current) => {
        const { [rowId]: _discarded, ...remaining } = current;
        return remaining;
      });
      setInvalidDraftInputs((current) =>
        Object.fromEntries(
          Object.entries(current).filter(
            ([key]) => !key.startsWith(rowId + ":"),
          ),
        ),
      );
      setEditingRowId(null);
      setEditingColId(null);
      returnFocusToEdit(rowId);
    },
    [returnFocusToEdit],
  );
  const startRowEdit = React.useCallback(
    (rowId: string) => {
      setEditingRowId(rowId);
      setEditingColId(columns[0]?.id ?? null);
    },
    [columns],
  );
  const saveAllDrafts = React.useCallback(() => {
    dirtyRowIds.forEach((rowId) => saveDraft(rowId));
  }, [dirtyRowIds, saveDraft]);
  const dirtyRowIdSet = React.useMemo(
    () => new Set(dirtyRowIds),
    [dirtyRowIds],
  );
  const visibleRows =
    filterDirtyRows && dirtyRowIds.length > 0
      ? rows.filter((row) => dirtyRowIdSet.has(row.id))
      : rows;
  React.useEffect(() => {
    if (filterDirtyRows && dirtyRowIds.length === 0) setFilterDirtyRows(false);
  }, [dirtyRowIds.length, filterDirtyRows]);
  const renderBulkRowActions = React.useCallback(
    (row: StarterRow) => {
      const isEditing = editingRowId === row.id;
      const isDirty = Boolean(drafts[row.id]);
      const hasRowError = Object.keys(invalidDraftInputs).some((key) =>
        key.startsWith(row.id + ":"),
      );
      return (
        <div role="group" aria-label={"Edit row " + row.id}>
          {!isEditing ? (
            <button
              type="button"
              ref={(button) => {
                editButtonRefs.current[row.id] = button;
              }}
              onClick={() => startRowEdit(row.id)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => saveDraft(row.id)}
                disabled={!isDirty || hasRowError}
              >
                Save
              </button>
              <button type="button" onClick={() => discardDraft(row.id)}>
                Cancel
              </button>
            </>
          )}
        </div>
      );
    },
    [
      drafts,
      editingRowId,
      startRowEdit,
      saveDraft,
      discardDraft,
      invalidDraftInputs,
    ],
  );
  const bulkEditColumns = React.useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        accessor: (row: StarterRow) => {
          const draft = drafts[row.id];
          const value =
            draft?.[column.id as keyof StarterRow] ??
            (row as unknown as Record<string, unknown>)[column.id];
          if (editingRowId !== row.id) return column.accessor(row);
          const ariaLabel = String(column.header);
          const commitOnKey = (
            event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
          ) => {
            if (event.key === "Enter") saveDraft(row.id);
            if (event.key === "Escape") discardDraft(row.id);
          };
          const key = row.id + ":" + column.id;
          const errorMessage = invalidDraftInputs[key]
            ? "Enter a finite number before saving."
            : null;
          const errorMessageId = "error-" + row.id + "-" + column.id;
          const showError = errorMessage ? (
            <p id={errorMessageId} role="alert">
              {errorMessage}
            </p>
          ) : null;
          if (column.enumOptions?.length) {
            return (
              <>
                <select
                  aria-label={ariaLabel}
                  aria-invalid={errorMessage ? "true" : undefined}
                  aria-describedby={errorMessage ? errorMessageId : undefined}
                  value={value == null ? "" : String(value)}
                  onChange={(event) =>
                    updateDraft(row.id, column, event.target.value)
                  }
                  onFocus={() => setEditingColId(column.id)}
                  onKeyDown={commitOnKey}
                >
                  {column.enumOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {showError}
              </>
            );
          }
          const collectionEditor =
            column.cellFormat === "multiSelect" || column.cellFormat === "tags";
          const inputType =
            column.cellFormat === "date"
              ? "date"
              : column.cellFormat === "time"
                ? "time"
                : column.cellFormat === "datetime"
                  ? "datetime-local"
                  : "text";
          return (
            <>
              <input
                type={inputType}
                aria-label={
                  collectionEditor
                    ? ariaLabel + " (comma-separated values)"
                    : ariaLabel
                }
                aria-invalid={errorMessage ? "true" : undefined}
                aria-describedby={errorMessage ? errorMessageId : undefined}
                value={
                  invalidDraftInputs[key] ??
                  (Array.isArray(value)
                    ? value.join(", ")
                    : value == null
                      ? ""
                      : String(value))
                }
                onChange={(event) =>
                  updateDraft(
                    row.id,
                    column,
                    collectionEditor
                      ? event.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                      : event.target.value,
                  )
                }
                onFocus={() => setEditingColId(column.id)}
                onKeyDown={commitOnKey}
              />
              {showError}
            </>
          );
        },
      })),
    [
      columns,
      drafts,
      editingRowId,
      saveDraft,
      discardDraft,
      updateDraft,
      invalidDraftInputs,
    ],
  );
  const [views, setViews] = React.useState<SavedView[]>([
    { id: "default", name: "Default", state: {} },
    { id: "builder-starter", name: "Builder starter", state: {} },
  ]);

  return (
    <>
      <div>
        <RivetGridPro
          ariaLabel="Custom table"
          columns={bulkEditColumns}
          rows={visibleRows}
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
          bulkEdit={{
            hasDirtyRows: dirtyRowIds.length > 0,
            dirtyRowCount: dirtyRowIds.length,
            saveAll: { onSaveAll: saveAllDrafts },
            dirtyRowsFilter: {
              active: filterDirtyRows,
              onToggle: () => setFilterDirtyRows((current) => !current),
            },
          }}
          keyboardNav="cells"
          editingEnabled
          editingRowId={editingRowId}
          editingColId={editingColId}
          editingRowIsDirty={
            editingRowId ? Boolean(drafts[editingRowId]) : false
          }
          renderRowActions={renderBulkRowActions}
          rowActionsWidth={136}
          pinRowActions
          rowActionsAffectRowHeight={false}
          editingDefaults={{
            enabled: true,
            structuralEditing: { enabled: false },
          }}
        />
      </div>
    </>
  );
}
