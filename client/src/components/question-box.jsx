import ReactMarkdown from "react-markdown";

function QuestionBox({ text }) {
    return (
        <div className="rounded-xl border border-borderDark bg-white/30 p-6">
            <p className="text-[11px] uppercase tracking-widest text-white/80 mb-3">Question</p>

            <div className="prose prose-invert max-w-none text-white">
                <ReactMarkdown
                    components={{
                        p: ({ children }) => (
                            <p className="mb-4">
                                {children}
                            </p>
                        ),

                        strong: ({ children }) => (
                            <strong className="font-semibold text-white">
                                {children}
                            </strong>
                        ),

                        li: ({ children }) => (
                            <li className="ml-5 list-decimal mb-2">
                                {children}
                            </li>
                        ),
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default QuestionBox;
