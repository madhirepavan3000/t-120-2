import { useState, useEffect } from "react";
import { Col, message, Row, Badge, Form } from "antd";
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
  }, [selectedCategory]); // Run the effect whenever the selectedCategory changes

  return (
    <div className="mt-2">
      <Col span={8}>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "please input category" }]}
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="mythology">Mythology</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="biography">Biography</option>
            <option value="poetry">Poetry</option>
            <option value="drama">Drama</option>
            <option value="history">History</option>
          </select>
        </Form.Item>
      </Col>
      <Row gutter={[16, 16]}>
        {books.map((book) => (
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
          >
            <Badge.Ribbon
              text={
                book.availableCopies > 0 ? "Available" : "Not Available"
              }
              color={book.availableCopies > 0 ? "green" : "red"}
            >
              <div className="rounded bg-white p-2 shadow flex flex-col gap-1">
                <img src={book.image} height="350px" alt={book.title} />
                <h1 className="text-md text-secondary uppercase font-bold mt-2">
                  {book.title}
                </h1>
              </div>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
