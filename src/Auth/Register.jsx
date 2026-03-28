import React, { useState } from 'react';
import Lottie from 'lottie-react';
import loginLottie from '../assets/Lottie/sign up.json';
import { Link, useNavigate } from 'react-router';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useAuth } from '../Hooks/useAuth';
import { toast } from 'react-toastify';

const Register = () => {
    const { registerUser, setUser, updateUserProfile, signInGoogle } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [nameerror, setNameError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        if (name.length < 5) {
            setNameError("Name should be more than 5 characters");
            toast.error("Name should be more than 5 characters")
            return;
        } else {
            setNameError("");
        }

        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        setError("");
        setSuccess(false);

        const length6Pattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

        if (!length6Pattern.test(password)) {
            setError("Password must be 6 characters or longer");
            toast.error("Password must be 6 characters or longer");
            return;
        } else if (!casePattern.test(password)) {
            setError("Password must have at least one uppercase and one lowercase character");
            toast.error("Password must have at least one uppercase and one lowercase character");
            return;
        }

        registerUser(email, password)
            .then((result) => {
                const user = result.user;
                setSuccess(true);
                e.target.reset();
                toast.success("Your SignUp Successful");
                updateUserProfile({
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate("/");
                    })
                    .catch((err) => {
                        toast.error(err.message);
                        setUser(user);
                    });
            })
            .catch((err) => {
                setError(err.message)
                toast.error(err.message);
            });
    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex justify-center items-center max-w-5xl mx-auto min-h-screen gap-8 py-10'>

            <div className='flex-1 flex flex-col justify-center bg-white p-10 rounded-2xl shadow-xl border border-gray-200'>

                <h1 className='text-3xl font-bold text-center mb-3 text-gray-800'>
                    Create Account 61-7 t-3:43
                </h1>

                <p className='text-center text-gray-600 mb-5'>
                    Join <span className='font-semibold text-green-600'>SpeedyParcel</span> today!
                </p>

                <form onSubmit={handleSignUp} className='space-y-3'>

                    {/* Name */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Name</label>
                        <input type="text" name='name'
                            className="input input-class"
                            placeholder="Name" required />
                        {nameerror && (
                            <p className="text-xs text-red-500 mt-1">{nameerror}</p>
                        )}
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Photo URL</label>
                        <input type="file" className="file-input file-choose input-class" />

                        {/* Photo URL */}
                        {/* <input type="url" name='photo'
                            className="input input-class"
                            placeholder="Your Photo URL" required /> */}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Email</label>
                        <input type="email" name='email'
                            className="input input-class"
                            placeholder="Email" required />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Password</label>

                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input input-class"
                                placeholder="Password" required
                            />

                            <button
                                onClick={handleTogglePasswordShow}
                                className='absolute top-2 right-3 text-green-600 text-xl cursor-pointer'>
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                    </div>



                    {/* Register Button */}
                    <button type='submit' className="btn w-full text-gray-800 mt-4 rounded-lg border  font-semibold hover:bg-gray-100 shadow-md bg-gradient-to-r border-green-500 from-green-500 to-green-300 cursor-pointer hover:scale-102 transition-transform">
                        Register
                    </button>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 my-2">
                        <div className="h-px w-16 bg-gray-800"></div>
                        <span className="text-gray-800 text-sm">or</span>
                        <div className="h-px w-16 bg-gray-800"></div>
                    </div>

                    {/* Google Signin */}
                    <button
                        onClick={() => signInGoogle().then(res => {
                            setUser(res.user);
                            toast.success("Google Sign-in successful")
                            navigate("/");
                        })
                            .catch(err => toast.error(err.message))
                        }
                        type='button'
                        className='google-btn'>
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>

                </form>
                {/* Login Link */}
                <p className='text-center text-gray-600 mt-4'>
                    Already have an account?
                    <Link to={`/login`} className='text-green-600 font-semibold hover:underline ml-1'>
                        Login
                    </Link>
                </p>

                {success && (
                    <p className="text-green-500 text-center font-semibold">
                        Account created successfully!
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-center font-semibold">{error}</p>
                )}
            </div>

            {/* Lottie */}
            <div className="flex-1 text-center">
                <Lottie
                    style={{ width: "520px" }}
                    animationData={loginLottie}
                    loop={true}
                />
            </div>

        </div>
    );
};

export default Register;