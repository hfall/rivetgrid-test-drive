import { IntegrationCredentials } from "./IntegrationCredentials";

import { RichCellWorkflowExample } from "./RichCells";
import { MediaCellsDemo } from "./RichCells2";
import { RowActionsExample } from "./RowNumbersActions";
import { ProductTable } from "./General";
import { SpreadsheetEditingExample } from "./Editing";
import { UndoRedo } from "./BuilderExample";
import { TreeView } from "./TreeView";
import { CRMTable } from "./MergeCells";
import { SidePanelExample } from "./SidePanels";
import { Aggregations } from "./Aggregation";
import { BulkEdits } from "./BulkEdits";
import "@rivetgrid/grid/styles.css";
import "@rivetgrid/pro/styles.css";

export default function App() {
  return (
    <div
      style={{
        width: "800px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "60px",
        margin: "0 auto 100px",
      }}
    >
      <div>
        <h3>ProductTable</h3> <ProductTable />
      </div>
      <div>
        <h3>Password cell format</h3> <IntegrationCredentials />
      </div>
      <div>
        <h3>Rich cells</h3> <RichCellWorkflowExample />
      </div>
      <div>
        <h3>Avatars, thumbnails, and images</h3> <MediaCellsDemo />
      </div>
      <div>
        <h3>Row Numbers and Actions</h3> <RowActionsExample />
      </div>
      <div>
        <h3>Editing</h3> <SpreadsheetEditingExample />
      </div>
      <div>
        <h3>TreeView</h3> <TreeView />
      </div>
      <div>
        <h3>Merge Cells (CRM)</h3> <CRMTable />
      </div>
      <div>
        <h3>Side Panel</h3> <SidePanelExample />
      </div>
      <div>
        <h3>Aggregations</h3> <Aggregations />
      </div>
      <div>
        <h3>Bulk Edits</h3> <BulkEdits />
      </div>
      <div>
        <h3>Undo/Redo</h3> <UndoRedo />
      </div>
    </div>
  );
}
