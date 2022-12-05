import _ from "lodash";

import {
  GET_NEWS,
  GET_STOCKS,
  POST_NEWS,
  POST_STOCK,
  GET_SAVE_STOCK,
  GET_ONE_NEWS,
  UPDATE_ONE_STOCK,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_NEWS:
      return { ...state, news: action.payload };
    case GET_STOCKS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case GET_SAVE_STOCK:
      return { ...state, stocks: action.payload };
    case POST_NEWS:
      return { ...state, news: action.payload };
    case POST_STOCK:
      return { ...state, stocks: action.payload };
    case GET_ONE_NEWS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case UPDATE_ONE_STOCK:
      return { ...state };
    default:
      return state;
  }
};
