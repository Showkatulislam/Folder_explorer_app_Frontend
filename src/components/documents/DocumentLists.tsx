import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../item/Item";
interface DocumentListProps {
  id?: string;
  level?: number;
}
type Obj = {
  _id: string;
  title: string;
  parentId: string;
};
const DocumentLists = ({ id, level = 0 }: DocumentListProps) => {
  const [documents, setdoc] = useState<Obj>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/doc?id=${id}`)
      .then((data) => setdoc(data?.data.docs));
  }, []);
  console.log(documents);

  return (
    <>
      {documents.length === 0 && (
        <p
          style={{
            background: "gray",
            width: "250px",
            padding: "2px 5px",
            color: "white",
            margin: "2px 5px",
          }}
        >
          No Folders
        </p>
      )}
      <div style={{ paddingLeft: level ? `${level * 12 + 25}px` : "10px" }}>
        {documents?.map((document: Obj, index: string) => (
          <div key={index}>
            <Item
              id={document._id}
              label={document.title}
              level={level}
              onExpand={() => onExpand(document._id)}
              expanded={expanded[document._id]}
            />
            {expanded[document._id] && (
              <DocumentLists id={document._id} level={level + 1} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DocumentLists;
