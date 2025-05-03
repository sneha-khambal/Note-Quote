import React from "react";
import { Link } from "react-router-dom";

export const CreateNewEntryComponent = ({ internalError }) => {
  return (
  <div>
      {internalError == "" ?  <div className="flex items-center justify-center  h-[500px] bg-gray-100">
       
        <Link
          className="block rounded-full bg-gray-700 text-white p-3 py-6 w-50 text-center"
          to={`books/create`}
        >
          Create New List
        </Link>
      
    </div>
    : (
      ""
    )}

  </div>
  );
};
