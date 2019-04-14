import {
  GET_PRODUCT_INFO_INITIATED,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_FAIL,
  GET_PRODUCT_INFO_COMPLETE
} from "./constants";

const initialState = {
  isGettingProductInfo: false,
  isGettingProductInfoComplete: false,
  getProductError: null,
  product: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_INFO_INITIATED: {
      return {
        ...state,
        isGettingProductInfo: true
      };
    }
    case GET_PRODUCT_INFO_SUCCESS: {
      const { product } = action.payload;
      return {
        ...state,
        product: product
      };
    }
    case GET_PRODUCT_INFO_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        getProductError: error
      };
    }
    case GET_PRODUCT_INFO_COMPLETE: {
      return {
        ...state,
        isGettingProductInfo: false,
        isGettingProductComplete: true
      };
    }
    default: {
      return state;
    }
  }
};
