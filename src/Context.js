import React, { createContext, useEffect, useReducer } from "react";
import { cuisineData } from "./db";
import { restaurantsData } from "./db";

export const CuisineContext = createContext();

const cuisineReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY-REST":
      return {
        ...state,
        relatedRest:action.payload
      };
    case 'ADD_REVIEW': {
      const { restaurantId, rating, comment } = action.payload;
      const updatedRestaurants = state.restaurants.map(restaurant => {
        if (restaurant.id === restaurantId) {
          const newReview = { rating, comment };
          return {
            ...restaurant,
            ratings: [...restaurant.ratings, newReview]
          };
        }
        return restaurant;
      });

      return { ...state, restaurants: updatedRestaurants };
    }
  }
};

export const CuisineContextProvider = ({ children }) => {
  const [cuisineState, cuisineDispatcher] = useReducer(cuisineReducer, {
    relatedRest: [],
  });

  useEffect(() => {
    console.log(cuisineState.relatedRest);
  }, []);
  return (
    <CuisineContext.Provider value={{ cuisineState, cuisineDispatcher }}>
      {children}
    </CuisineContext.Provider>
  );
};
