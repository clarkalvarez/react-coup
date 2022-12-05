import history from "../history";
import { finvizendpoint } from "../apis/stream";
import {
  GET_NEWS,
  GET_STOCKS,
  POST_NEWS,
  POST_STOCK,
  GET_SAVE_STOCK,
  GET_ONE_NEWS,
  UPDATE_ONE_STOCK,
} from "./types";

export const fetchStock = (stockcode) => async (dispatch) => {
  const response = await finvizendpoint.get(
    `/stockInfo?stockCode=${stockcode}`
  );
  const responseData = response.data;
  dispatch({ type: GET_SAVE_STOCK, payload: response.data });
  await finvizendpoint.post("/api/stocks", responseData);
};

export const fetchStocks = () => async (dispatch) => {
  const response = await finvizendpoint.get("/api/stocks");
  console.log("fetchStocks");
  console.log(response);

  dispatch({ type: GET_STOCKS, payload: response.data });
};

export const fetchOneNews = (stockCode) => async (dispatch) => {
  const response = await finvizendpoint.get(
    `/api/news/:?stockCode=${stockCode}`
  );
  console.log("fetchOneNews");
  console.log(response);
  dispatch({ type: GET_ONE_NEWS, payload: response.data });
};

export const fetchNews = (stockcode) => async (dispatch) => {
  const response = await finvizendpoint.get(
    `/stockInfo?stockCode=${stockcode}`
  );
  const responseData = response.data;
  console.log("fetchNews");
  console.log(response);
  dispatch({ type: GET_NEWS, payload: responseData });
  await finvizendpoint.post("/news", responseData);
};

export const storeNews = (newsValues) => async (dispatch) => {
  const response = await finvizendpoint.post("/api/news", { newsValues });
  console.log("storeNews");
  console.log(response);
  dispatch({ type: POST_NEWS, payload: response.data });
  history.push("/");
};

export const storeStock = (stockCode) => async (dispatch) => {
  const response = await finvizendpoint.post(
    `/api/stocks/?stockCode=${stockCode}`
  );
  console.log("storeStock");
  console.log(response);
  dispatch({ type: POST_STOCK, payload: response.data });
  history.push("/");
};

export const updateOneStock = (stockCode) => async (dispatch) => {
  const response = await finvizendpoint.put(
    `/api/stocks/:?stockCode=${stockCode}`
  );
  console.log("UPDATE_ONE_STOCK");
  console.log(response);
  dispatch({ type: UPDATE_ONE_STOCK, payload: response.data });
  history.push("/");
};
