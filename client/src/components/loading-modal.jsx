function LoadingModal({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-darkPanel/60">
            <div className="flex flex-col items-center gap-5">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-brandAccent/15" />

                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brandAccent animate-spin" />
                </div>

                <div className="font-display text-lg font-semibold text-white tracking-[-0.4px]">
                    Prep2<span className="text-brandAccent">Win</span>
                </div>

                <p className="text-[13px] text-textOnDarkMuted font-light tracking-wide">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default LoadingModal;
