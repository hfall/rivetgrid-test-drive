import * as React from "react";
import {
  AvatarCell,
  RivetGrid,
  ThumbnailCell,
  normalizeImageCellValue,
  type Column,
} from "@rivetgrid/rivetgrid";
import "@rivetgrid/rivetgrid/styles.css";

type MediaRow = {
  id: string;
  product: string;
  owner: string;
  avatarName: string;
  thumbnail: { src: string | null; alt: string };
  image: { src: string; alt: string } | null;
};

const initialRows: MediaRow[] = [
  {
    id: "atlas-media",
    product: "Atlas Grid",
    owner: "Maya",
    avatarName: "Maya Chen",
    thumbnail: {
      src: "/assets/atlas-thumbnail-DYwEb6za.webp",
      alt: "Atlas product thumbnail",
    },
    image: {
      src: "/assets/atlas-preview-By615Pxq.webp",
      alt: "Atlas preview",
    },
  },
  {
    id: "pulse-media",
    product: "Pulse CRM",
    owner: "Iris",
    avatarName: "Iris Stone",
    thumbnail: {
      src: "/assets/pulse-thumbnail-b2l-CoPu.webp",
      alt: "Pulse product thumbnail",
    },
    image: {
      src: "/assets/pulse-preview-CHgg1OZa.webp",
      alt: "Pulse preview",
    },
  },
  {
    id: "forge-media",
    product: "Forge Ops",
    owner: "Nolan",
    avatarName: "Nolan Brooks",
    thumbnail: {
      src: null,
      alt: "Missing Forge thumbnail",
    },
    image: null,
  },
  {
    id: "vector-media",
    product: "Vector CRM",
    owner: "Priya",
    avatarName: "Priya Shah",
    thumbnail: {
      src: null,
      alt: "Vector product thumbnail",
    },
    image: null,
  },
];

const mediaColumns: Column<MediaRow>[] = [
  {
    id: "avatar",
    header: "",
    label: "Avatar",
    hideHeaderLabel: true,
    accessor: (row) => <AvatarCell name={row.owner} />,
    cellType: "avatar",
    resizable: false,
    sortable: false,
  },
  {
    id: "thumbnail",
    header: "",
    label: "Thumbnail",
    hideHeaderLabel: true,
    accessor: (row) => (
      <ThumbnailCell
        imageUrl={row.thumbnail.src}
        label={row.thumbnail.alt}
        size="default"
      />
    ),
    cellType: "thumbnail",
    resizable: false,
    sortable: false,
  },
  {
    id: "image",
    header: "Image URL",
    hideHeaderLabel: false,
    accessor: (row) => row.image?.src ?? null,
    type: "image",
    cellFormat: "image",
    width: 112,
    sortable: false,
  },
  { id: "product", header: "Product", accessor: (row) => row.product },
  { id: "owner", header: "Owner", accessor: (row) => row.owner },
];

export function MediaCellsDemo() {
  const [rows, setRows] = React.useState(initialRows);
  const spreadsheetDefaults = React.useMemo(
    () => ({
      enabled: true,
      onCommitCell: (rowId, columnId, value) => {
        setRows((current) =>
          current.map((row) => {
            if (row.id !== rowId) return row;
            if (columnId === "image") {
              return { ...row, image: normalizeImageCellValue(value) };
            }
            return { ...row, [columnId]: value };
          }),
        );
      },
    }),
    [],
  );

  return (
    <RivetGrid
      ariaLabel="Editable media cells"
      columns={mediaColumns}
      rows={rows}
      getRowId={(row) => row.id}
      keyboardNav="cells"
      editingEnabled
      spreadsheetDefaults={spreadsheetDefaults}
      density="spacious"
      richCells={{ enabled: true }}
    />
  );
}
