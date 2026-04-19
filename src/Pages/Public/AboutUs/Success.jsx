import React from "react";
import { FaBoxOpen, FaUsers, FaTruck, FaSmile } from "react-icons/fa";

const Success = () => {
  return (
    <div className="mt-6 md:mt-10 space-y-8 text-sm md:text-base leading-relaxed md:leading-loose text-gray-700">
      
      {/* PARAGRAPHS */}
      <div className="space-y-5">
        <p>
          Our success is built on trust, consistency, and a relentless focus on
          customer satisfaction. Over the years, we have successfully delivered
          thousands of parcels across different regions, ensuring speed and
          reliability in every step. What started as a small initiative has now
          grown into a dependable delivery solution that people rely on daily.
        </p>

        <p>
          Behind every successful delivery is a dedicated team working tirelessly
          to ensure smooth operations. From efficient logistics planning to
          real-time tracking, we have continuously improved our system to provide
          a seamless experience. Our riders, support team, and technology work
          together to make sure every parcel reaches safely and on time.
        </p>

        <p>
          We measure our success not just by numbers, but by the satisfaction of
          our customers. Every positive feedback, every returning user, and every
          successful delivery motivates us to do even better. As we grow, we
          remain committed to maintaining the same level of trust, quality, and
          excellence that brought us here.
        </p>
      </div>

      {/* SUCCESS STATS 🔥 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 bg-gray-50 rounded-xl border text-center">
          <FaBoxOpen className="text-2xl text-indigo-600 mx-auto mb-2" />
          <p className="text-lg font-bold">10K+</p>
          <p className="text-xs text-gray-500">Parcels Delivered</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border text-center">
          <FaUsers className="text-2xl text-blue-600 mx-auto mb-2" />
          <p className="text-lg font-bold">5K+</p>
          <p className="text-xs text-gray-500">Happy Customers</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border text-center">
          <FaTruck className="text-2xl text-green-600 mx-auto mb-2" />
          <p className="text-lg font-bold">200+</p>
          <p className="text-xs text-gray-500">Active Riders</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border text-center">
          <FaSmile className="text-2xl text-yellow-500 mx-auto mb-2" />
          <p className="text-lg font-bold">99%</p>
          <p className="text-xs text-gray-500">Satisfaction Rate</p>
        </div>

      </div>

    </div>
  );
};

export default Success;