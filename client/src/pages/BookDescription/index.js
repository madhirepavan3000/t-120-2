import { Col, message, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetBookById } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function BookDescription() {
  const [bookData, setBookData] = React.useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getBook = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookById(id);
      dispatch(HideLoading());
      if (response.success) {
        setBookData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBook();
  }, []);
  return (
    bookData && (
      <div className="book-details-container">
        <Row gutter={[16, 16]} align="middle" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="book-details">
            <h1 className="book-title">{bookData?.title}<h2>({bookData?.category})</h2></h1>
            <hr />
            <div className="book-image-container">
              <img src={bookData.image} alt={bookData.title} />
            </div>
            <p className="book-description">{bookData?.description}</p>
            <div className="book-info">
              <div className="info-item">
                <span className="info-label">Author:</span>
                <span className="info-value">{bookData?.author}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Publisher:</span>
                <span className="info-value">{bookData?.publisher}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Published Date:</span>
                <span className="info-value">
                  {moment(bookData?.publishedDate).format("MMMM Do YYYY")}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Available Copies:</span>
                <span className="info-value">{bookData?.availableCopies}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
    }  
export default BookDescription;
