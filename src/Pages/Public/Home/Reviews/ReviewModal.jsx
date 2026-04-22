import React, { useState, useEffect } from 'react';
// import { FaRegWindowClose } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../Hooks/useAuth';

const ReviewModal = ({ closeModal }) => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        userName: '',
        user_email: '',
        designation: '',
        review: '',
        ratings: 0,
        user_photoURL: ''
    });

    const [loading, setLoading] = useState(false);

    // ⭐ যদি user লগইন থাকে, তার ডেটা default set করা
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                userName: user.displayName || '',
                user_email: user.email || '',
                user_photoURL: user.photoURL || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // ⭐ Star rating handler
    const handleRating = (rate) => {
        setFormData({ ...formData, ratings: rate });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const reviewData = {
            ...formData,
            date: new Date().toISOString()
        };

        try {
            const res = await fetch('https://speedy-parcel-server-1.onrender.com/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            await res.json();

            toast.success("Review Added Successfully");

            setFormData({
                userName: user?.displayName || '',
                user_email: user?.email || '',
                designation: '',
                review: '',
                ratings: 0,
                user_photoURL: user?.photoURL || ''
            });

            closeModal();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-3xl w-[440px] shadow-2xl animate-scaleIn"
            >
                <div className=" mb-4">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2 mt-5">Create Review</h2>
                    <p className='text-gray-800 text-center text-sm mb-6'>Please share your Review</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Name */}
                    <input
                        type="text"
                        name="userName"
                        placeholder="Your Name"
                        value={formData.userName}
                        onChange={handleChange}
                        className="input input-bordered input-class text-gray-800 "
                        required
                        disabled={!!user} // লগইন থাকলে editable না
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="user_email"
                        placeholder="Your Email"
                        value={formData.user_email}
                        onChange={handleChange}
                        className="input input-bordered input-class text-gray-800 "
                        required
                        disabled={!!user}
                    />

                    {/* Designation */}
                    <input
                        type="text"
                        name="designation"
                        placeholder="Your Designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="input input-bordered input-class text-gray-800 "
                    />

                    {/* Photo URL */}
                    <input
                        type="text"
                        name="user_photoURL"
                        placeholder="Photo URL"
                        value={formData.user_photoURL}
                        onChange={handleChange}
                        className="input input-bordered input-class text-gray-800 "
                        disabled={!!user} // লগইন থাকলে edit disabled
                    />

                    {/* ⭐ Rating */}
                    <div>
                        <p className="text-sm mb-1 text-gray-800">Your Rating</p>
                        <div className="flex gap-1 text-2xl cursor-pointer">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    className={`${star <= formData.ratings ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500 transition-colors`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Review */}
                    <textarea
                        name="review"
                        placeholder="Write your review..."
                        value={formData.review}
                        onChange={handleChange}
                        className="textarea textarea-bordered text-gray-800 input-class h-24"
                        required
                    ></textarea>

                    <div className='flex justify-between items-center gap-3 mt-3 mb-3'>
                        <div className='flex-1'>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn w-full text-gray-800 bg-linear-to-r from-green-500 via-green-400 to-green-500 border border-green-400 cursor-pointer hover:scale-102 transition-transform shadow-none rounded-lg"
                            >
                                {loading ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>

                        <div className='flex-1'>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="btn btn-outline w-full text-gray-800  hover:bg-green-500 hover:border-green-500 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;