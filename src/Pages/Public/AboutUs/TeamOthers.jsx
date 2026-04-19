import React from "react";
import { FaUsers, FaHandsHelping, FaUserTie } from "react-icons/fa";

const TeamOthers = () => {
  return (
    <div className="mt-6 md:mt-10 space-y-8 text-sm md:text-base leading-relaxed md:leading-loose text-gray-700">

      {/* INTRO PARAGRAPHS */}
      <div className="space-y-5">

        <p>
          Behind every successful delivery is a dedicated team working with
          passion and responsibility. Our organization is built on collaboration,
          where every member — from developers to riders — plays a vital role in
          ensuring smooth and reliable service. We believe that teamwork is the
          foundation of excellence, and we value every individual who contributes
          to our mission.
        </p>

        <p>
          Our support and operations teams work around the clock to ensure that
          customers receive the best possible experience. Whether it is handling
          urgent deliveries, solving customer issues, or improving system
          performance, we always prioritize efficiency and care. Every challenge
          is an opportunity for us to grow stronger together.
        </p>

        <p>
          We also focus on building a positive work culture where innovation,
          respect, and growth are encouraged. Our team is not just a workforce —
          it is a family that shares a common goal of making delivery services
          smarter, faster, and more reliable for everyone.
        </p>

      </div>

      {/* TEAM VALUES CARDS 🔥 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 bg-gray-50 border rounded-xl text-center hover:shadow-md transition">
          <FaUsers className="text-2xl text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold">Teamwork</h3>
          <p className="text-xs text-gray-500 mt-1">
            We work together to achieve common goals.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border rounded-xl text-center hover:shadow-md transition">
          <FaHandsHelping className="text-2xl text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold">Support</h3>
          <p className="text-xs text-gray-500 mt-1">
            Always ready to help customers and teammates.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border rounded-xl text-center hover:shadow-md transition">
          <FaUserTie className="text-2xl text-indigo-600 mx-auto mb-2" />
          <h3 className="font-semibold">Professionalism</h3>
          <p className="text-xs text-gray-500 mt-1">
            We maintain quality and responsibility in every task.
          </p>
        </div>

      </div>

    </div>
  );
};

export default TeamOthers;