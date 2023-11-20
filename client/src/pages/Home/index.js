import React, { useState, useEffect } from "react";
import { Col, message, Row, Badge} from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllBooks } from "../../apicalls/books";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks({ category: selectedCategory });
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  useEffect(() => {
    getBooks();
  }, [selectedCategory]);

  return (
    <div className="mt-2 card-container">
      {books.map((book) => (
        <div
          className="card"
          key={book._id}
          onClick={() => navigate(`/book/${book._id}`)}
        >
          <Badge.Ribbon
            text={book.availableCopies > 0 ? "Available" : "Not Available"}
            color={book.availableCopies > 0 ? "green" : "red"}
          >
            <div className="card-content">
              <img src={book.image} alt={book.title} />
              <h1 className="card-title">{book.title}</h1>
              <p className="card-status">
                {book.availableCopies > 0 ? "Available" : "Not Available"}
              </p>
            </div>
          </Badge.Ribbon>
        </div>
      ))}
    </div>
    
  );
}

export default Home;