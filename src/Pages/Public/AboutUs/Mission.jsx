import React from "react";

const Mission = () => {
  return (
    <div className="mt-6 md:mt-10 space-y-5 text-sm md:text-base leading-relaxed md:leading-loose text-gray-700">

      <p>
        Our mission is to simplify the way people send and receive parcels by
        providing a fast, reliable, and user-friendly delivery experience. We
        aim to eliminate the common frustrations of delayed shipments and lack
        of transparency by offering real-time tracking and efficient logistics
        solutions. Every step we take is focused on making delivery services
        more accessible and stress-free for individuals and businesses alike.
      </p>

      <p>
        We are committed to building a system where trust and reliability come
        first. By leveraging modern technology and a dedicated team, we ensure
        that every parcel is handled with care and delivered on time. Our goal
        is not just to move packages from one place to another, but to create a
        seamless experience that customers can depend on every single day.
      </p>

      <p>
        Looking ahead, we strive to continuously improve and expand our
        services to meet the evolving needs of our users. Innovation, customer
        satisfaction, and operational excellence are at the heart of everything
        we do. Our mission is to become a leading delivery solution that people
        trust, rely on, and choose again and again.
      </p>

      <ul className="list-disc pl-5 space-y-1">
        <li>Customer satisfaction is our top priority</li>
        <li>Fast and reliable delivery service</li>
        <li>Transparency in every step</li>
        <li>Continuous innovation</li>
      </ul>

      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="font-semibold text-blue-700">
          Our Core Mission
        </p>
        <p className="text-sm text-gray-600 mt-1">
          To make parcel delivery faster, smarter, and more reliable for everyone.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 text-center">
        <div className="p-3 bg-gray-50 rounded border">
          <p className="font-bold text-indigo-600">Speed</p>
        </div>
        <div className="p-3 bg-gray-50 rounded border">
          <p className="font-bold text-green-600">Trust</p>
        </div>
        <div className="p-3 bg-gray-50 rounded border">
          <p className="font-bold text-blue-600">Safety</p>
        </div>
        <div className="p-3 bg-gray-50 rounded border">
          <p className="font-bold text-yellow-600">Growth</p>
        </div>
      </div>

    </div>

  );
};

export default Mission;