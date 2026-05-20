import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { registerUser } from "../../lib/apis";
import { useAuth } from "../../context/auth-context";
import { isValidEmail } from "../../lib/utils";
import LoadingModal from "../../components/loading-modal";
import AppLogo from '../../assets/AppLogo.svg';

function Register() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser, setIsAuthenticated } = useAuth();

    const defaultFormInputs = { name: "", email: "", password: "", confirmPassword: "" };

    const [form, setForm] = useState(defaultFormInputs);
    const [formErrors, setFormErrors] = useState(defaultFormInputs);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    async function handleRegister() {
        const validationErrors = {};

        if(!form.name) {
            validationErrors.name = 'Name is required';
        }
        if(!form.email) {
            validationErrors.email = 'Email is required';
        }
        if(!isValidEmail(form.email)) {
            validationErrors.email = 'Invalid Email';
        }
        if(!form.password) {
            validationErrors.password = 'Password is required';
        }
        if(!form.confirmPassword) {
            validationErrors.confirmPassword = 'Enter your password again';
        }
        if(form.password !== form.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setFormErrors(defaultFormInputs);

        try {
            setLoading(true);

            const body = {
                name: form.name,
                email: form.email,
                password: form.password,
            }

            const response = await registerUser(body);

            if(response.status === 201) {
                setUser(response.data.data);
                setIsAuthenticated(true);
                setForm(defaultFormInputs);
                navigate('/');
            }
        }
        catch(err) {
            setError(
                err.response?.data?.message ||
                "Login failed"
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="relative z-10 hidden lg:flex w-full max-w-220 min-h-150 rounded-[20px] overflow-hidden border border-borderDark shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
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
                        <h1 className="font-display text-[32px] font-medium text-white leading-[1.3] mb-6">
                            Start your journey<br />to your <em className="text-brandAccent italic">next role</em>
                        </h1>

                        <ul className="flex flex-col gap-3 list-none m-0 p-0">
                            {[
                                "Free to get started, no credit card needed",
                                "Personalized AI coaching from day one",
                                "Practice with real interview questions",
                                "Get hired faster with smarter prep",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-[13px] text-textOnDarkMuted font-light">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brandAccent opacity-70 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative z-10 text-[11px] text-textSecondary tracking-[0.5px]">
                        intervia.io · Powered by AI
                    </div>
                </div>

                <div className="w-105 shrink-0 bg-pageBg flex flex-col justify-center px-11 py-10 border-l border-borderDark">
                    <p className="font-display text-[26px] font-medium text-textPrimary mb-1">Create account</p>

                    <p className="text-[13px] text-textSecondary font-light mb-8">Free forever. No credit card required.</p>

                    {error && (
                        <div className="bg-errorBg border border-errorBorder text-errorText text-[13px] px-3.5 py-2.5 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Full name"
                        placeholder="John Doe" 
                        name="name"
                        value={form.name}
                        onChange={handleChange} 
                        error={formErrors.name} 
                    />

                    <Input
                        label="Email"
                        type="email" 
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange} 
                        error={formErrors.email} 
                    />

                    <Input
                        label="Password" 
                        name="password"
                        placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={handleChange}
                        showToggle
                        showPass={showPass}
                        onToggle={() => setShowPass(!showPass)} 
                        error={formErrors.password} 
                    />

                    <Input
                        label="Confirm password" 
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                        showToggle
                        showPass={showConfirm}
                        onToggle={() => setShowConfirm(!showConfirm)} 
                        error={formErrors.confirmPassword} 
                    />

                    <button onClick={handleRegister} disabled={loading}
                        className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mb-6 hover:bg-brandHover active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed">
                        {loading ? "Creating account..." : "Create account"}
                    </button>

                    <p className="text-center text-[13px] text-textSecondary">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-brandAccent no-underline font-medium hover:opacity-75 transition-opacity duration-150">Sign in</Link>
                    </p>
                </div>
            </div>

            <div className="relative z-10 lg:hidden w-full max-w-100 px-6 py-12">
                <div className="mb-8 h-15">
                    <img className="h-full" src={AppLogo} alt="" />
                </div>

                <p className="font-display text-[26px] font-medium text-white mb-1">Create account</p>

                <p className="text-[13px] text-textOnDarkMuted font-light mb-8">Free forever. No credit card required.</p>

                {error && (
                    <div className="bg-errorBg border border-errorBorder text-errorText text-[13px] px-3.5 py-2.5 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <Input
                    label="Full name"
                    placeholder="John Doe" 
                    name="name"
                    value={form.name}
                    onChange={handleChange} 
                    error={formErrors.name} 
                />

                <Input
                    label="Email"
                    type="email" 
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange} 
                    error={formErrors.email} 
                />

                <Input
                    label="Password" 
                    name="password"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    showToggle
                    showPass={showPass}
                    onToggle={() => setShowPass(!showPass)} 
                    error={formErrors.password} 
                />

                <Input
                    label="Confirm password" 
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                    showToggle
                    showPass={showConfirm}
                    onToggle={() => setShowConfirm(!showConfirm)} 
                    error={formErrors.confirmPassword} 
                />

                <button onClick={handleRegister} disabled={loading}
                    className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mb-6 hover:bg-brandHover active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed">
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <p className="text-center text-[13px] text-textOnDarkMuted">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-brandAccent no-underline font-medium hover:opacity-75 transition-opacity duration-150">Sign in</Link>
                </p>
            </div>

            {loading && <LoadingModal message="Creating your account..." />}
        </>
    );
}

export default Register;
