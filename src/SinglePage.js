import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { restaurantsData } from "./db";
import "./singlePage.css";
import { CuisineContext } from "./Context";

export const SinglePage = () => {
  const { id } = useParams();
  const { cuisineDispatcher } = useContext(CuisineContext);
const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');



  const display = restaurantsData.filter((res) => res.id === parseInt(id));
  console.log(restaurantsData.filter((res) => res.id === parseInt(id)));

  const nav = useNavigate();

  const addReview = (restaurantId, rating, comment) => {
    cuisineDispatcher({
      type: "ADD_REVIEW",
      payload: { restaurantId, rating, comment },
    });
     setShowModal(false);
    setRating(0);
    setComment('');
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="single-main">
      <div className="single-main-component">
        <p className="back" onClick={() => nav("/")}>
          Back
        </p>
        {display.map((item) => (
          <div className="single-page-content">
            <div className="single-page-content-heading">
              <div>
                <h1>{item.name}</h1>
                {console.log(item)}
                <div className="sub-heading">
                  {item.menu.map((menuItem) => (
                    <>{menuItem.name},</>
                  ))}
                </div>
              </div>

              <div>
                <button
                  className="menu-btn"
                  onClick={() =>
                   openModal()
                  }
                >
                  Add Review
                </button>
              </div>
            </div>{" "}
            <hr />
            <div className="review">
              <h2>Reviews</h2>
              {item.ratings.map((rating) => (
                <div className="reviewer-section">
                  <div className="reviewer">
                    <div>
                      <div className="profile">
                        <img src={rating.pp} alt="" className="pp" />
                        <h3>{rating.revName}</h3>
                      </div>

                      <p className="comment">{rating.comment}</p>
                    </div>
                    <div className="rating">{rating.rating}</div>
                  </div>

                  <hr />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
       {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Review</h3>
            <label>
              Rating:
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </label>
            <div>
              <button onClick={addReview}>Submit</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
