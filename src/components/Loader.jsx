import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ loading }) => {
  console.log("Loading");
  return (
    <div className="fixed top-0 left-0  w-screen h-screen flex justify-center items-center ">
      <HashLoader className="" color="#ff742e" loading={loading} />
    </div>
  );
};

export default Loader;
