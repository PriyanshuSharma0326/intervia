import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { loginUser } from "../../lib/apis";
import { isValidEmail } from "../../lib/utils";
import { useAuth } from "../../context/auth-context";
import LoadingModal from "../../components/loading-modal";
import AppLogo from '../../assets/AppLogo.svg';
import { useDispatch } from "react-redux";
import { fetchInterviews } from "../../features/appSlice";

function Login() {
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser, setIsAuthenticated } = useAuth();

    const defaultFormInputs = { email: "", password: "" };

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

    async function handleLogin() {
        const validationErrors = {};

        if(!form.email) {
            validationErrors.email = 'Email is required';
        }
        if(!isValidEmail(form.email)) {
            validationErrors.email = 'Invalid Email';
        }
        if(!form.password) {
            validationErrors.password = 'Password is required';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setFormErrors(defaultFormInputs);

        try {
            setLoading(true);
            const response = await loginUser(form);
            
            if(response.status === 200) {
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

            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="relative z-10 hidden lg:flex w-full max-w-220 min-h-140 rounded-[20px] overflow-hidden border border-borderDark shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
                <div className="relative flex flex-1 flex-col justify-between p-12 overflow-hidden bg-darkPanel">
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

                    <div className="relative z-10 h-15">
                        <img className="h-full" src={AppLogo} alt="" />
                    </div>

                    <div className="relative z-10">
                        <h1 className="font-display text-[32px] font-medium text-white leading-[1.3] mb-6">
                            Land your dream role<br />with <em className="text-brandAccent italic">confidence</em>
                        </h1>

                        <ul className="flex flex-col gap-3 list-none m-0 p-0">
                            {[
                                "Real-time AI feedback on your answers",
                                "200+ curated question banks by role",
                                "Mock interviews with scoring",
                                "Track your improvement over time",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-[13px] text-textOnDarkMuted font-light">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brandAccent opacity-70 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative z-10 text-[11px] text-textSecondary tracking-[0.5px]">
                        intervia · Powered by AI
                    </div>
                </div>

                <div className="w-105 shrink-0 bg-pageBg flex flex-col justify-center px-11 py-10 border-l border-borderDark">
                    <p className="font-display text-[26px] font-medium text-textPrimary mb-1">Welcome back</p>

                    <p className="text-[13px] text-textSecondary font-light mb-8">Sign in to continue your prep</p>

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
                        error={formErrors.email} 
                    />

                    <Input
                        label="Password"
                        placeholder="••••••••"
                        value={form.password} 
                        name="password" 
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        showToggle
                        showPass={showPass}
                        onToggle={() => setShowPass(!showPass)} 
                        error={formErrors.password} 
                    />

                    <div className="text-right mb-6">
                        <Link to="/auth/forgot-password" className="text-[12px] text-brandAccent no-underline hover:opacity-75 transition-opacity duration-150">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mb-6 hover:bg-brandHover active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <p className="text-center text-[13px] text-textSecondary">
                        New here?{" "}
                        <Link to="/auth/register" className="text-brandAccent no-underline font-medium hover:opacity-75 transition-opacity duration-150">
                            Create a free account
                        </Link>
                    </p>
                </div>
            </div>

            <div className="relative z-10 lg:hidden w-full max-w-100 px-6 py-12">
                <div className="mb-8 h-15">
                    <img className="h-full" src={AppLogo} alt="" />
                </div>

                <p className="font-display text-[26px] font-medium text-white mb-1">Welcome back</p>

                <p className="text-[13px] text-textOnDarkMuted font-light mb-8">Sign in to continue your prep</p>

                {error && (
                    <div className="bg-errorBg border border-errorBorder text-errorText text-[13px] px-3.5 py-2.5 rounded-lg mb-4">
                        {error}
                    </div>
                )}

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
                    placeholder="••••••••" 
                    name="password" 
                    value={form.password} 
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    showToggle
                    showPass={showPass}
                    onToggle={() => setShowPass(!showPass)} 
                    error={formErrors.password} 
                />

                <div className="text-right mb-6">
                    <Link to="/auth/forgot-password" className="text-[12px] text-brandAccent no-underline hover:opacity-75 transition-opacity duration-150">
                        Forgot password?
                    </Link>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full h-11 rounded-lg border-none bg-brandPrimary text-white text-[14px] font-medium cursor-pointer tracking-[0.2px] transition-all duration-150 mb-6 hover:bg-brandHover active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-center text-[13px] text-textOnDarkMuted">
                    New here?{" "}
                    <Link to="/auth/register" className="text-brandAccent no-underline font-medium hover:opacity-75 transition-opacity duration-150">
                        Create a free account
                    </Link>
                </p>
            </div>

            {loading && <LoadingModal message="Signing in..." />}
        </>
    );
}

export default Login;
