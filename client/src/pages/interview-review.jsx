import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInterview } from "../features/appSlice";
import { difficultyColor, scoreColor } from "../lib/utils";
import LoadingModal from "../components/loading-modal";

function InterviewReview() {
    const dispatch = useDispatch();
    const { interviewId } = useParams();
    const { interview, loading } = useSelector((state) => state.app.interview);

    useEffect(() => {
        if (interviewId) {
            dispatch(fetchInterview(interviewId));
        }
    }, [interviewId]);

    if (!interview) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-white/25 text-[13px]">Loading review...</p>
            </div>
        );
    }

    const { data, questions } = interview;

    const answered = questions?.filter((q) => q.answered_at);
    const unanswered = questions?.filter((q) => !q.answered_at);

    const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", {
        day: "numeric", month: "short", year: "numeric",
    });

    const formatDuration = (start, end) => {
        if (!end) return "In progress";
        const mins = Math.round((new Date(end) - new Date(start)) / 60000);
        return `${mins}m`;
    };

    return (
        <div className="min-h-screen px-6 py-10 lg:px-12 lg:py-12 max-w-3xl">
            <div className="mb-2">
                <p className="text-[11px] text-white/50 tracking-[1.2px] uppercase font-light mb-1">
                    Interview Review
                </p>

                <h1 className="font-display text-[28px] font-medium text-white">
                    {data?.role}
                </h1>
            </div>

            <div className="flex items-center gap-2 mb-10">
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${difficultyColor[data?.difficulty]}`}>
                    {data?.difficulty}
                </span>

                <span className="text-white/20 text-[11px]">·</span>

                <span className="text-[12px] text-white/50">{formatDate(data?.started_at)}</span>

                <span className="text-white/20 text-[11px]">·</span>

                <span className="text-[12px] text-white/50">{formatDuration(data?.started_at, data?.completed_at)}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <div
                    className="flex-1 border border-borderDark rounded-xl p-5 flex flex-col gap-1"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                >
                    <p className="text-[10px] text-white/50 tracking-[0.8px] uppercase">Score</p>
                    <p className={`font-display text-[36px] font-medium leading-none ${data?.score != null ? scoreColor(data?.score) : "text-white/20"}`}>
                        {data?.score ?? "—"}
                        <span className="text-[14px] text-white/40 font-sans ml-1">/100</span>
                    </p>
                </div>

                <div
                    className="flex-1 border border-borderDark rounded-xl p-5 flex flex-col gap-1"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                >
                    <p className="text-[10px] text-white/50 tracking-[0.8px] uppercase">Answered</p>
                    <p className="font-display text-[36px] font-medium leading-none text-white">
                        {answered?.length}
                        <span className="text-[14px] text-white/40 font-sans ml-1">/ {questions?.length}</span>
                    </p>
                </div>

                <div
                    className="flex-1 border border-borderDark rounded-xl p-5 flex flex-col gap-1"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                >
                    <p className="text-[10px] text-white/50 tracking-[0.8px] uppercase">Status</p>
                    <p className={`text-[15px] font-medium mt-2 ${data?.status === "completed" ? "text-emerald-400" : "text-amber-400"}`}>
                        {data?.status === "completed" ? "Completed" : "Incomplete"}
                    </p>
                </div>
            </div>

            {answered?.length > 0 && (
                <div className="mb-10">
                    <p className="text-[11px] text-white/50 tracking-[1.2px] uppercase font-light mb-4">
                        Answered Questions
                    </p>

                    <div className="flex flex-col gap-4">
                        {answered
                            ?.sort((a, b) => a.question_order - b.question_order)
                            ?.map((q) => (
                                <div
                                    key={q.id}
                                    className="border border-borderDark rounded-xl p-5"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <span className="shrink-0 text-[10px] text-white/40 mt-1 w-4">
                                            Q{q.question_order}
                                        </span>

                                        <p className="text-[14px] text-white font-medium leading-relaxed">
                                            {q.question}
                                        </p>
                                    </div>

                                    <div className="ml-7 mb-4">
                                        <p className="text-[10px] text-white/50 tracking-[0.8px] uppercase mb-1.5">Your answer</p>

                                        <p className="text-[13px] text-white/70 leading-relaxed">
                                            {q.answer}
                                        </p>
                                    </div>

                                    {q.feedback && (
                                        <div className={`ml-7 border rounded-lg px-4 py-3
                                            ${q.evaluation_score >= 7
                                                ? "border-emerald-400/20 bg-emerald-400/5"
                                                : q.evaluation_score >= 4
                                                ? "border-amber-400/20 bg-amber-400/5"
                                                : "border-rose-400/20 bg-rose-400/5"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-[10px] tracking-[0.8px] uppercase text-white/30">
                                                    AI Feedback
                                                </p>

                                                {q.evaluation_score != null && (
                                                    <span className={`text-[11px] font-medium
                                                        ${q.evaluation_score >= 7 ? "text-emerald-400"
                                                        : q.evaluation_score >= 4 ? "text-amber-400"
                                                        : "text-rose-400"}`}
                                                    >
                                                        {q.evaluation_score}/10
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-[13px] text-white/55 leading-relaxed">
                                                {q.feedback}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {unanswered?.length > 0 && (
                <div>
                    <p className="text-[11px] text-white/50 tracking-[1.2px] uppercase font-light mb-4">
                        Unanswered Questions
                    </p>

                    <div className="flex flex-col gap-3">
                        {unanswered
                            ?.sort((a, b) => a.question_order - b.question_order)
                            ?.map((q) => (
                                <div
                                    key={q.id}
                                    className="border border-borderDark rounded-xl px-5 py-4 flex items-start gap-3"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <span className="shrink-0 text-[10px] text-white/40 mt-1 w-4">
                                        Q{q.question_order}
                                    </span>

                                    <p className="text-[13px] text-white/80 leading-relaxed">
                                        {q.question}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {loading === 'loading' && <LoadingModal message="Please wait..." />}
        </div>
    );
}

export default InterviewReview;
