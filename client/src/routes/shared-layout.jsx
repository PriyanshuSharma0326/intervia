import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function SharedLayout() {
    return (
        <div className="min-h-screen bg-darkPanel">
            <Sidebar />

            <main className="lg:pl-60 pb-20 lg:pb-0">
                <Outlet />
            </main>
        </div>
    );
}

export default SharedLayout;
