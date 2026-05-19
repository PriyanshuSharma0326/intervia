import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import MeshBackground from "../components/mesh-background";

function SharedLayout() {
    return (
        <div className="min-h-screen w-full bg-darkPanel relative">
            <Sidebar />

            <div className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none">
                <MeshBackground />
            </div>

            <main className="relative z-10 lg:pl-60 min-h-screen pb-20 lg:pb-0">
                <Outlet />
            </main>
        </div>
    );
}

export default SharedLayout;
