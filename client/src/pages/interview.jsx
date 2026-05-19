import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import AppLogo from '../assets/AppLogo.svg';
import { CrossIcon, MicIcon } from "../lib/icons";
import { difficultyColor } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { abandonInterview, submitAnswer, submitInterview } from "../lib/apis";
import { updateQuestionObject } from "../features/interviewSlice";
import { updateInterviewInfo } from "../features/appSlice";
import QuestionBox from "../components/question-box";
import InterviewProgress from "../components/interview-progress";
import FeedbackBox from "../components/feedback-box";
import LoadingModal from "../components/loading-modal";

function Interview() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { interview, questions } = useSelector((state) => state.interview);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const recognitionRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const currentQuestion = questions?.[currentIndex];
    const totalQuestions = questions?.length ?? 0;

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setSpeechSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event) => {
                let transcript = "";
                for (let i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setAnswer(transcript);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    function toggleMic() {
        if (!recognitionRef.current) return;
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    function handleNext() {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((i) => i + 1);
            setAnswer("");
            if (isRecording) {
                recognitionRef.current?.stop();
                setIsRecording(false);
            }
        }
    };

    function handlePrev() {
        if (currentIndex > 0) {
            setCurrentIndex((i) => i - 1);
            setAnswer("");
            if (isRecording) {
                recognitionRef.current?.stop();
                setIsRecording(false);
            }
        }
    };

    function handleChange(e) {
        setAnswer(e.target.value);
    }

    function handleFocus() {
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    }

    async function handleAbandonInterview() {
        try {
            setLoading(true);
            const response = await abandonInterview(interview?.id);

            if(response.status === 200) {
                dispatch(updateInterviewInfo(response.data.interview));
                navigate('/');
            }
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    } 

    async function handleSubmitAnswer() {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
        }

        if(currentQuestion.evaluation_score) return;

        try {
            const response = await submitAnswer({
                question: currentQuestion.question,
                answer: answer,
            }, currentQuestion.id);

            if(response.status === 200) {
                dispatch(updateQuestionObject(response.data.interview_question));
            }
        }
        catch(err) {
            console.log(err);
        }
    };

    async function handleSubmitInterview() {
        try {
            const totalScore = questions.reduce(
                (total, question) => {
                    return total + (question.evaluation_score || 0);
                },
                0
            );

            const response = await submitInterview({ score: totalScore }, interview.id);

            if(response.status === 200) {
                dispatch(updateInterviewInfo(response.data.interview));
                navigate('/history');
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(currentQuestion && currentQuestion.answer) {
            setAnswer(currentQuestion.answer);
        }
    }, [currentQuestion]);

    return (
        <div className="min-h-screen w-full bg-darkPanel relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                }}
            />

            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-borderDark">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-40 h-auto">
                        <img src={AppLogo} alt="" />
                    </div>

                    <span className="text-white/20 text-sm hidden sm:block">·</span>

                    <span className="text-[12px] text-white/40 truncate hidden sm:block">{interview?.role}</span>

                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border shrink-0 ${difficultyColor[interview?.difficulty]}`}>
                        {interview?.difficulty}
                    </span>
                </div>

                <button
                    onClick={handleAbandonInterview}
                    className="cursor-pointer shrink-0 flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white transition-colors duration-150 ml-3"
                >
                    <CrossIcon />
                    <span className="hidden sm:inline">End interview</span>
                    <span className="sm:hidden">End</span>
                </button>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-57px)] px-6 py-10">
                {totalQuestions === 0 ? (
                    <p className="text-white/20 text-[14px]">No questions available.</p>
                ) : (
                    <div className="w-full max-w-2xl flex flex-col gap-6">
                        <InterviewProgress 
                            questions={questions} 
                            currentIndex={currentIndex} 
                        />

                        <QuestionBox text={currentQuestion?.question} />

                        <div className="rounded-xl border border-borderDark bg-white/30 overflow-hidden">
                            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-borderDark">
                                <p className="text-[11px] uppercase tracking-widest text-white/80">Your Answer</p>
                                {speechSupported && (
                                    <button
                                        onClick={toggleMic}
                                        className={`flex items-center gap-1.5 text-[12px] px-3 py-1 rounded-md border transition-all duration-200 ${
                                            isRecording
                                                ? "border-red-500/50 text-red-400 bg-red-500/10 animate-pulse"
                                                : "border-borderDark text-white/60 hover:text-white hover:border-white/20 cursor-pointer"
                                        }`}
                                    >
                                        <MicIcon isRecording={isRecording} />
                                        {isRecording ? "Stop" : "Speak"}
                                    </button>
                                )}
                            </div>

                            <textarea 
                                disabled={currentQuestion.evaluation_score ? true : false} 
                                value={answer}
                                onChange={handleChange} 
                                onFocus={handleFocus}
                                placeholder="Type your answer here, or click Speak to use your microphone..."
                                rows={6}
                                className="w-full bg-transparent text-white/80 text-[14px] leading-relaxed px-4 py-3 resize-none outline-none placeholder:text-white/40"
                            />
                        </div>

                        <FeedbackBox 
                            feedback={currentQuestion?.feedback} 
                            score={currentQuestion.evaluation_score} 
                        />

                        <div className="flex items-center justify-between">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="cursor-pointer text-[13px] text-white/70 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-150"
                            >
                                ← Previous
                            </button>
                            
                            <div className="flex items-center gap-2">
                                <button onClick={handleSubmitAnswer} className={`text-[13px] px-4 py-2 rounded-lg ${!currentQuestion.evaluation_score ? 'bg-white hover:bg-white/90 cursor-pointer' : 'bg-green-500'}  text-darkPanel font-medium`}>
                                    {currentQuestion.evaluation_score ? 'Answer submitted' : 'Submit Answer'}
                                </button>

                                {currentIndex === totalQuestions - 1 ? (
                                    <button
                                        onClick={handleSubmitInterview}
                                        className="text-[13px] px-4 py-2 rounded-lg bg-white text-darkPanel font-medium hover:bg-white/90 transition-all duration-150 cursor-pointer"
                                    >
                                        {questions.length < 10 ? 'Submit Answer' : 'Finish Interview'} →
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="text-[13px] px-4 py-2 rounded-lg bg-white/10 border border-borderDark text-white/70 hover:bg-white/20 hover:text-white transition-all duration-150 cursor-pointer"
                                    >
                                        Next question →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {loading && <LoadingModal message="Please wait..." />}
            </div>
        </div>
    );
}

export default Interview;
