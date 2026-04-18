import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const FAQ = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 my-10 sm:my-16 md:my-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
        Frequently Asked Question (FAQ)
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-center mt-2 sm:mt-4 mb-6 sm:mb-8">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce <br className="hidden sm:block" />
        pain, and strengthen your body with ease!
      </p>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4 sm:mb-5">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-sm sm:text-base">
          How does this posture corrector work?
        </div>
        <div className="collapse-content text-xs sm:text-sm md:text-base">
          A posture corrector works by providing support and gentle alignment to
          your shoulders, back, and spine, encouraging you to maintain proper
          posture throughout the day. Here’s how it typically functions: A
          posture corrector works by providing support and gentle alignment to
          your shoulders.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4 sm:mb-5">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-sm sm:text-base">
          Is it suitable for all ages and body types?
        </div>
        <div className="collapse-content text-xs sm:text-sm md:text-base">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4 sm:mb-5">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-sm sm:text-base">
          Does it really help with back pain and posture improvement?
        </div>
        <div className="collapse-content text-xs sm:text-sm md:text-base">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4 sm:mb-5">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-sm sm:text-base">
          Does it have smart features like vibration alerts?
        </div>
        <div className="collapse-content text-xs sm:text-sm md:text-base">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4 sm:mb-5">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-sm sm:text-base">
          How will I be notified when the product is back in stock?
        </div>
        <div className="collapse-content text-xs sm:text-sm md:text-base">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>

      <div className="flex justify-center items-center my-10">
        <a className="btn btn-outline text-green-500 hover:bg-green-500 hover:text-gray-800 rounded-lg">
          Be a Rider
          <FaArrowRight className=" p-1 text-2xl  rounded-full -rotate-45 cursor-pointer " />
        </a>
        
      </div>
    </div>
  );
};

export default FAQ;
