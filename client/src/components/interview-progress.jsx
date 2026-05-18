function InterviewProgress({ questions, currentIndex }) {
    const totalQuestions = questions?.length ?? 0;

    return (
        <div className="flex items-center justify-between text-[12px] text-white/30">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>

            <div className="flex gap-1">
                {questions.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 w-2 sm:w-4 lg:w-6 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white/60" : i < currentIndex ? "bg-white/20" : "bg-white/10"}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default InterviewProgress;
