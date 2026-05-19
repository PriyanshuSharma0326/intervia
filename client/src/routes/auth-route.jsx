import React from 'react'
import { Outlet } from 'react-router-dom';
import MeshBackground from '../components/mesh-background';

function AuthRoute() {
    return (
        <div className="min-h-screen w-full bg-darkPanel relative flex items-center justify-center overflow-hidden">
            <MeshBackground />
            
            <Outlet />
        </div>
    );
}

export default AuthRoute;
