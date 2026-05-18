import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
    formatDate,
} from "../lib/utils";

function QuestionBanks() {
    const { questions } = useSelector(
        (state) => state.app.questions
    );

    const [selectedInterview, setSelectedInterview] =
        useState(null);

    const groupedQuestions = useMemo(() => {
        if (!questions) return {};

        return questions.reduce((acc, question) => {
            if (!acc[question.interview_id]) {
                acc[question.interview_id] = [];
            }

            acc[question.interview_id].push(question);

            return acc;
        }, {});
    }, [questions]);

    const interviewIds = Object.keys(groupedQuestions);

    return (
        <div className="min-h-screen px-6 py-10 lg:px-12 lg:py-12">
            <div className="mb-10">
                <p className="text-[11px] text-white/50 tracking-[1.2px] uppercase font-light mb-1">
                    Practice
                </p>

                <h1 className="font-display text-[28px] font-medium text-white">
                    Question Banks
                </h1>
            </div>

            {!questions || questions.length === 0 ? (
                <div
                    className="border border-borderDark rounded-2xl p-16 text-center"
                    style={{
                        background:
                            "rgba(255,255,255,0.02)",
                    }}
                >
                    <p className="text-[14px] text-white/40">
                        No question banks available
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                    <div
                        className="border border-borderDark rounded-2xl p-3 h-fit"
                        style={{
                            background:
                                "rgba(255,255,255,0.02)",
                        }}
                    >
                        <p className="text-[11px] text-white/40 tracking-[1px] uppercase mb-3 px-2">
                            Interviews
                        </p>

                        <div className="flex flex-col gap-2">
                            {interviewIds.map((id, index) => {
                                const bank =
                                    groupedQuestions[id];

                                const firstQuestion =
                                    bank[0];

                                return (
                                    <button
                                        key={id}
                                        onClick={() =>
                                            setSelectedInterview(
                                                id
                                            )
                                        }
                                        className={`w-full text-left rounded-xl border px-4 py-3 transition-all duration-150 ${
                                            selectedInterview ===
                                            id
                                                ? "border-brandAccent/40 bg-brandPrimary/10"
                                                : "border-borderDark hover:border-white/10"
                                        }`}
                                    >
                                        <p className="text-[13px] text-white font-medium mb-1">
                                            Interview{" "}
                                            {index + 1}
                                        </p>

                                        <p className="text-[12px] text-white/40">
                                            {
                                                bank.length
                                            }{" "}
                                            Questions
                                        </p>

                                        <p className="text-[11px] text-white/25 mt-2">
                                            {formatDate(
                                                firstQuestion.created_at
                                            )}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div
                        className="border border-borderDark rounded-2xl p-5"
                        style={{
                            background:
                                "rgba(255,255,255,0.02)",
                        }}
                    >
                        <p className="text-[11px] text-white/40 tracking-[1px] uppercase mb-3 px-2">
                            questions
                        </p>

                        {!selectedInterview ? (
                            <div className="h-full flex items-center justify-center text-center min-h-[400px]">
                                <p className="text-[14px] text-white/35">
                                    Select an interview
                                    to view questions
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {groupedQuestions[
                                    selectedInterview
                                ]
                                    .sort(
                                        (a, b) =>
                                            a.question_order -
                                            b.question_order
                                    )
                                    .map((q) => (
                                        <div
                                            key={q.id}
                                            className="border border-borderDark rounded-xl p-5"
                                        >
                                            <div className="flex items-center justify-between gap-4 mb-3">
                                                <p className="text-[11px] uppercase tracking-[1px] text-white/30">
                                                    Question{" "}
                                                    {
                                                        q.question_order
                                                    }
                                                </p>

                                                {q.evaluation_score !=
                                                    null && (
                                                    <span className="text-[11px] px-2 py-1 rounded-md border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                                                        {
                                                            q.evaluation_score
                                                        }
                                                        /10
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-[14px] leading-relaxed text-white/85">
                                                {
                                                    q.question
                                                }
                                            </p>

                                            {q.answer && (
                                                <div className="mt-5 pt-5 border-t border-borderDark">
                                                    <p className="text-[11px] uppercase tracking-[1px] text-white/30 mb-2">
                                                        Your
                                                        Answer
                                                    </p>

                                                    <p className="text-[13px] text-white/65 leading-relaxed">
                                                        {
                                                            q.answer
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {q.feedback && (
                                                <div className="mt-4 rounded-lg border border-brandAccent/10 bg-brandPrimary/5 px-4 py-3">
                                                    <p className="text-[11px] uppercase tracking-[1px] text-brandAccent/60 mb-1">
                                                        AI
                                                        Feedback
                                                    </p>

                                                    <p className="text-[13px] text-white/70">
                                                        {
                                                            q.feedback
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionBanks;