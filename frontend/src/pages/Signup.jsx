import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
     <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Create an Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input input-bordered"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value})}
                required
              />
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt">Password must be at least 6 characters</span>
              </label>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          

          
          <div className="text-center mt-6">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Log In
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;