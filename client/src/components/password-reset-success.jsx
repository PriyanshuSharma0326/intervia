import { Link } from "react-router-dom";
import MeshBackground from "./mesh-background";

function PasswordResetSuccess() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-darkPanel/60">
            <MeshBackground />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm">
                <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center mb-6">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h1 className="font-display text-[28px] font-medium text-white mb-3">
                    Password reset
                </h1>

                <p className="text-[13px] text-white/60 font-light leading-relaxed mb-8">
                    Your password has been reset successfully. You can now sign in with your new password.
                </p>

                <Link
                    to="/auth/login"
                    className="w-full h-11 rounded-lg bg-brandPrimary text-white text-[14px] font-medium tracking-[0.2px] transition-all duration-150 hover:bg-brandHover active:scale-[0.98] no-underline flex items-center justify-center"
                >
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}

export default PasswordResetSuccess;