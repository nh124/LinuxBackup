import { React, useState } from "react";
import NodeTraversal from "./Components/NodeTraversal.tsx";
import linkedList from "./Algorithms/linklist.js";
import { gsap } from "gsap";

const ll = new linkedList();
const App = () => {
  const [inputNode, setInputNode] = useState(null);
  const [nodes, setNodes] = useState([]);

  const deleteLastNode = () => {
    ll.deleteLast();
    console.log(ll.display());
    let newList = ll.display();
    setNodes(newList);
    gsap.from(".box", {
      opacity: 1,
      x: 20,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nodes.length <= 14) {
      ll.add(inputNode);
      console.log(ll.display(), inputNode);
      setNodes(ll.display());
      setInputNode("");
    } else {
      alert("max has been reached");
    }
  };
  const onChange = (event) => {
    setInputNode(event.target.value);
  };
  return (
    <div className="w-full h-screen bg-slate-200 flex justify-center items-center flex-col">
      <form action="" onSubmit={handleSubmit}>
        <label>
          Enter Node:
          <input type="number" value={inputNode} onChange={onChange} />
        </label>
        <input type="submit" className="hover:cursor-pointer" />
      </form>
      <button onClick={deleteLastNode}>Delete</button>
      <NodeTraversal nodes={nodes} />

      {/* <Test /> */}
    </div>
  );
};

export default App;
