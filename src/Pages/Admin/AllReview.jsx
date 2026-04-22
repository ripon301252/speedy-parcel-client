import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const res = await fetch(
                    "https://speedy-parcel-server-1.onrender.com/reviews"
                );
                const data = await res.json();
                setReviews(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        loadReviews();
    }, []);

    // ✅ delete with sweetalert
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(
                        `https://speedy-parcel-server-1.onrender.com/reviews/${id}`,
                        {
                            method: "DELETE",
                        }
                    );
                    const data = await res.json();

                    if (data.deletedCount > 0) {
                        setReviews(reviews.filter((review) => review._id !== id));

                        // ✅ success alert
                        Swal.fire("Deleted!", "Review has been deleted.", "success");
                    }
                } catch (err) {
                    console.log(err.message);
                }
            }
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">
                All Reviews: {reviews.length}
            </h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            {/* <th>Email</th> */}
                            <th>Designation</th>
                            {/* <th>Review</th> */}
                            <th>Rating</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review._id}>
                                <th>{index + 1}</th>

                                <td className="flex items-center gap-2">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={review.user_photoURL} alt="" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>{review.userName}</div>
                                        <div>{review.user_email}</div>
                                    </div>
                                </td>

                                {/* <td>{review.user_email}</td> */}
                                <td>{review.designation}</td>

                                {/* <td className="max-w-xs truncate">
                                    {review.review}
                                </td> */}

                                <td>
                                    <div className="badge badge-warning flex">
                                        <span>⭐</span>
                                        {review.ratings}
                                    </div>
                                </td>

                                <td>
                                    {new Date(review.date).toLocaleDateString()}
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReview;