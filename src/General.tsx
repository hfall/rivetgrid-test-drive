import { RivetGrid, type Column } from "@rivetgrid/rivetgrid";
import data from "./data.json";
import React from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const posts = data as Post[];

const columns: Column<Post>[] = [
  {
    id: "userId",
    header: "User Id",
    accessor: (row) => row.userId,
    type: "number",
    filterType: "number",
    isNumeric: true,
    sortable: true,
    searchable: true,
    resizable: true,
    pin: "left",
    width: 80,
  },
  {
    id: "title",
    header: "Title",
    accessor: (row) => row.title,
    sortable: true,
    searchable: true,
    resizable: true,
  },
  {
    id: "body",
    header: "Post",
    accessor: (row) => `${row.body}`,
    sortable: true,
    searchable: true,
    resizable: true,
  },
];

export function General() {
  const [editableRows, setEditableRows] = React.useState(posts);
  const [selectedRowIds, setSelectedRowIds] = React.useState<Set<string>>(
    new Set(),
  );
  return (
    <RivetGrid
      columns={columns}
      rows={editableRows}
      getRowKey={(row) => row.id}
      ariaLabel="Posts"
      stickyHeader
      height={500}
      rowStyle="outline"
      keyboardNav="cells"
      enableSelection
      selectedRowIds={selectedRowIds}
      onSelectionChange={(selectedIds) => {
        setSelectedRowIds(selectedIds);
      }}
      enableRowNumbers
      enableRowPinning
      enableRowReorder
      enableColumnDragToPin
      enableColumnSettings
      // enableColumnHeaderReorder
      editingEnabled
      spreadsheetDefaults={{
        enabled: true,
        rangeSelection: { enabled: true },
        fillHandle: { enabled: true },
        structuralEditing: {
          enabled: true,
        },
        onCommitCell: (rowId: string, columnId: string, value: unknown) => {
          // console.log(rowId, columnId, value);
          setEditableRows((current) =>
            current.map((row) => {
              console.log(row.id.toString() === rowId, row);
              return row.id.toString() === rowId
                ? { ...row, [columnId]: value ?? "" }
                : row;
            }),
          );
        },
      }}

      // rowOrder={}
      // displayMode="cards"
      // theme="dark"
      // disableSearch
      // enableDensityToggle={false}
      // enableDownloadMenu={false}
    />
  );
}
