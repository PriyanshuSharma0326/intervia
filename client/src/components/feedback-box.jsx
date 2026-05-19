function FeedbackBox({ feedback, score }) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-borderDark bg-white/30 p-4">
            <p className="text-[11px] uppercase tracking-widest text-white/80">
                Evaluation
            </p>

            {feedback ? (
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-white/50 text-sm">
                            Score:
                        </span>

                        <span className="text-white font-semibold">
                            {score}/10
                        </span>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed">
                        {feedback}
                    </p>
                </div>
            ) : (
                <p className="text-white/40 text-sm">
                    Submit your answer to get evaluation.
                </p>
            )}
        </div>
    );
}

export default FeedbackBox;
