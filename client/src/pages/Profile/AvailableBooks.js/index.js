import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Card, Row, Col, Badge } from "antd";
import { GetAllBooks } from "../../../apicalls/books";
import { ShowLoading, HideLoading } from "../../../redux/loadersSlice";
import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.css";

function AvailableBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
        setFilteredBooks(response.data);
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
  }, []);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="available-books-container">
      <div className="search-bar">
        <div className="custom-search-container">
          <input
            type="text"
            placeholder="Search books..."
            onChange={(e) => handleSearch(e.target.value)}
            className="custom-search-input"
          />
          <button className="custom-search-button">
            <SearchOutlined style={{ fontSize: "16px", color: "#1890ff" }} />
          </button>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            className="book-item"
            onClick={() => navigate(`/book/${book._id}`)}
          >
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
          </div>
        ))}
      </Row>
    </div>
  );
}

export default AvailableBooks;
