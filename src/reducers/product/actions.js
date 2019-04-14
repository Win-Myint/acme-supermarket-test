import {
  GET_PRODUCT_INFO_INITIATED,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_FAIL,
  GET_PRODUCT_INFO_COMPLETE
} from "./constants";
import axios from "axios";

// simulate retrieving data from a server using http://myjson.com/
const API_URL = "https://api.myjson.com/bins/181b9w";

export const getProductInfo = () => {
  return dispatch => {
    dispatch(getProductInfoInitiated());

    axios
      .get(`${API_URL}`)
      .then(respond => {
        dispatch(getProductInfoSuccess(respond.data));
        dispatch(getProductInfoComplete());
      })
      .catch(error => {
        dispatch(getProductInfoFail(error));
        dispatch(getProductInfoComplete());
      });
  };
};

export const getProductInfoInitiated = () => ({
  type: GET_PRODUCT_INFO_INITIATED
});

export const getProductInfoSuccess = product => ({
  type: GET_PRODUCT_INFO_SUCCESS,
  payload: {
    product
  }
});

export const getProductInfoFail = error => ({
  type: GET_PRODUCT_INFO_FAIL,
  payload: {
    error
  }
});

export const getProductInfoComplete = () => ({
  type: GET_PRODUCT_INFO_COMPLETE
});
