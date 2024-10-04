import React from "react";
import video from "../assets/video.mp4";

const Signup = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-full flex justify-center items-center">
        <video src={video} autoPlay loop muted></video>
      </div>

      <div className="w-1/2 h-full flex flex-col justify-center items-center relative">
        <div className="absolute text-right flex right-0 top-0 items-center m-4 gap-3">
          <h1 className="text-xl font-semibold">Already have an account?</h1>
          <button className="text-xl font-semibold rounded-lg px-4 py-2 border-2 cursor-pointer active:scale-110 transition-transform duration-200 ">
            SIGN IN
          </button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-3xl font-semibold text-black">
              Welecome to
            </span>
            <h1 className="text-4xl font-semibold text-cyan-600">Scratch</h1>
          </div>
          <div>
            <span className="text-xl font-semibold">Create an account</span>
          </div>

          <div className="m-2">
            <form
              action=""
              className="flex flex-col justify-center items-center gap-2"
            >
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-2 rounded-lg outline-none border border-cyan-800"
              />
              <input
                type="text"
                placeholder="User Name"
                className="px-4 py-2 rounded-lg outline-none border border-cyan-800"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded-lg outline-none border border-cyan-800"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 rounded-lg outline-none border border-cyan-800"
              />
              <button className="text-xm font-semibold rounded-lg px-4 py-2 m-4 active:bg-white active:border active:border-cyan-500 active:text-cyan-500 active:scale-110  duration-200 transition-transform bg-cyan-500 text-white">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
