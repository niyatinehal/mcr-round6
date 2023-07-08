import React, { useContext, useState } from "react";
import { cuisineData } from "./db";
import { restaurantsData } from "./db";
import { CuisineContext } from "./Context";
import "./home.css"
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [displayRest, setDisplayRest] = useState([]);
  const nav=useNavigate()

  const cuisineHandler = (cuisine) => {
    const result = restaurantsData.filter((r) => r.cuisine_id === cuisine.id);
    setDisplayRest(result);
  };
  const navHandler=(id)=>{
    nav(`/${id}`)
  }
  return (
    <div className="main">
      <div className="heading">
        <h1>Food Ordering App</h1>
        <h2>Select your cuisine:</h2>
        <div className="btn">
            {cuisineData.map((cuisine) => (
          <button className="menu-btn" onClick={(e) => cuisineHandler(cuisine)}>
            {cuisine.name}
          </button>
        ))}
        </div>
        
      </div>
      {displayRest && (
        <div className="food">
          {displayRest.map((rest) => (
            <div className="food-name">
              <h3>Dishes by {rest.name}</h3>
              <p className="menu-item">
                {rest.menu.map((item) => (
                    <div className="image-section" onClick={()=>navHandler(rest.id)}>
                    <img src={item.imgSrc} alt="" className="image" />
                        <div className="menu-item-name"><strong>{item.name}</strong></div>
                        <p>{item.price} for {item.qty}</p>
                        <p >{rest.name}</p>
                    </div>
                  
                ))}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
