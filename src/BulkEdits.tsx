// /* eslint-disable @typescript-eslint/no-unused-vars */
// import * as React from "react";
// import {
//   RivetGrid,
//   type Column,
//   type FilteringState,
//   BULK_ROW_EDIT_ACTIONS_WIDTH,
//   BulkRowEditActions,
//   BulkRowEditCriticalTooltip,
//   BulkRowEditDirtyFilterAction,
//   BulkRowEditSaveAllAction,
//   RowEditCell,
//   useBulkRowEditCriticalHint,
//   useEditingModel,
// } from "@rivetgrid/rivetgrid";
// import "@rivetgrid/rivetgrid/styles.css";

// type EditingRow = {
//   id: string;
//   product: string;
//   owner: string;
//   status: string;
//   priority: string;
//   channels: string[];
//   labels: string[];
//   kickoffDate: string;
//   reviewTime: string;
//   launchWindow: string;
//   country: string;
//   progress: number;
//   price: number;
// };

// const allColumns: Column<EditingRow>[] = [
//   {
//     id: "product",
//     header: "Product",
//     accessor: (row) => row.product,
//     type: "text",
//     width: 132,
//   },
//   {
//     id: "owner",
//     header: "Owner",
//     accessor: (row) => row.owner,
//     type: "text",
//     width: 112,
//   },
//   {
//     id: "status",
//     header: "Status",
//     accessor: (row) => row.status,
//     type: "enum",
//     cellFormat: "enum",
//     enumOptions: ["Active", "Review", "Paused"],
//     width: 116,
//   },
//   {
//     id: "priority",
//     header: "Priority",
//     accessor: (row) => row.priority,
//     type: "enum",
//     cellFormat: "enum",
//     enumOptions: ["High", "Medium", "Low"],
//     width: 116,
//   },
//   {
//     id: "channels",
//     header: "Select chips",
//     accessor: (row) => row.channels,
//     cellFormat: "multiSelect",
//     enumOptions: [
//       "Email",
//       "In app",
//       "Sales",
//       "Support",
//       "Web",
//       "Partner",
//       "Field",
//     ],
//     width: 184,
//   },
//   {
//     id: "labels",
//     header: "Tags",
//     accessor: (row) => row.labels,
//     cellFormat: "tags",
//     width: 174,
//   },
//   {
//     id: "kickoffDate",
//     header: "Date",
//     accessor: (row) => row.kickoffDate,
//     type: "date",
//     cellFormat: "date",
//     width: 118,
//   },
//   {
//     id: "reviewTime",
//     header: "Time",
//     accessor: (row) => row.reviewTime,
//     type: "date",
//     cellFormat: "time",
//     width: 110,
//   },
//   {
//     id: "launchWindow",
//     header: "Date time",
//     accessor: (row) => row.launchWindow,
//     type: "date",
//     cellFormat: "datetime",
//     width: 166,
//   },
//   {
//     id: "country",
//     header: "Country",
//     accessor: (row) => row.country,
//     type: "enum",
//     cellFormat: "enum",
//     selectPreset: "country",
//     enumOptions: ["US", "CA", "GB", "DE", "JP", "AU"],
//     width: 136,
//   },
//   {
//     id: "progress",
//     header: "Progress",
//     accessor: (row) => row.progress,
//     type: "percentage",
//     cellFormat: "percentage",
//     isNumeric: true,
//     align: "right",
//     width: 118,
//   },
//   {
//     id: "price",
//     header: "Price",
//     accessor: (row) => row.price,
//     type: "currency",
//     cellFormat: "currency",
//     isNumeric: true,
//     align: "right",
//     width: 132,
//   },
// ];

// const baseRows: EditingRow[] = [
//   {
//     id: "editing-1",
//     product: "Atlas",
//     owner: "Maya",
//     status: "Active",
//     priority: "High",
//     channels: ["Email", "In app"],
//     labels: ["Renewal", "Priority"],
//     kickoffDate: "2026-07-08",
//     reviewTime: "09:00",
//     launchWindow: "2026-07-12T09:00",
//     country: "US",
//     progress: 82,
//     price: 42000,
//   },
//   {
//     id: "editing-2",
//     product: "Pulse",
//     owner: "Noah",
//     status: "Review",
//     priority: "Medium",
//     channels: ["Sales", "Support"],
//     labels: ["Pilot", "UX"],
//     kickoffDate: "2026-07-09",
//     reviewTime: "10:30",
//     launchWindow: "2026-07-13T10:30",
//     country: "CA",
//     progress: 64,
//     price: 31800,
//   },
//   {
//     id: "editing-3",
//     product: "Forge",
//     owner: "Ari",
//     status: "Paused",
//     priority: "Low",
//     channels: ["Web", "Partner"],
//     labels: ["Ops", "Follow-up"],
//     kickoffDate: "2026-07-10",
//     reviewTime: "13:15",
//     launchWindow: "2026-07-14T13:15",
//     country: "GB",
//     progress: 37,
//     price: 18600,
//   },
//   {
//     id: "editing-4",
//     product: "Nova",
//     owner: "Lena",
//     status: "Active",
//     priority: "Medium",
//     channels: ["Field", "Email"],
//     labels: ["Launch", "VIP"],
//     kickoffDate: "2026-07-11",
//     reviewTime: "15:45",
//     launchWindow: "2026-07-15T15:45",
//     country: "DE",
//     progress: 91,
//     price: 53500,
//   },
// ];

// function makeRows(count: number): EditingRow[] {
//   const flatRows = Array.from({ length: count }, (_, index) => ({
//     ...baseRows[index % baseRows.length],
//     id: "row-" + (index + 1),
//   }));
//   return flatRows;
// }

// function getFilterType(
//   column: Column<EditingRow>,
// ): Column<EditingRow>["filterType"] {
//   if (
//     column.cellType === "avatar" ||
//     column.type === "image" ||
//     column.cellFormat === "image"
//   )
//     return undefined;
//   if (column.type === "enum") return "enum";
//   if (column.type === "date") return "date";
//   if (column.type === "currency" || column.cellFormat === "currency")
//     return "currency";
//   if (column.type === "percentage" || column.cellFormat === "percentage")
//     return "percentage";
//   if (column.type === "number" || column.isNumeric) return "number";
//   return "text";
// }

// const STRUCTURAL_COLUMN_TYPES = [
//   { id: "text", label: "Text" },
//   { id: "number", label: "Number" },
//   { id: "currency", label: "Currency" },
//   { id: "percentage", label: "Percentage" },
//   { id: "email", label: "Email" },
//   { id: "phone", label: "Phone" },
//   { id: "boolean", label: "Checkbox" },
//   { id: "date", label: "Date" },
//   { id: "time", label: "Time" },
//   { id: "datetime", label: "Date & Time" },
// ];

// function getColumnTypePatch(typeId: string): Partial<Column<EditingRow>> {
//   if (typeId === "currency")
//     return {
//       type: "currency",
//       filterType: "currency",
//       cellFormat: "currency",
//       isNumeric: true,
//       align: "right",
//       minWidth: 120,
//     };
//   if (typeId === "percentage")
//     return {
//       type: "percentage",
//       filterType: "percentage",
//       cellFormat: "percentage",
//       isNumeric: true,
//       align: "right",
//       minWidth: 120,
//     };
//   if (typeId === "number")
//     return {
//       type: "number",
//       filterType: "number",
//       isNumeric: true,
//       align: "right",
//       minWidth: 100,
//     };
//   if (typeId === "email")
//     return { type: "email", filterType: "email", align: "left", minWidth: 180 };
//   if (typeId === "phone")
//     return { type: "phone", filterType: "phone", align: "left", minWidth: 140 };
//   if (typeId === "boolean")
//     return {
//       type: "boolean",
//       filterType: "boolean",
//       cellFormat: "boolean",
//       align: "center",
//       minWidth: 100,
//     };
//   if (typeId === "date")
//     return {
//       type: "date",
//       filterType: "date",
//       cellFormat: "date",
//       align: "left",
//       minWidth: 120,
//     };
//   if (typeId === "time")
//     return {
//       filterType: "time",
//       cellFormat: "time",
//       align: "left",
//       minWidth: 120,
//     };
//   if (typeId === "datetime")
//     return {
//       filterType: "datetime",
//       cellFormat: "datetime",
//       align: "left",
//       minWidth: 160,
//     };
//   return { type: "text", filterType: "text", align: "left", minWidth: 120 };
// }

// function mapRows(
//   rows: EditingRow[],
//   update: (row: EditingRow) => EditingRow,
// ): EditingRow[] {
//   return rows.map((row) => {
//     const next = update(row);
//     const children = (next as EditingRow & { children?: EditingRow[] })
//       .children;
//     return children?.length
//       ? ({ ...next, children: mapRows(children, update) } as EditingRow)
//       : next;
//   });
// }

// function insertRow(
//   rows: EditingRow[],
//   rowId: string,
//   position: "above" | "below",
//   nextRow: EditingRow,
// ): { rows: EditingRow[]; inserted: boolean } {
//   const anchorIndex = rows.findIndex((row) => row.id === rowId);
//   if (anchorIndex >= 0) {
//     const insertIndex = position === "above" ? anchorIndex : anchorIndex + 1;
//     return {
//       rows: [
//         ...rows.slice(0, insertIndex),
//         nextRow,
//         ...rows.slice(insertIndex),
//       ],
//       inserted: true,
//     };
//   }
//   for (let index = 0; index < rows.length; index += 1) {
//     const children = (rows[index] as EditingRow & { children?: EditingRow[] })
//       .children;
//     if (!children?.length) continue;
//     const nested = insertRow(children, rowId, position, nextRow);
//     if (!nested.inserted) continue;
//     const nextRows = [...rows];
//     nextRows[index] = { ...rows[index], children: nested.rows } as EditingRow;
//     return { rows: nextRows, inserted: true };
//   }
//   return { rows, inserted: false };
// }

// function deleteRow(rows: EditingRow[], rowId: string): EditingRow[] {
//   return rows
//     .filter((row) => row.id !== rowId)
//     .map((row) => {
//       const children = (row as EditingRow & { children?: EditingRow[] })
//         .children;
//       return children?.length
//         ? ({ ...row, children: deleteRow(children, rowId) } as EditingRow)
//         : row;
//     });
// }

// function countRows(rows: EditingRow[]): number {
//   return rows.reduce((count, row) => {
//     const children =
//       (row as EditingRow & { children?: EditingRow[] }).children ?? [];
//     return count + 1 + countRows(children);
//   }, 0);
// }

// const customizedColumns: Column<EditingRow>[] = [
//   allColumns.find((column) => column.id === "product")!,
//   allColumns.find((column) => column.id === "owner")!,
//   allColumns.find((column) => column.id === "status")!,
//   allColumns.find((column) => column.id === "progress")!,
//   allColumns.find((column) => column.id === "price")!,
// ];

// const initialColumns: Column<EditingRow>[] = customizedColumns.map(
//   (column, index) => ({
//     ...column,
//     pin: undefined,
//     resizable: column.resizable ?? true,
//     sortable: false,
//     searchable:
//       column.cellType === "avatar" || column.type === "image"
//         ? false
//         : (column.searchable ?? true),
//     filterType: getFilterType(column),
//   }),
// );

// export function EditingTable() {
//   const [columns, setColumns] = React.useState(() => initialColumns);
//   const [rows, setRows] = React.useState(() => makeRows(100));
//   const insertedColumnId = React.useRef(1);
//   const insertedRowId = React.useRef(1);

//   const updateRow = React.useCallback(
//     (
//       current: EditingRow[],
//       rowId: string,
//       columnId: string,
//       value: unknown,
//     ): EditingRow[] => {
//       return current.map((row) => {
//         if (row.id === rowId) {
//           return { ...row, [columnId]: value } as EditingRow;
//         }
//         const children = (row as EditingRow & { children?: EditingRow[] })
//           .children;
//         return children?.length
//           ? ({
//               ...row,
//               children: updateRow(children, rowId, columnId, value),
//             } as EditingRow)
//           : row;
//       });
//     },
//     [],
//   );
//   const handleCommitCell = React.useCallback(
//     (rowId: string, columnId: string, value: unknown) => {
//       setRows((current) => {
//         return updateRow(current, rowId, columnId, value);
//       });
//     },
//     [updateRow],
//   );

//   const gridRootRef = React.useRef<HTMLDivElement>(null);
//   const [filterDirtyRows, setFilterDirtyRows] = React.useState(false);
//   const editableColumnIds = React.useMemo(
//     () => columns.map((column) => column.id),
//     [columns],
//   );
//   const rowsById = React.useMemo(
//     () => new Map(rows.map((row) => [row.id, row])),
//     [rows],
//   );
//   const getRecordValue = React.useCallback(
//     (rowId: string, columnId: string) => {
//       const row = rowsById.get(rowId);
//       return row
//         ? (row as unknown as Record<string, unknown>)[columnId]
//         : undefined;
//     },
//     [rowsById],
//   );
//   const editing = useEditingModel<EditingRow>({
//     enabled: true,
//     getRowId: (row) => row.id,
//     getRecordValue,
//     editableColumns: editableColumnIds,
//     rowEditEscapeBehavior: "exit-row",
//     rootElementRef: gridRootRef,
//     onSaveRow: async (rowId, patch) => {
//       setRows((current) =>
//         Object.entries(patch).reduce(
//           (nextRows, [columnId, value]) =>
//             updateRow(nextRows, rowId, columnId, value),
//           current,
//         ),
//       );
//       return { success: true };
//     },
//     onCommitAll: async (patches) => {
//       setRows((current) =>
//         Array.from(patches.entries()).reduce(
//           (nextRows, [rowId, patch]) =>
//             Object.entries(patch).reduce(
//               (patchedRows, [columnId, value]) =>
//                 updateRow(patchedRows, rowId, columnId, value),
//               nextRows,
//             ),
//           current,
//         ),
//       );
//     },
//   });
//   const bulkEditHint = useBulkRowEditCriticalHint();
//   const dirtyRowIds = editing.dirty.dirtyRowIds;
//   const dirtyRowIdSet = React.useMemo(
//     () => new Set(dirtyRowIds),
//     [dirtyRowIds],
//   );
//   const visibleRows =
//     filterDirtyRows && dirtyRowIds.length > 0
//       ? rows.filter((row) => dirtyRowIdSet.has(row.id))
//       : rows;
//   React.useEffect(() => {
//     if (filterDirtyRows && dirtyRowIds.length === 0) setFilterDirtyRows(false);
//   }, [dirtyRowIds.length, filterDirtyRows]);

//   const bulkEditColumns = React.useMemo(
//     () =>
//       columns.map((column) => ({
//         ...column,
//         accessor: (row: EditingRow) => {
//           const isDirty = editing.dirty.isCellDirty(row.id, column.id);
//           const value = editing.getDisplayValue(row.id, column.id);
//           const readDisplayValue = isDirty ? undefined : column.accessor(row);
//           const readDisplayTextValue = isDirty ? value : readDisplayValue;
//           const index = editableColumnIds.indexOf(column.id);
//           return (
//             <RowEditCell
//               rowId={row.id}
//               colId={column.id}
//               value={value}
//               readDisplayValue={readDisplayValue}
//               readDisplayTextValue={
//                 typeof readDisplayTextValue === "string" ||
//                 typeof readDisplayTextValue === "number"
//                   ? String(readDisplayTextValue)
//                   : undefined
//               }
//               columnHeader={
//                 typeof column.header === "string"
//                   ? column.header
//                   : (column.label ?? column.id)
//               }
//               isRowEditing={editing.isRowEditing(row.id)}
//               isFocused={
//                 editing.editingState.activeRowId === row.id &&
//                 editing.editingState.activeColId === column.id
//               }
//               isDirty={isDirty}
//               error={editing.getCellError(row.id, column.id)}
//               isSaving={editing.getRowAsyncState(row.id).status === "saving"}
//               isNumeric={column.isNumeric}
//               enumOptions={column.enumOptions}
//               selectPreset={column.selectPreset}
//               isCurrency={column.type === "currency"}
//               isBoolean={column.type === "boolean"}
//               cellFormat={
//                 column.cellFormat && column.cellFormat !== "link"
//                   ? column.cellFormat
//                   : undefined
//               }
//               currency={column.currency}
//               timeFormat={column.timeFormat}
//               onValueChange={(nextValue) =>
//                 editing.updateRowCell(column.id, nextValue)
//               }
//               onFocus={() => editing.setRowFocusedCell(column.id)}
//               onTabNext={() =>
//                 editing.setRowFocusedCell(
//                   editableColumnIds[
//                     Math.min(index + 1, editableColumnIds.length - 1)
//                   ] ?? null,
//                 )
//               }
//               onTabPrev={() =>
//                 editing.setRowFocusedCell(
//                   editableColumnIds[Math.max(index - 1, 0)] ?? null,
//                 )
//               }
//               onEscape={() => editing.exitEdit()}
//               onSave={() => void editing.saveRow()}
//               onCommitCellToGrid={() => editing.setRowFocusedCell(null)}
//               onInactiveEditIntent={() =>
//                 bulkEditHint.showCriticalEditHint(row.id)
//               }
//             />
//           );
//         },
//       })),
//     [columns, editableColumnIds, editing, getRecordValue, bulkEditHint],
//   );
//   const enterBulkRowEdit = React.useCallback(
//     (rowId: string) => {
//       const row = Array.from(
//         gridRootRef.current?.querySelectorAll<HTMLTableRowElement>(
//           "tr[data-row-id]",
//         ) ?? [],
//       ).find((candidate) => candidate.dataset.rowId === rowId);
//       const scrollContainer =
//         row?.closest<HTMLElement>('[data-rg-scroll="true"]') ?? null;
//       const snapshot = scrollContainer
//         ? { left: scrollContainer.scrollLeft, top: scrollContainer.scrollTop }
//         : null;
//       const restoreScroll = () => {
//         if (
//           !scrollContainer ||
//           !snapshot ||
//           !document.body.contains(scrollContainer)
//         )
//           return;
//         scrollContainer.scrollLeft = snapshot.left;
//         scrollContainer.scrollTop = snapshot.top;
//       };
//       editing.enterRowEdit(rowId, null);
//       bulkEditHint.clearCriticalEditHint();
//       restoreScroll();
//       window.requestAnimationFrame(() => {
//         restoreScroll();
//         window.requestAnimationFrame(restoreScroll);
//       });
//     },
//     [bulkEditHint, editing],
//   );
//   const renderBulkRowActions = React.useCallback(
//     (row: EditingRow) => {
//       const isRowEditing = editing.isRowEditing(row.id);
//       return (
//         <BulkRowEditActions
//           isRowEditing={isRowEditing}
//           isRowDirty={editing.dirty.isRowDirty(row.id)}
//           asyncState={editing.getRowAsyncState(row.id)}
//           isCommitting={editing.isCommitting}
//           editRef={bulkEditHint.getEditButtonRef(row.id)}
//           suppressEditTooltip={bulkEditHint.criticalEditHint?.rowId === row.id}
//           onEditRow={() => enterBulkRowEdit(row.id)}
//           onClearError={() => editing.clearRowError(row.id)}
//           onSaveRowDraft={() =>
//             void (isRowEditing
//               ? editing.saveRow()
//               : editing.saveRowDraft(row.id))
//           }
//           onDiscardRow={() => {
//             editing.discardRowDraft(row.id);
//             if (isRowEditing) editing.exitEdit();
//           }}
//         />
//       );
//     },
//     [bulkEditHint, editing, enterBulkRowEdit],
//   );
//   const [filteringState, setFilteringState] = React.useState<FilteringState>({
//     columnFilters: [],
//     globalFilter: "",
//   });

//   return (
//     <>
//       <div ref={gridRootRef}>
//         <RivetGrid
//           ariaLabel="Editing table"
//           columns={bulkEditColumns}
//           rows={visibleRows}
//           getRowId={(row) => row.id}
//           height={480}
//           density={"medium"}
//           rowStyle="outline"
//           theme="light"
//           rivetGridWidthMode="fill"
//           resizeMode="live"
//           filteringState={filteringState}
//           onFilteringChange={(event) => {
//             setFilteringState(event.next);
//           }}
//           enableGrouping={false}
//           richCells={{ enabled: true }}
//           keyboardNav="cells"
//           editingEnabled
//           editingRowId={editing.editingState.activeRowId}
//           editingColId={editing.editingState.activeColId}
//           editingRowIsDirty={
//             editing.editingState.activeRowId
//               ? editing.dirty.isRowDirty(editing.editingState.activeRowId)
//               : false
//           }
//           hasAnyDirtyRows={editing.dirty.hasAnyDirtyDraft}
//           toolbarRightActions={
//             dirtyRowIds.length > 0 ? (
//               <>
//                 <BulkRowEditSaveAllAction
//                   count={dirtyRowIds.length}
//                   isSaving={editing.isCommitting}
//                   onSaveAll={() =>
//                     Promise.resolve(editing.commitAllDrafts()).catch(() => {})
//                   }
//                 />
//                 <BulkRowEditDirtyFilterAction
//                   count={dirtyRowIds.length}
//                   active={filterDirtyRows}
//                   onToggle={() => setFilterDirtyRows((current) => !current)}
//                 />
//               </>
//             ) : null
//           }
//           renderRowActions={renderBulkRowActions}
//           rowActionsWidth={BULK_ROW_EDIT_ACTIONS_WIDTH}
//           pinRowActions
//           rowActionsAffectRowHeight={false}
//           spreadsheetDefaults={{
//             enabled: true,
//             rangeSelection: { enabled: true },
//             structuralEditing: { enabled: false },
//           }}
//         />
//       </div>
//       <BulkRowEditCriticalTooltip
//         criticalEditHint={bulkEditHint.criticalEditHint}
//         getEditButtonRef={bulkEditHint.getEditButtonRef}
//         onDismiss={bulkEditHint.clearCriticalEditHint}
//       />
//     </>
//   );
// }
