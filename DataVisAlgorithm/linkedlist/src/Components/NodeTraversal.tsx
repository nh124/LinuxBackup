import { React, useLayoutEffect, useRef } from "react";
import Linkedlist from "./Linkedlist.tsx";
import Node from "./Node.tsx";

let arr = [1, 2, 3, 4, 5];
const NodeTraversal = ({ nodes }) => {
  return (
    <div className="w-full h-[80%] border bottom-3 border-black flex flex-col justify-start items-center py-6 px-4">
      <div className="flex flex-row">
        {nodes.map((value, index) => {
          return <Node key={index} node={value} />;
        })}
      </div>
    </div>
  );
};

export default NodeTraversal;
