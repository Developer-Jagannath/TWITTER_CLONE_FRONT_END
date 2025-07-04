import { useForm } from "react-hook-form";
import InputUI from "@/components/ui/InputUI";
import ButtonUI from "@/components/ui/ButtonUI";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { registerThunk } from "@/features";
import { emailValidation, passwordValidation, usernameValidation } from "@/utils/inputValidation";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Twitter, Eye, EyeOff } from "lucide-react";

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useAppSelector((state) => state.reducer.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showError, setShowError] = useState(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
    });

    const password = watch("password");

    const onSubmit = (data: RegisterFormValues) => {
        setShowError(true); // Show error again when submitting
        // Remove confirmPassword before sending to API
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...registerData } = data;
        dispatch(registerThunk(registerData));
    };

    useEffect(() => {
        if (user) {
            navigate("/"); // redirect to home after registration
        }
    }, [user, navigate]);

    // Auto-hide error after 8 seconds (increased from 5)
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Show error when it changes
    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
                {/* Logo and Header */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-full mb-3 sm:mb-4">
                        <Twitter className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                        Create your account
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-sm mx-auto">
                        Join Twitter Clone and start sharing your thoughts.
                    </p>
                </div>

                {/* Register Card */}
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 lg:space-y-6">
                            {/* Username Field */}
                            <div className="space-y-1.5 sm:space-y-2">
                                <InputUI
                                    label="Username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="h-10 sm:h-11 lg:h-12 px-3 sm:px-4 text-sm sm:text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    {...register("username", usernameValidation)}
                                    error={errors.username?.message}
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-1.5 sm:space-y-2">
                                <InputUI
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-10 sm:h-11 lg:h-12 px-3 sm:px-4 text-sm sm:text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    {...register("email", emailValidation)}
                                    error={errors.email?.message}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5 sm:space-y-2">
                                <div className="relative">
                                    <InputUI
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        className="h-10 sm:h-11 lg:h-12 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                        {...register("password", passwordValidation)}
                                        error={errors.password?.message}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-1.5 sm:space-y-2">
                                <div className="relative">
                                    <InputUI
                                        label="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        className="h-10 sm:h-11 lg:h-12 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) => 
                                                value === password || "Passwords do not match"
                                        })}
                                        error={errors.confirmPassword?.message}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && showError && (
                                <ErrorDisplay 
                                    error={error} 
                                    onClose={handleCloseError}
                                    className="animate-in slide-in-from-top-2 duration-300"
                                />
                            )}

                            {/* Register Button */}
                            <ButtonUI 
                                type="submit" 
                                loading={loading} 
                                className="w-full h-10 sm:h-11 lg:h-12 text-sm sm:text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </ButtonUI>

                            {/* Divider */}
                            <div className="relative my-4 sm:my-5 lg:my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 sm:px-3 text-gray-500">Or</span>
                                </div>
                            </div>

                            {/* Login Link */}
                            <div className="text-center">
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link 
                                        to="/login" 
                                        className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-6 sm:mt-8 lg:mt-10">
                    <p className="text-xs sm:text-sm text-gray-500 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                        By creating an account, you agree to our{" "}
                        <a href="#" className="text-blue-500 hover:text-blue-600">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="text-blue-500 hover:text-blue-600">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage; 