import { useDispatch, useSelector } from "react-redux";
import { difficultyColor, formatDate, formatDuration, scoreColor } from "../lib/utils";
import { resumeInterview } from "../lib/apis";
import { updateInterviewInfo } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { setInterviewInfo, setQuestions } from "../features/interviewSlice";
import LoadingModal from '../components/loading-modal';
import { useState } from "react";

function History() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { interviews } = useSelector((state) => state.app.interviews);
    const [loading, setLoading] = useState(false);

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
                    Your activity
                </p>

                <h1 className="font-display text-[28px] font-medium text-white">
                    Interview History
                </h1>
            </div>

            {!interviews || interviews.length === 0 ? (
                <div className="border border-borderDark rounded-2xl p-16 flex flex-col items-center justify-center text-center"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                >
                    <div className="w-10 h-10 rounded-full bg-brandPrimary/10 border border-brandAccent/20 flex items-center justify-center mb-4">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8">
                            <polyline points="12 8 12 12 14 14" />
                            <path d="M3.05 11a9 9 0 1 0 .5-4.5" />
                            <polyline points="3 3 3 7 7 7" />
                        </svg>
                    </div>

                    <p className="text-white/40 text-[14px] mb-1">No interviews yet</p>

                    <p className="text-white/20 text-[12px]">Complete your first session to see it here.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {interviews?.map((interview) => (
                        <div
                            key={interview.id}
                            className="border border-borderDark rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-150 hover:border-white/15 cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.02)" }}
                        >
                            <div className="shrink-0 w-14 text-center">
                                <p className={`font-display text-[28px] font-medium leading-none ${interview.score != null ? scoreColor(interview.score) : "text-white/40"}`}>
                                    {interview.score != null ? interview.score : "—"}
                                </p>

                                <p className="text-[10px] text-white/50 mt-0.5">/100</p>
                            </div>

                            <div className="w-px h-10 bg-white/6 shrink-0" />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-[14px] font-medium text-white truncate">{interview.role}</p>

                                    <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-md border ${difficultyColor[interview.difficulty]}`}>
                                        {interview.difficulty}
                                    </span>

                                    {interview.status !== "completed" && (
                                        <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-md border text-amber-400 bg-amber-400/10 border-amber-400/20">
                                            Incomplete
                                        </span>
                                    )}
                                </div>

                                <p className="text-[12px] text-white/50">
                                    {formatDate(interview.started_at)} · {formatDuration(interview.started_at, interview.completed_at)}
                                </p>
                            </div>

                            {
                                interview.status === 'abandoned' ? 
                                <button onClick={() => handleResumeInterview(interview.id)} className="cursor-pointer shrink-0 text-[12px] text-brandAccent hover:opacity-75 transition-opacity duration-150">
                                    Resume Interview →
                                </button> : 
                                    <button className="shrink-0 text-[12px] cursor-pointer text-brandAccent hover:opacity-75 transition-opacity duration-150">
                                    Review →
                                </button>
                            }
                        </div>
                    ))}
                </div>
            )}

            {loading && <LoadingModal message="Please wait. We are loading your interview..." />}
        </div>
    );
}

export default History;
