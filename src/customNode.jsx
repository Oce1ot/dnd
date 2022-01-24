import React, { useCallback } from "react";
import { useDragOver } from "@minoru/react-dnd-treeview";

import { RootNode } from "./custom-node.styled";
import "./custom-node.module.css";

import CheckIcon from "./icons/check.svg";
import ChevronIcon from "./icons/Chevron.svg";
import DotsIcon from "./icons/dots.svg";
import VisibleIcon from "./icons/visible.svg";
import AvatarIcon from "./icons/avatar.svg";

export const CustomNode = (props) => {
  const { id, data, draggable } = props.node;
  const { isDragging, containerRef, setDraggable, setCurrentRef, isSelected } =
    props;
  const indent = props.depth * 48;

  React.useEffect(() => {
    setCurrentRef(containerRef.current);
  });

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = () => props.onSelect(props.node);
  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <RootNode
      indent={indent}
      className="rootNode"
      style={{
        marginInlineStart: indent,
      }}
      {...dragOverProps}>
      <div className="box">
        <input
          type="checkbox"
          onClick={handleSelect}
          checked={props.isSelected}
          className="checkbox"
        />
        {props.node.droppable && (
          <div
            onClick={(e) => {
              handleToggle(e);
              setDraggable(e);
            }}>
            <img src={ChevronIcon} className={props.isOpen ? "isOpen" : ""} />
          </div>
        )}
        <div className={"styles.labelGridItem"}>
          <div variant="body2">{props.node.text}</div>
        </div>
      </div>
      <div className="box icon-box">
        <img src={CheckIcon} />
        <img src={VisibleIcon} />
        <img src={AvatarIcon} />
        <img src={DotsIcon} draggable-icon={"draggable-icon"} />
      </div>
    </RootNode>
  );
};
