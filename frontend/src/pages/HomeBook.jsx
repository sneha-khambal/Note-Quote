import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BackButton } from "../components/BackButton";
import { ListComponent } from "./ListComponent";
import { CardComponent } from "./CardComponent";
import { DeleteAlertComponent } from "../components/deleteAlertComponent";

export const HomeBook = () => {
  const [loading, setLoading] = useState(true);

  const [listButton, setListButton] = useState(() => {
    const saved = localStorage.getItem("listButton");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [books, setBooks] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [internalError, setInternalError] = useState("");

  useEffect(() => {
    console.log(books);
    if (books != undefined && books.length == 0) {
      setLoading(true);

      axios
        .get("http://localhost:3000/Books/getAllBooks")
        .then((response) => {
          console.log(response.data);
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
      .delete("http://localhost:3000/Books/deleteAllBooks")
      .then((res) => {
        console.log(res.data);
        console.log(res.data == "All Book deleted Successfully.");
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
        window.scroll(0,0)
        setTimeout(() => {
          setInternalError('')
        }, 3000);
      });
  };

  console.log(deleteAll);

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
      <h1 className="text-3xl my-8 flex justify-center">
      My Moments
      </h1>
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

    
 
{listButton    ? (
          <ListComponent books={books}  internalError={internalError} />
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
