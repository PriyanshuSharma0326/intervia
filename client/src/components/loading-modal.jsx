function LoadingModal({ message = "Generating suggestions..." }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 backdrop-blur-sm bg-darkPanel/80">
            <div className="relative w-[90px] h-[90px]" role="status" aria-label="Loading">
                <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
                    <defs>
                        <linearGradient id="sparkle-grad-lg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%"   stopColor="#a5b4fc" />

                            <stop offset="50%"  stopColor="#a78bfa" />

                            <stop offset="100%" stopColor="#e879f9" />
                        </linearGradient>

                        <linearGradient id="sparkle-grad-md" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%"   stopColor="#c4b5fd" />

                            <stop offset="100%" stopColor="#f0abfc" />
                        </linearGradient>

                        <linearGradient id="sparkle-grad-xs" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%"   stopColor="#ddd6fe" />

                            <stop offset="100%" stopColor="#f5d0fe" />
                        </linearGradient>
                    </defs>
                </svg>

                <div style={{
                    position: 'absolute',
                    width: 62, height: 62,
                    left: 4, bottom: 4,
                    transformOrigin: 'center',
                    animation: 'sparkle-lg 1.4s cubic-bezier(0.45,0,0.55,1) infinite',
                }}>
                    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
                        <path
                            d="M50 4 C50 4 56 44 96 50 C56 56 50 96 50 96 C50 96 44 56 4 50 C44 44 50 4 50 4Z"
                            fill="url(#sparkle-grad-lg)"
                        />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    width: 34, height: 34,
                    right: 2, top: 4,
                    transformOrigin: 'center',
                    animation: 'sparkle-md 1.4s cubic-bezier(0.45,0,0.55,1) infinite',
                    animationDelay: '0.15s',
                }}>
                    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
                        <path
                            d="M50 4 C50 4 56 44 96 50 C56 56 50 96 50 96 C50 96 44 56 4 50 C44 44 50 4 50 4Z"
                            fill="url(#sparkle-grad-md)"
                        />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    width: 18, height: 18,
                    right: 8, bottom: 12,
                    transformOrigin: 'center',
                    animation: 'sparkle-xs 1.4s cubic-bezier(0.45,0,0.55,1) infinite',
                    animationDelay: '',
                }}>
                    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
                        <path
                            d="M50 4 C50 4 56 44 96 50 C56 56 50 96 50 96 C50 96 44 56 4 50 C44 44 50 4 50 4Z"
                            fill="url(#sparkle-grad-xs)"
                        />
                    </svg>
                </div>
            </div>

            <p className="text-[13px] text-textOnDarkMuted font-light tracking-widest" style={{ animation: 'sparkle-label 2.4s ease-in-out infinite' }}>
                {message}
            </p>
        </div>
    );
}

export default LoadingModal;
