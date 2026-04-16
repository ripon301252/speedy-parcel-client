import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { motion } from 'framer-motion';

const ParcelTracking = () => {
    const { trackingId } = useParams();
    const axiosParcelTracking = useAxiosPublic();

    const { data: trackings = [], isLoading } = useQuery({
        queryKey: ["tracking", trackingId],
        queryFn: async () => {
            const res = await axiosParcelTracking.get(`/trackings/${trackingId}/logs`)
            return res.data;
        }
    })

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 rounded-2xl shadow-lg mb-6">
                <h1 className="text-xl md:text-2xl font-bold">
                    📦 Track your package
                </h1>
                <p className="text-sm mt-1 opacity-90 break-all">
                    Tracking ID: {trackingId}
                </p>
                <p className="text-sm mt-1">
                    Total Updates: {trackings.length}
                </p>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-green-400 ml-3">
                {trackings.map((log, index) => (
                    <motion.div
                        key={log._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-6 ml-4"
                    >
                        {/* Dot */}
                        <span className="absolute -left-2.5 flex items-center justify-center w-5 h-5 bg-green-500 rounded-full ring-4 ring-green-200"></span>

                        {/* Card */}
                        <div className="bg-base-100 shadow-md rounded-xl p-4 border border-green-100">
                            <h3 className="font-semibold text-green-600 capitalize">
                                {log.status.replaceAll("_", " ")}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                {new Date(log.createdAt).toLocaleString("en-BD", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {trackings.length === 0 && (
                <div className="text-center mt-10 text-gray-500">
                    No tracking updates found.
                </div>
            )}
        </div>
    );
};

export default ParcelTracking;
