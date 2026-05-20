import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import AppLogo from '../../assets/AppLogo.svg';
import { checkEmailExists, resetPassword } from "../../lib/apis";
import { isValidEmail } from "../../lib/utils";
import PasswordResetSuccess from "../../components/password-reset-success";
import LoadingModal from "../../components/loading-modal";

function ForgotPassword() {
    const defaultFormData = { email: "", password: "", confirmPassword: "" }

    const [form, setForm] = useState(defaultFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [resetDone, setResetDone] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleVerifyEmail() {
        if(!form.email) {
            setEmailError("Email is required");
            return;
        }
        if(!isValidEmail(form.email)) {
            setEmailError("Invalid Email");
            return;
        }

        try {
            setLoading(true);
            setEmailError("");
            const response = await checkEmailExists({ email: form.email });

            if(response.status === 200) {
                setEmailVerified(true);
                if(error) {
                    setError("");
                }
            }
        }
        catch(err) {
            setError(
                err.response?.data?.message ||
                "Email verification failed"
            );
        }
        finally {
            setLoading(false);
        }
    };

    async function handleResetPassword() {
        if(!form.password) {
            setPasswordError('Password is required');
            return;
        }
        if(!form.confirmPassword) {
            setPasswordError('Enter your password again');
            return;
        }
        if(form.password !== form.confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            setEmailError("");
            setConfirmPasswordError("");
            const response = await resetPassword(form);

            if(response.status === 200) {
                setResetDone(true);
                setForm({ email: "", password: "", confirmPassword: "" });
            }
        }
        catch(err) {
            setError(
                err.response?.data?.message ||
                "Failed to reset password"
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-darkPanel relative flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                }}
            />

            <div
                className="absolute w-[320px] h-80 rounded-full pointer-events-none -bottom-15 -right-20"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 68%)" }}
            />

            <div className="relative z-10 hidden lg:flex w-full max-w-220 min-h-120 rounded-[20px] overflow-hidden border border-borderDark shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
                <div className="relative flex flex-1 flex-col justify-between p-12 overflow-hidden bg-darkPanel">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                            backgroundSize: "36px 36px",
                        }}
                    />

                    <div
                        className="absolute w-[320px] h-80 rounded-full pointer-events-none -top-15 -left-20"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 68%)" }}
                    />

                    <div className="relative z-10 h-15">
                        <img className="h-full" src={AppLogo} alt="" />
                    </div>

                    <div className="relative z-10">
                        <h1 className="font-display text-[32px] font-medium text-white leading-[1.3] mb-3">
                            Forgot your<br />password?
                        </h1>

                        <p className="text-[13px] text-white/40 font-light leading-relaxed">
                            No worries. We will help you to reset it.
                        </p>
                    </div>

                    <div className="relative z-10 text-[11px] text-white/20 tracking-[0.5px]">
                        intervia.io · Powered by AI
                    </div>
                </div>

                <div className="w-105 shrink-0 bg-pageBg flex flex-col justify-center px-11 py-10 border-l border-borderDark">
                    <p className="font-display text-[26px] font-medium text-textPrimary mb-1">Reset password</p>

                    <p className="text-[13px] text-textSecondary font-light mb-8">
                        {emailVerified ? 'Enter your new password.' : 'Please verify your email address'}
                    </p>

                    {error && (
                        <div className="bg-errorBg border border-errorBorder text-errorText text-[13px] px-3.5 py-2.5 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email} 
                        disabled={emailVerified} 
                        onChange={handleChange} 
                        error={emailError} 
                        onKeyDown={(e) => e.key === "Enter" && handleVerifyEmail()}
                    />

                    {
                        emailVerified && 
                        <>
                            <Input
                                label="Password" 
                                name="password"
                                placeholder="Min. 8 characters"
                                value={form.password}
                                onChange={handleChange}
                                showToggle
                                showPass={showPass}
                                onToggle={() => setShowPass(!showPass)} 
                                error={passwordError} 
                            />

                            <Input
                                label="Confirm password" 
                                name="confirmPassword"
                                placeholder="Re-enter password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                                showToggle
                                showPass={showConfirm}
                                onToggle={() => setShowConfirm(!showConfirm)} 
                                error={confirmPasswordError} 
                            />
                        </>
                    }

                    {
                        emailVerified ? 
                        <button
                            onClick={handleResetPassword}
                            className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mt-2 mb-6 hover:bg-brandHover active:scale-[0.98]"
                        >
                            Reset password
                        </button> : 
                        <button
                            onClick={handleVerifyEmail}
                            className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mt-2 mb-6 hover:bg-brandHover active:scale-[0.98]"
                        >
                            Verify Email
                        </button>
                    }

                    <p className="text-center text-[13px] text-textSecondary">
                        Remembered it?{" "}
                        <Link to="/auth/login" className="text-brandAccent no-underline font-medium hover:opacity-75 transition-opacity duration-150">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            <div className="relative z-10 lg:hidden w-full max-w-100 px-6 py-12">
                <div className="mb-8 h-15">
                    <img className="h-full" src={AppLogo} alt="" />
                </div>

                <p className="font-display text-[26px] font-medium text-white mb-1">Reset password</p>

                <p className="text-[13px] text-white/40 font-light mb-8">
                    We'll send a reset link to your inbox.
                </p>

                {error && (
                    <div className="bg-errorBg border border-errorBorder text-errorText text-[13px] px-3.5 py-2.5 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange} 
                    disabled={emailVerified} 
                    error={emailError} 
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyEmail()}
                />

                {
                    emailVerified && 
                    <>
                        <Input
                            label="Password" 
                            name="password"
                            placeholder="Min. 8 characters"
                            value={form.password}
                            onChange={handleChange}
                            showToggle
                            showPass={showPass}
                            onToggle={() => setShowPass(!showPass)} 
                            error={passwordError} 
                        />

                        <Input
                            label="Confirm password" 
                            name="confirmPassword"
                            placeholder="Re-enter password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                            showToggle
                            showPass={showConfirm}
                            onToggle={() => setShowConfirm(!showConfirm)} 
                            error={confirmPasswordError} 
                        />
                    </>
                }

                {
                    emailVerified ? 
                    <button
                        onClick={handleResetPassword}
                        className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mt-2 mb-6 hover:bg-brandHover active:scale-[0.98]"
                    >
                        Reset password
                    </button> : 
                    <button
                        onClick={handleVerifyEmail}
                        className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mt-2 mb-6 hover:bg-brandHover active:scale-[0.98]"
                    >
                        Verify Email
                    </button>
                }

                <p className="text-center text-[13px] text-white/40">
                    Remembered it?{" "}
                    <Link to="/auth/login" className="text-brandAccent no-underline font-medium hover:opacity-75 transition-opacity duration-150">
                        Sign in
                    </Link>
                </p>
            </div>

            {resetDone && <PasswordResetSuccess />}

            {loading && <LoadingModal message="Please wait..." />}
        </div>
    );
}

export default ForgotPassword;
