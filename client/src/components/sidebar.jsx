import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import AppLogo from '../assets/AppLogo.svg';
import { NAV_LINKS } from "../lib/statics";

function Sidebar() {
    const { user } = useAuth();

    return (
        <>
            <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-60 bg-darkPanel border-r border-borderDark z-40">
                <div className="px-6 py-3 border-b border-borderDark shrink-0">
                    <img src={AppLogo} alt="" />
                </div>

                <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                    {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end
                            className={({ isActive }) =>
                                `flex outline-none items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 no-underline
                                ${isActive
                                    ? "bg-brandPrimary/15 text-brandAccent"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                }`
                            }
                        >
                            <Icon />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-4 py-4 border-t border-borderDark shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brandPrimary/20 border border-brandAccent/30 flex items-center justify-center shrink-0">
                            <span className="text-[12px] font-medium text-brandAccent">
                                {user?.name?.charAt(0).toUpperCase() ?? "U"}
                            </span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-white truncate">{user?.name ?? "User"}</p>

                            <p className="text-[11px] text-white/35 truncate">{user?.email ?? ""}</p>
                        </div>
                    </div>
                </div>
            </aside>

            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-darkPanel border-t border-borderDark flex items-center justify-around px-2 py-2">
                {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg transition-all duration-150 no-underline
                            ${isActive ? "text-brandAccent" : "text-white/40 hover:text-white"}`
                        }
                    >
                        <Icon />
                        <span className="text-[10px] font-medium tracking-wide">{label}</span>
                    </NavLink>
                ))}
            </nav>
        </>
    );
}

export default Sidebar;
