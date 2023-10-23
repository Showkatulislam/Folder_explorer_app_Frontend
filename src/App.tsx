import "./App.css";
import {useState} from 'react'
import DocumentLists from "./components/documents/DocumentLists";
import Item from "./components/item/Item";

function App() {
  const [expanded, setExpanded] = useState(true);

  const onExpand = () => {
    setExpanded((prevExpanded) => (!prevExpanded));
  };
  return (
    <div className="container">
      <Item label="Root" id="root" expanded={expanded} onExpand={onExpand} isRoot={true}  />
      {
        expanded && <DocumentLists id={'root'}/>
      }
    </div>
  );
}

export default App;
