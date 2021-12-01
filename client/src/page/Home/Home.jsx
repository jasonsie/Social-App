import "./Home.css";
import Header from "../../component/Header/Header.jsx";
import SideBar from "../../component/SideBar/SideBar.jsx";
import Feed from "../../component/Feed/Feed.jsx";
import RightBar from "../../component/RightBar/RightBar.jsx";

export default function Home() {
    return (
        <>
            <Header />
            <div className="homeContainer">
                <SideBar profile={null}/>
                <Feed username={null}/>
                <RightBar userId={null} profile={null} />
            </div>
        </>
    );
}


