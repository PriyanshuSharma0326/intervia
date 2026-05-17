import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const HomeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const BankIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
);

const HistoryIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="12 8 12 12 14 14" />
        <path d="M3.05 11a9 9 0 1 0 .5-4.5" />
        <polyline points="3 3 3 7 7 7" />
    </svg>
);

const NAV_LINKS = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/banks", label: "Question Banks", icon: BankIcon },
    { to: "/history", label: "History", icon: HistoryIcon },
];

function Sidebar() {
    const { user } = useAuth();

    return (
        <>
            <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-60 bg-darkPanel border-r border-borderDark z-40">
                <div className="px-6 py-6 border-b border-borderDark shrink-0">
                    <span className="font-display text-xl font-semibold text-white tracking-[-0.4px]">
                        Prep2<span className="text-brandAccent">Win</span>
                    </span>

                    <div className="text-[10px] text-white/30 tracking-[1.2px] uppercase font-light mt-0.5">
                        AI Interview Coach
                    </div>
                </div>

                <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                    {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 no-underline
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
