import { useAuth } from "../context/auth-context";
import { useSelector } from "react-redux";
import { difficultyColor, formatDate, formatDuration, memberSince, scoreColor } from "../lib/utils";
import { logoutUser } from "../lib/apis";

function Profile() {
    const { user, setUser, setIsAuthenticated } = useAuth();
    const { interviews } = useSelector((state) => state.app.interviews);

    const lastInterview = interviews?.[0] ?? null;

    async function handleLogout() {
        try {
            const response = await logoutUser();

            if (response.status === 200) {
                setUser(null);
                setIsAuthenticated(false);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen px-6 py-10 lg:px-12 lg:py-12 max-w-2xl">
            <div className="mb-10">
                <p className="text-[11px] text-white/70 tracking-[1.2px] uppercase font-light mb-1">
                    Account
                </p>

                <h1 className="font-display text-[28px] font-medium text-white">
                    Profile
                </h1>
            </div>

            <div
                className="border border-borderDark rounded-2xl p-6 mb-4"
                style={{ background: "rgba(255,255,255,0.02)" }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-brandPrimary/20 border border-brandAccent/30 flex items-center justify-center shrink-0">
                        <span className="text-[22px] font-medium text-brandAccent">
                            {user?.name?.charAt(0).toUpperCase() ?? "U"}
                        </span>
                    </div>

                    <div>
                        <p className="text-[18px] font-medium text-white">{user?.name}</p>

                        <p className="text-[13px] text-white/60">{user?.email}</p>
                    </div>
                </div>

                <div className="border-t border-borderDark pt-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <p className="text-[12px] text-white/60">Member since</p>

                        <p className="text-[12px] text-white/85">{memberSince(user?.created_at)}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-[12px] text-white/60">Total interviews</p>

                        <p className="text-[12px] text-white/85">{interviews?.length ?? 0}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-[12px] text-white/60">Avg score</p>

                        <p className="text-[12px] text-white/85">
                            {interviews?.length
                                ? Math.round(interviews.filter(i => i.score != null).reduce((acc, i) => acc + i.score, 0) / interviews.filter(i => i.score != null).length) + " / 100"
                                : "—"
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-[11px] text-white/60 tracking-[1.2px] uppercase font-light mb-3">
                    Last Interview
                </p>

                {!lastInterview ? (
                    <div
                        className="border border-borderDark rounded-xl p-6 text-center"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                        <p className="text-[13px] text-white/60">No interviews yet</p>
                    </div>
                ) : (
                    <div
                        className="border border-borderDark rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-150 hover:border-white/15"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                        <div className="shrink-0 w-14 text-center">
                            <p className={`font-display text-[28px] font-medium leading-none ${lastInterview.score != null ? scoreColor(lastInterview.score) : "text-white/40"}`}>
                                {lastInterview.score ?? "—"}
                            </p>

                            <p className="text-[10px] text-white/25 mt-0.5">/100</p>
                        </div>

                        <div className="w-px h-10 bg-white/6 shrink-0" />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-[14px] font-medium text-white truncate">{lastInterview.role}</p>

                                <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-md border ${difficultyColor[lastInterview.difficulty]}`}>
                                    {lastInterview.difficulty}
                                </span>
                            </div>

                            <p className="text-[12px] text-white/50">
                                {formatDate(lastInterview.started_at)} · {formatDuration(lastInterview.started_at, lastInterview.completed_at)}
                            </p>
                        </div>

                        <button className="cursor-pointer shrink-0 text-[12px] text-brandAccent hover:opacity-75 transition-opacity duration-150">
                            Review →
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-6 border-t border-borderDark">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[13px] text-rose-400/70 hover:text-rose-400 transition-colors duration-150 cursor-pointer"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign out
                </button>
            </div>

        </div>
    );
}

export default Profile;
