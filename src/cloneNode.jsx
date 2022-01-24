import React from "react";

export const CloneNode = ({ item, clientOffset }) => {
  const [dragPreview, setDragPreview] = React.useState({
    id: null,
    html: null,
  });

  let element = dragPreview;

  if (!element.id || (element && element.id !== item.id)) {
    if (item.ref.current) {
      item.ref.current.style.transform = `translate(${-clientOffset.x}px, ${
        -54 / 2
      }px)`; // height node element
    }
    element = {
      id: item.id,
      html: item.ref.current.outerHTML.replace("hide", "**"),
    };
    setDragPreview(element);
  } else {
    if (item.ref.current) {
      item.ref.current.style.transform = `initial`;
    }
  }

  return <div dangerouslySetInnerHTML={{ __html: element.html }} />;
};
