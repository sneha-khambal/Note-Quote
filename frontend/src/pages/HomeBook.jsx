import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BackButton } from "../components/BackButton";
import { ListComponent } from "../components/ListComponent";
import { CardComponent } from "../components/CardComponent";
import { DeleteAlertComponent } from 'frontend\src\components\DeleteAlertComponent.jsx';

export const HomeBook = ({REACT_BASE_URL}) => {
  console.log(REACT_BASE_URL)
  const [loading, setLoading] = useState(true);

  const [listButton, setListButton] = useState(() => {
    const saved = localStorage.getItem("listButton");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [books, setBooks] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [internalError, setInternalError] = useState("");

  useEffect(() => {
    if (books != undefined && books.length == 0) {
      setLoading(true);

      axios
        .get(`${REACT_BASE_URL}/Books/getAllBooks`)
        .then((response) => {
          setLoading(false);
          setInternalError("");

          if (response.data.length > 0) {
            setBooks(response.data);
          } else {
            setBooks(response.data);
          }
        })
        .catch((error) => {
          console.log(error);

          setTimeout(() => {
            setLoading(false);
            setInternalError("Something went wrong. Try after sometime.");
          }, 2000);
        });
    }
  }, [books]);

  const deleteAllRecords = () => {
    axios
      .delete(`${REACT_BASE_URL}/Books/deleteAllBooks`)
      .then((res) => {
        if (res.data == "All Book deleted Successfully.") {
          setBooks([]);
          setDeleteAll(false);
          setInternalError("");
        }
      })
      .catch((error) => {
        console.log(error);
        setDeleteAll(false);
        setInternalError("Something went wrong. Try after sometime.");
        window.scroll(0, 0);
        setTimeout(() => {
          setInternalError("");
        }, 3000);
      });
  };

  return (
    <div className="p-4 text-gray-700 ">
      {/* <BackButton /> */}
      {books.length > 0 ? (
        <div className="flex justify-between items-center">
          <small
            onClick={() => {
              setListButton(!listButton),
                localStorage.setItem("listButton", !listButton);
            }}
            className="cursor-pointer px-2 text-underline"
          >
            {listButton ? "Book Card" : "Book List"}
          </small>

          <Link to={`books/create`}>
            <MdOutlineAddBox className="text-4xl mr-2" />
          </Link>
        </div>
      ) : (
        ""
      )}
      <h1 className="text-3xl my-8 flex justify-center">My Moments</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-[344px] relative mb-5">
          {internalError != "" && !deleteAll ? (
            <p className="text-center text-red-600 font-bold responseText py-3">
              {internalError}
            </p>
          ) : (
            <DeleteAlertComponent
              onCancel={() => {
                setDeleteAll(false);
              }}
              deleteFunction={deleteAllRecords}
              showBox={deleteAll}
              message={"You Want to Delete All Books Permanently ?"}
            />
          )}

          {listButton ? (
            <ListComponent books={books} internalError={internalError} />
          ) : (
            <CardComponent books={books} internalError={internalError} />
          )}

          {books.length > 0 ? (
            <button
              className="flex bg-red-700 rounded px-3 py-3 text-white w-[120px] font-bold justify-center float-right mt-5 cursor-pointer mb-5"
              onClick={() => {
                setDeleteAll(true);
              }}
            >
              Delete All
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
