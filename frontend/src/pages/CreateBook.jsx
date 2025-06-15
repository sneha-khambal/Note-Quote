import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";


export const CreateBook = ({ bookDetail,REACT_BASE_URL }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [responseData, setResponseData] = useState("");
  const { id } = useParams();
  const [internalError, setInternalError] = useState("");
  const [error, setError] = useState("");
  const [submitClick, setSubmitClick] = useState(false);
console.log(submitClick)
  useEffect(() => {
    if (bookDetail) {
      reset(bookDetail);
    }
  }, [bookDetail]);

  const onSubmit = (data) => {
    // console.log(data)
setSubmitClick(true)
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("script", data.script);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    if (bookDetail) {
      axios
        .put(`${REACT_BASE_URL}/Books/updateBook/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSubmitClick(false);
          setInternalError("");
          setError("");
          setResponseData(response.data.data);
        })
        .catch((error) => {
          setSubmitClick(false);
          setResponseData("");
          setInternalError("Something went wrong. Try after sometime.");
        });
    } else {
      axios
        .post(`${REACT_BASE_URL}/Books/createBook`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSubmitClick(false);
          setInternalError("");
          setError("");
          setResponseData(response.data.data);
          setInternalError("");

          reset();
        })
        .catch((error) => {
          console.log(error);
          setSubmitClick(false);
          setResponseData("");
          setInternalError("Something went wrong. Try after sometime.");
        });
    }
  };

  useEffect(() => {
    // console.log(Object.keys(errors).length)
    if (Object.keys(errors).length > 0) {
      setResponseData("");
      setInternalError("");
      setError("Enter Required Data.");
    } else {
      setError("");
    }
  });

  return (
    <div>
      {<BackButton destination={`/`} />}

      <p className={"text-center text-red-600 font-bold responseText"}>
        {error}
      </p>
      <p
        className={
          responseData && bookDetail
            ? "text-center text-blue-600 font-bold"
            : "text-center text-green-600 font-bold responseText"
        }
      >
        {responseData}
      </p>

      {internalError != "" && Object.keys(errors).length == 0 ? (
        <p className="text-center text-red-600 font-bold responseText">
          {internalError}
        </p>
      ) : (
        ""
      )}
      { submitClick ? <div className="flex item-center justify-center mb-5">
  <div role="status">
  <svg aria-hidden="true" class={`w-8 h-8 text-gray-300 animate-spin  ${ bookDetail ? 'fill-blue-600': 'fill-green-600'}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg> 
</div>
</div>:''}
      <div className=" p-6 bg-gray-100 p-4 mt-6">
       <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
        >
          <h2
            className={
              bookDetail
                ? "text-2xl font-bold mb-6 text-center text-blue-700"
                : "text-2xl font-bold mb-6 text-center text-green-700"
            }
          >
            {bookDetail ? "Edit Book" : "Create Book"}
          </h2>

          {/* Title Field */}
          <div className="mb-4">
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Title"
              className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Script Field */}
          <div className="mb-4">
            <textarea
              {...register("script", { required: "Script is required" })}
              placeholder="Script"
              rows="5"
              className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.script && (
              <p className="text-red-500 text-sm mt-1">
                {errors.script.message}
              </p>
            )}
          </div>

          {/* Author Field */}
          <div className="mb-4">
            <input
              {...register("author", { required: "Author is required" })}
              type="text"
              placeholder="Author"
              className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* image  Field */}
          <div className="mb-4">
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={
              bookDetail
                ? "w-full bg-blue-600 text-white py-3 rounded-xl   transition duration-200 cursor-pointer"
                : "w-full bg-green-600 text-white py-3 rounded-xl cursor-pointer  transition duration-200"
            }
          >
            {bookDetail ? "Edit" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};
