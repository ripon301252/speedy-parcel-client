import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ismpp5l",
        "template_d6w3243",
        formRef.current,
        "5VmMzxI_WOZfotIti"
      )
      .then(
        () => {
          toast.success("Message sent successfully ✅");
          e.target.reset();
        },
        (error) => {
          toast.error("Failed to send ❌");
          console.log(error);
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Get in Touch</h1>
          <p className="text-sm md:text-base mt-2 opacity-90">
            We’d love to hear from you. Send us a message anytime.
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 md:p-10">

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className="w-full border text-gray-800 pl-10 pr-3 py-3 rounded-xl input-class"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className="w-full border text-gray-800 pl-10 pr-3 py-3 rounded-xl input-class"
                required
              />
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <FaCommentDots className="absolute top-3.5 left-3 text-gray-400" />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                className="w-full border text-gray-800 pl-10 pr-3 py-3 rounded-xl input-class"
                required
              ></textarea>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Send Message
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;