import { useCallback, useState } from "react";
export const list_to_tree = (list) => {
  let map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].myAddress] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentAddress != null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentAddress]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  return [translate, containerRef];
};

export const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps }) => (
  <g>
    <circle r={15}></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div style={{ border: "1px solid black", borderRadius: "5px", backgroundColor: "#dedede", opacity: "0.8", margin: "0.5rem 0 0 0.5rem" }}>
        <h5 style={{ textAlign: "center" }}>{nodeDatum.myAddress}</h5>
        {nodeDatum.children.length > 0 && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject>
  </g>
);

export const containerStyles = {
  // width: "100vw",
  height: "100vh",
  border: "1px solid black",
};
