import React, { useState, useEffect } from "react";
import { CreateBook } from "./CreateBook";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BackButton } from "../components/BackButton";
import { Spinner } from "../components/Spinner";

export const EditBook = ({REACT_BASE_URL}) => {
  const [bookDetails, setBookDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (bookDetails == undefined) {
      setLoading(true);

     try {
       axios
        .post(`${REACT_BASE_URL}/Books/getSingleBook/${id}`)
        .then((response) => {
          setLoading(false);
          setBookDetails(response.data);
        })
        .catch((error) => {
          console.log(error);
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
        <CreateBook bookDetail={bookDetails} REACT_BASE_URL={REACT_BASE_URL} />
      )}
    </div>
  );
};
