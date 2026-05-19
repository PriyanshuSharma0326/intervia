import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import MeshBackground from "../components/mesh-background";

function SharedLayout() {
    return (
        <div className="min-h-screen bg-darkPanel">
            <Sidebar />

            <div className="opacity-60">
                <MeshBackground />
            </div>

            <main className="lg:pl-60 pb-20 lg:pb-0">
                <Outlet />
            </main>
        </div>
    );
}

export default SharedLayout;
