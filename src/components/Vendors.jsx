import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../helper";
import Loader from "./Loader";

const VendorCard = ({ vendor }) => {
  const { avatar, name, _id } = vendor;
  const url = avatar.url;

  return (
    <div className=" p-4 md:w-[95%] mx-auto">
      <ul className="  m-auto w-[100%] ">
        <li>
          <Link
            to={`/vendor/${_id}/menu`}
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-200 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <img
              src={url}
              alt="vendor-profile"
              className="w-10 h-10 rounded-lg"
            />
            <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Vendors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/getvendors`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data.users);
      });
    setLoading(false);
  }, [data]);
  console.log(data);
  if (loading === true) {
    return <Loader loading={loading} />;
  }
  return (
    <div>
      {" "}
      {data.map((vendor) => (
        <VendorCard vendor={vendor} key={vendor._id} />
      ))}
    </div>
  );
};

export default Vendors;
