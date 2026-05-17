function Input({ label, name, type = "text", placeholder, value, onChange, onKeyDown, showToggle, showPass, onToggle, error }) {
    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <label className="block text-[11px] font-medium tracking-[0.7px] uppercase mb-1.5
                    text-textSecondary lg:text-textSecondary
                    max-lg:text-white/60">
                    {label}
                </label>

                <p className="text-errorText text-[13px]">{error}</p>
            </div>

            <div className="relative">
                <input
                    name={name}
                    type={showToggle ? (showPass ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    className="w-full h-11 rounded-lg text-[14px] px-3.5 outline-none transition-all duration-150
                        border
                        lg:bg-surfaceInput lg:border-borderDefault lg:text-textPrimary lg:placeholder:text-textSecondary/50
                        lg:hover:border-borderHover
                        lg:focus:border-brandAccent lg:focus:shadow-[0_0_0_3px_rgba(129,140,248,0.14)] lg:focus:bg-white
                        max-lg:bg-white/8 max-lg:border-white/25 max-lg:text-white max-lg:placeholder:text-white/25
                        max-lg:hover:border-white/35
                        max-lg:focus:border-brandAccent max-lg:focus:shadow-[0_0_0_3px_rgba(129,140,248,0.14)] max-lg:focus:bg-white/12"
                />

                {showToggle && (
                    <button
                        onClick={onToggle}
                        aria-label="Toggle password visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer flex items-center justify-center transition-colors duration-150
                            lg:text-textSecondary lg:hover:text-textPrimary
                            max-lg:text-white/50 max-lg:hover:text-white"
                    >
                        {showPass ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Input;
