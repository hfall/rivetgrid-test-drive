import { RivetGrid, type Column } from "@rivetgrid/rivetgrid";

type Product = {
  id: string;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: "1", name: "Laptop", price: 999.99 },
  { id: "2", name: "Mouse", price: 29.99 },
  { id: "3", name: "Keyboard", price: 79.99 },
];

const columns: Column<Product>[] = [
  {
    id: "name",
    header: "Product",
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: "price",
    header: "Price",
    accessor: (row) => `$${row.price.toFixed(2)}`,
    sortable: true,
  },
];

export default function App() {
  return (
    <main style={{ padding: 32 }}>
      <h1>My first RivetGrid table</h1>
      <RivetGrid
        columns={columns}
        rows={products}
        getRowKey={(row) => row.id}
        ariaLabel="Products"
      />
    </main>
  );
}
