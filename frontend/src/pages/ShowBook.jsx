import React, { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BackButton } from "../components/BackButton";
import readImage from "../assets/read-7577787_1280.jpg"; //

export const ShowBook = ({ onDataLoad ,REACT_BASE_URL,error }) => {
  const [bookDetails, setBookDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [internalError, setInternalError] = useState('');
  const { id } = useParams();
console.log(bookDetails)
console.log(REACT_BASE_URL)
  useEffect(() => {
    if (bookDetails == undefined) {
      setLoading(true);

    try {
        axios
        .post(`${REACT_BASE_URL}/Books/getSingleBook/${id}`)
        .then((response) => {
          setLoading(false);
          setInternalError("");
          setBookDetails(response.data);
          onDataLoad ? onDataLoad() : "";
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setInternalError("Something went wrong. Try after sometime.");
        });
    } catch (error) {
      console.log(error)
    }
    }
  }, [bookDetails]);
  return (
    <div>
      {loading ? (
        <div>
          <BackButton />
          <Spinner />
        </div>
      ) : (
        <div>
          <BackButton />

          <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-6 mt-6">
            {internalError != "" ? (
              <p className="text-center text-red-600 font-bold responseText">
                {internalError}
              </p>
            ) : (
              <div className="w-full h-full flex flex-col lg:flex-row">
     
               {bookDetails.image ?
                <div className="h-auto lg:w-1/2 flex-none rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden shadow-lg">
                  <img
                    src={bookDetails.image}
                    alt="img"
                    className="w-full h-full object-fit"
                  />
                </div>
                :''}

                {/* Content side */}
                <div className="w-full h-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal shadow-lg">
                  <div className="mb-8 overflow-visible overflow-x-hidden">
                    <p className="text-sm text-gray-600 flex items-center"></p>
                    <div className="text-gray-900 font-bold text-3xl mb-4 capitalize">
                      {bookDetails.title}
                    </div>
                    <p className="text-gray-700 text-lg">
                      {bookDetails.script}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm">
                      <span className="text-gray-600   flex">
                        <p className="font-bold">Author</p>:{" "}
                        {bookDetails.author}
                      </span>
                      <span className="text-gray-600 flex">
                        <p className="font-bold">Date</p>:{" "}
                        {bookDetails.updatedAt.split("T")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
