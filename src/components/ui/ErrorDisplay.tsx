import React from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorDisplayProps {
    error: string;
    onClose?: () => void;
    className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClose, className = "" }) => {
    // Function to make error messages more user-friendly
    const getUserFriendlyMessage = (errorMessage: string): string => {
        const errorMap: Record<string, string> = {
            "Invalid email or password": "The email or password you entered is incorrect. Please try again.",
            "User not found": "No account found with this email address. Please check your email or create a new account.",
            "Email already exists": "An account with this email already exists. Please try signing in instead.",
            "Username already taken": "This username is already taken. Please choose a different one.",
            "Password too weak": "Please choose a stronger password with at least 6 characters.",
            "Invalid email format": "Please enter a valid email address.",
            "Network error": "Connection failed. Please check your internet connection and try again.",
            "Server error": "Something went wrong on our end. Please try again in a moment.",
            "Login failed": "Unable to sign in. Please check your credentials and try again.",
            "Registration failed": "Unable to create account. Please try again.",
            "Passwords do not match": "The passwords you entered don't match. Please try again.",
        };

        // Check for exact matches first
        if (errorMap[errorMessage]) {
            return errorMap[errorMessage];
        }

        // Check for partial matches
        const lowerError = errorMessage.toLowerCase();
        if (lowerError.includes("email")) {
            return "Please check your email address and try again.";
        }
        if (lowerError.includes("password")) {
            return "Please check your password and try again.";
        }
        if (lowerError.includes("network") || lowerError.includes("connection")) {
            return "Connection failed. Please check your internet connection and try again.";
        }
        if (lowerError.includes("server") || lowerError.includes("500")) {
            return "Something went wrong on our end. Please try again in a moment.";
        }

        // Default fallback
        return errorMessage;
    };

    const friendlyMessage = getUserFriendlyMessage(error);

    return (
        <div className={`relative p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-red-800 mb-1">
                        Something went wrong
                    </h3>
                    <p className="text-sm text-red-700 leading-relaxed">
                        {friendlyMessage}
                    </p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Close error message"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorDisplay; 