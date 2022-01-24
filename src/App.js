import React, { useRef, useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import initialData from "./sample.json";
import { CustomNode } from "./customNode";
import "./core-tree.module.css";
import { Placeholder } from "./placeholdreNode";
import { CloneNode } from "./cloneNode";
import { addPathToTree } from "./utils";

function App() {
  const [treeData, setTreeData] = useState(addPathToTree(initialData));
  const [currentRef, setCurrentRef] = useState(null);
  const [selectedNodesID, setSelectedNodesID] = useState([]);
  const ref = useRef(null);

  React.useEffect(() => {
    document.addEventListener("dragstart", (e) => {
      const isExistAttr = e.target.getAttribute("draggable-icon");
      if (!isExistAttr) {
        e.preventDefault();
        return;
      }
      e.target.parentNode.parentNode.classList.add("draggingStart", "hide");
    });

    document.addEventListener("dragend", (e) => {
      e.target.parentNode.parentNode.classList.remove("hide", "draggingStart");
    });
    return () => {
      document.removeEventListener("dragstart", null);
      document.removeEventListener("dragend", null);
    };
  }, []);
  const handleDrop = (newTree) => setTreeData(addPathToTree(newTree));

  const handleSelect = (node) => {
    const nodesID = [
      ...new Set(
        treeData.reduce((acc, n) => {
          if (n.data.path.includes(node.id)) {
            const idx = n.data.path.findIndex((id) => id === node.id);
            acc.push(...n.data.path.slice(idx, n.data.path.length));
          }
          return acc;
        }, [])
      ),
    ];

    if (selectedNodesID.includes(node.id)) {
      setSelectedNodesID(selectedNodesID.filter((id) => !nodesID.includes(id)));
    } else {
      setSelectedNodesID([...selectedNodesID, ...nodesID]);
    }
  };

  // const handleSelect = ({ id }) => {
  //   let nodeId = null;

  //   const newTree = treeData
  //     .map((item) => (item.id === id && mutate(item)) || item)
  //     .map((item) => (item.parent === id && mutate(item)) || item)
  //     .map((item, idx, array) => {
  //       if (item.parent === id) {
  //         nodeId = item.id;
  //       }
  //       if (array[idx].parent === nodeId) {
  //         item = { ...item.id, ...mutate(array[idx]) };
  //       }

  //       return item;
  //     });

  //   setTreeData(newTree);
  // };
  // const mutate = (node) => ({ ...node, data: { checked: true } });

  const handleOpenAll = () => ref.current.openAll();
  const handleCloseAll = () => ref.current.closeAll();
  const handleCheckedAll = (e) => {
    const isChecked = e.target.checked;
    isChecked
      ? setSelectedNodesID(treeData.map((item) => item.id))
      : setSelectedNodesID([]);
  };

  const setDraggable = (state) => {
    if (currentRef) {
      currentRef.setAttribute("draggable", false);
    }
    const nodes = document.querySelectorAll("li");
    const p = [...nodes];
    if (!!p.length) {
      nodes.forEach((item) => item.setAttribute("draggable", false));
    }
  };

  return (
    <div>
      <div className="btnGroup">
        <button className="btn" onClick={handleOpenAll}>
          Открыть все
        </button>
        <button className="btn" onClick={handleCloseAll}>
          Закрыть все
        </button>
        <label className="checkbox" htmlFor="ch">
          Выбрать все
          <input onChange={handleCheckedAll} type={"checkbox"} id="ch" />
        </label>
      </div>

      <Tree
        classes={{
          container: "root-tree-container",
          root: "root-tree",
          dropTarget: "dropTarget",
          draggingSource: "draggingSource",
          listItem: "root-list",
          placeholder: "node-placeholdre",
        }}
        ref={ref}
        tree={treeData}
        rootId={0}
        sort={false}
        insertDroppableFirst={false}
        dragPreviewRender={(props) => <CloneNode {...props} />}
        placeholderRender={(node, { depth }) => (
          <Placeholder node={node} depth={depth} />
        )}
        dropTargetOffset={5}
        onDrop={handleDrop}
        render={(
          node,
          { depth, isOpen, onToggle, isDragging, containerRef }
        ) => (
          <CustomNode
            containerRef={containerRef}
            isDragging={isDragging}
            node={node}
            depth={depth}
            isOpen={isOpen}
            isSelected={selectedNodesID.includes(node.id)}
            onToggle={onToggle}
            onSelect={handleSelect}
            setDraggable={setDraggable}
            setCurrentRef={setCurrentRef}
          />
        )}
      />
    </div>
  );
}

export default App;
