import React from "react";

const OrderCard = ({ item }) => {
  const orderStatus = (status) => {
    if (status === "completed") {
      return (
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
            {item.productStatus}
          </p>
        </td>
      );
    } else if (status === "rejected") {
      return (
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
            {item.productStatus}
          </p>
        </td>
      );
    } else if (status === "delivered") {
      return (
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
            {item.productStatus}
          </p>
        </td>
      );
    }
    return (
      <td className="py-5 px-4">
        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
          {item.productStatus}
        </p>
      </td>
    );
  };

  const paymentStatus = (status) => {
    if (status === "paid") {
      return (
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
            {item.paymentStatus}
          </p>
        </td>
      );
    } else if (status === "failed") {
      return (
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
            {item.paymentStatus}
          </p>
        </td>
      );
    }
    return (
      <td className="py-5 px-4">
        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
          Pending
        </p>
      </td>
    );
  };

  return (
    <tr>
      <td className="border-b space-x-2 flex border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <div className="h-12.5 w-15 rounded-md">
          <img src={item.itemImage} alt="Product" />
        </div>
        <div className="product-name mt-2">
          <h5 className="font-medium text-black dark:text-white">
            {item.itemName}
          </h5>
          <p className="text-sm">₹{item.itemPrice}</p>
        </div>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="product-name">
          <h5 className="font-medium capitalize text-black dark:text-white">
            {item.vendorName}
          </h5>
          <p className="text-black dark:text-white">{item.orderedAt}</p>
        </div>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{item.itemQuantity}</p>
      </td>
      {orderStatus(item.productStatus)}
      {/* {item.productStatus === "completed" ? (
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
            {item.productStatus}
          </p>
        </td>
      ) : (
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
            {item.productStatus}
          </p>
        </td>
      )} */}
      {paymentStatus(item.paymentStatus)}
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <button className="hover:text-primary">
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                fill=""
              />
              <path
                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderCard;
