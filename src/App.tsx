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
    id: "user",
    header: "User Id",
    accessor: (row) => row.userId,
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
    accessor: (row) => `$${row.body}`,
    sortable: true,
    searchable: true,
    resizable: true,
  },
];

export default function App() {
  const [selectedRowIds, setSelectedRowIds] = React.useState<Set<string>>(
    new Set(),
  );
  return (
    <main style={{ padding: 32, paddingBottom: 200 }}>
      <h1>My first RivetGrid table</h1>

      <br />
      <RivetGrid
        columns={columns}
        rows={posts}
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
        }}
        // rowOrder={}
        // displayMode="cards"
        // theme="dark"
        // disableSearch
        // enableDensityToggle={false}
        // enableDownloadMenu={false}
      />
    </main>
  );
}
