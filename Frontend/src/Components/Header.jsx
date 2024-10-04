import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="w-screen h-16">
      <div className="w-full h-full  border-b-2 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">StyleVault</h1>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-6 list-none">
            <li className="text-xl font-semibold cursor-pointer hover:opacity-45">
              Men
            </li>
            <li className="text-xl font-semibold cursor-pointer hover:opacity-45">
              Women
            </li>
            <li className="text-xl font-semibold cursor-pointer hover:opacity-45">
              Kids
            </li>

            <li className="text-xl font-semibold cursor-pointer hover:opacity-45">
              FAQ
            </li>

            <li className="text-xl font-semibold cursor-pointer hover:opacity-45">
              Contact Us
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-8">
          <button className="active:opacity-45">
            <IoSearchSharp size={27} />
          </button>
          <button className="active:opacity-45">
            <MdOutlinePersonAddAlt size={27} />
          </button>
          <button className="active:opacity-45">
            <FaRegHeart size={27} />
          </button>
          <button className="active:opacity-45">
            <IoCartOutline size={27} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
