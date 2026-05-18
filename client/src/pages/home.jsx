import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { DIFFICULTIES, ROLES } from "../lib/statics";
import { Link, useNavigate } from "react-router-dom";
import { difficultyColor, formatDate, formatDuration, greeting, scoreColor } from "../lib/utils";
import { resumeInterview, startInterview } from '../lib/apis';
import { useDispatch, useSelector } from "react-redux";
import { setInterviewInfo, setQuestions } from "../features/interviewSlice";
import { addInterviewToList, updateInterviewInfo } from "../features/appSlice";
import LoadingModal from "../components/loading-modal";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { interviews } = useSelector((state) => state.app.interviews);

    const { user } = useAuth();

    const [role, setRole] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [loading, setLoading] = useState(false);
    const [field, setField] = useState("");
    
    const canStart = role && difficulty;

    async function handleStartInterview() {
        try {
            setLoading(true);
            const response = await startInterview(
                {
                    role: role,
                    difficulty: difficulty
                }
            );

            if(response.status === 200) {
                dispatch(setInterviewInfo(response.data.interview));
                dispatch(addInterviewToList(response.data.interview));
                dispatch(setQuestions(response.data.questions));
                navigate('/interview');
            }
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleResumeInterview(interviewId) {
        try {
            setLoading(true);
            const response = await resumeInterview(interviewId);

            if(response.status === 200) {
                dispatch(setInterviewInfo(response.data.interview));
                dispatch(updateInterviewInfo(response.data.interview));
                dispatch(setQuestions(response.data.questions));
                navigate('/interview');
            }
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen px-6 py-10 lg:px-12 lg:py-12">
            <div className="mb-10">
                <p className="text-[11px] text-white/30 tracking-[1.2px] uppercase font-light mb-1">
                    {greeting()}
                </p>

                <h1 className="font-display text-[28px] font-medium text-white leading-tight">
                    {user?.name ? `${user.name.split(" ")[0]}, ready to practice?` : "Ready to practice?"}
                </h1>
            </div>

            <div className="mb-12">
                <p className="text-[11px] text-white/30 tracking-[1.2px] uppercase font-light mb-4">
                    Quick Start
                </p>

                <div className="border border-borderDark rounded-2xl p-6 lg:p-8"
                    style={{ background: "rgba(255,255,255,0.02)" }}>

                    <h2 className="font-display text-[20px] font-medium text-white mb-1">
                        Start an interview now
                    </h2>

                    <p className="text-[13px] text-white/40 font-light mb-8">
                        Choose a role and difficulty to begin your session.
                    </p>

                    <div className="mb-6">
                        <label className="block text-[11px] font-medium text-white/40 tracking-[0.7px] uppercase mb-4">
                            Field
                        </label>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {Object.keys(ROLES).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => {
                                        setField(f);
                                        setRole("");
                                        setDifficulty("");
                                    }}
                                    className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-[13px] font-medium border transition-all duration-150
                                        ${
                                            field === f
                                                ? "bg-brandPrimary/15 border-brandAccent/40 text-brandAccent"
                                                : "bg-transparent border-borderDark text-white/50 hover:text-white hover:border-white/20"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {field && (
                            <>
                                <label className="block text-[11px] font-medium text-white/40 tracking-[0.7px] uppercase mb-4">
                                    Role
                                </label>

                                <div className="flex flex-wrap gap-2">
                                    {ROLES[field].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRole(r)}
                                            className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-[13px] font-medium border transition-all duration-150
                                                ${
                                                    role === r
                                                        ? "bg-brandPrimary/15 border-brandAccent/40 text-brandAccent"
                                                        : "bg-transparent border-borderDark text-white/50 hover:text-white hover:border-white/20"
                                                }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="block text-[11px] font-medium text-white/40 tracking-[0.7px] uppercase mb-3">
                            Difficulty
                        </label>

                        <div className="flex gap-2">
                            {DIFFICULTIES.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDifficulty(d)}
                                    className={`cursor-pointer px-5 py-1.5 rounded-lg text-[13px] font-medium border transition-all duration-150
                                        ${difficulty === d
                                            ? difficultyColor[d]
                                            : "bg-transparent border-borderDark text-white/50 hover:text-white hover:border-white/20"
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={handleStartInterview} 
                        disabled={!canStart} 
                        className="h-11 cursor-pointer px-8 rounded-lg bg-brandPrimary text-white text-[14px] font-medium tracking-[0.2px] transition-all duration-150 hover:bg-brandHover active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Start Interview
                        <span className="ml-2 opacity-70">→</span>
                    </button>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[11px] text-white/30 tracking-[1.2px] uppercase font-light">
                        Recent Sessions
                    </p>

                    <Link to="/history" className="text-[12px] text-brandAccent hover:opacity-75 transition-opacity duration-150 no-underline">
                        View all
                    </Link>
                </div>

                {interviews?.length === 0 ? (
                    <div className="border border-borderDark rounded-2xl p-10 flex flex-col items-center justify-center text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <p className="text-white/30 text-[14px] mb-1">No sessions yet</p>

                        <p className="text-white/20 text-[12px]">Complete your first interview above to see it here.</p>
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
                        style={{ scrollbarWidth: "none" }}>
                        {interviews?.map((s) => (
                            <div
                                key={s.id}
                                className="shrink-0 w-64 border border-borderDark rounded-xl p-5 flex flex-col gap-4 transition-all duration-150 hover:border-white/15 cursor-pointer"
                                style={{ background: "rgba(255,255,255,0.02)" }}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-[13px] font-medium text-white leading-snug">{s.role}</p>

                                    <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-md border ${difficultyColor[s.difficulty]}`}>
                                        {s.difficulty}
                                    </span>
                                </div>

                                <div>
                                    <p className={`font-display text-[28px] font-medium leading-none ${s.score != null ? scoreColor(s.score) : "text-white/20"}`}>
                                        {s.score != null ? s.score : "—"}
                                    </p>

                                    <p className="text-[10px] text-white/25 mt-0.5">/100</p>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <p className="text-[11px] text-white/30"><p className="text-[12px] text-white/30">
                                        {formatDate(s.started_at)} · {formatDuration(s.started_at, s.completed_at)}
                                    </p></p>

                                    {
                                        s.status === 'abandoned' ? 
                                        <button onClick={() => handleResumeInterview(s.id)} className="text-[12px] text-brandAccent hover:opacity-75 transition-opacity duration-150">
                                            Resume →
                                        </button> :
                                        <button className="text-[12px] text-brandAccent hover:opacity-75 transition-opacity duration-150">
                                            Review →
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {loading && <LoadingModal message="Please wait while we load your interview..." />}
        </div>
    );
}

export default Home;
