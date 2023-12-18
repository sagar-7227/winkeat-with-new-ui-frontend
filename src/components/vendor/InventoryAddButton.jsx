import React from "react";
import InventoryForm from "./InventoryForm";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const InventoryAddButton = ({ icon, handleDelete }) => {
  return (
    <>
      <div data-dial-init class="fixed right-6 bottom-6 group">
        {icon === "AiOutlinePlus" ? (
          <Link to="/inventory/new">
            <button
              type="button"
              data-dial-toggle="speed-dial-menu-default"
              aria-controls="speed-dial-menu-default"
              aria-expanded="false"
              class="flex items-center justify-center text-white ease-out duration-100 hover:scale-125 bg-[#ff742e] rounded-full w-14 h-14 hover:bg-[#ff742e] focus:ring-4 focus:ring-[#ff742e] focus:outline-none dark:focus:ring-[#ff742e9d]"
            >
              <AiOutlinePlus size={30} />
              <span class="sr-only">Open actions menu</span>
            </button>
          </Link>
        ) : (
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-default"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            class="flex items-center justify-center text-white ease-out duration-100 hover:scale-125 bg-[#ff742e] rounded-full w-14 h-14 hover:bg-[#ff742e] focus:ring-4 focus:ring-[#ff742e] focus:outline-none dark:focus:ring-[#ff742e9d]"
            onClick={handleDelete}
          >
            <MdDelete size={30} />
            <span class="sr-only">Delete Inventory</span>
          </button>
        )}
      </div>
    </>
  );
};

export default InventoryAddButton;
