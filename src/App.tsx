import "./App.css";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar.tsx";

function App() {
  return (
    <div>
        <div className="flex">
            <div className="flex w-full min-w-0 flex-1">
                <Header></Header>
            </div>
            <SideBar></SideBar>
        </div>
    </div>
  )
}

export default App
