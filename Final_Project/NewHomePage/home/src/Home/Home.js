import BodyPanel from "./components/RightPannel/BodyPanel";
import LeftPanel from "./components/LeftPanel/LeftPanel";
function Home() {
  return (
    <div className="w-full h-screen flex flex-row">
      <LeftPanel />
      <BodyPanel />
    </div>
  );
}

export default Home;
