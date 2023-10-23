import React, { useState } from "react";
import "./item.scss";
import axios from "axios";
import { ChevronDown, ChevronRight, Plus,  Delete ,Folder} from "lucide-react";


interface itemProps {
  id?: string;
  label: string;
  isRoot?: boolean;
  level?: number;
  onExpand?: () => void;
  expanded?: boolean;
}

const Item = ({ id, label, isRoot, onExpand, expanded }: itemProps) => {
  
  const [addFolder, setAddFolder] = useState(false);
  const [title, setTitle] = useState("Untitle Folder");

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (event: React.MouseEvent) => {
    event.stopPropagation();
    onExpand?.();
  };

  const deleteFolder = (event: React.MouseEvent) => {
    event.stopPropagation();
    axios.delete(`http://localhost:8080/doc?id=${id}`)
    .then((res) => {
        console.log("delete",res);
        window.location.reload();
    })
    .catch((err) => {
        console.log(err);
    });
  };

  const createFolder = (event: React.FormEvent) => {
    event.preventDefault();
    axios
    .post("http://localhost:8080/doc", {
        id,
        title,
      })
    .then((res) => {
        console.log(res.data.data);
        window.location.reload();
        setAddFolder(false);
      })
    .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="item-container">
      <button className="expaned" onClick={handleExpand}>
        <ChevronIcon />
      </button>
      <div>
        <Folder />
        <p>{label}</p>
      </div>
      <div>
        <button onClick={() => setAddFolder(true)}>
          <Plus />
        </button>
        <span>New Folder</span>
      </div>
      {!isRoot && (
        <div>
          <button onClick={deleteFolder}>
            <Delete />
          </button>
        </div>
      )}

      {addFolder && (
        <div className="addbox">
          <form onSubmit={createFolder}>
            <div className="textbox">
              <Folder />
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write Folder Name"
              />
            </div>
            <input type="submit" value="add" />
          </form>
          <button className="c-btn" onClick={() => setAddFolder(false)}>
            Cancel
          </button>
        </div>
      )}
      
    </div>
  );
};

export default Item;
