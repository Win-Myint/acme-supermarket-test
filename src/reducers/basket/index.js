import {
  ADD_BUY1GET1FREE_ITEM,
  ADD_BULK_DISCOUNT_ITEM,
  ADD_FULL_PRICE_ITEM
} from "./constants";

const initialState = {
  buy1Get1FreeItems: [],
  bulkDiscountItems: [],
  fullPriceItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUY1GET1FREE_ITEM: {
      return {
        ...state,
        ...state.buy1Get1FreeItems.push(action.payload.price)
      };
    }
    case ADD_BULK_DISCOUNT_ITEM: {
      return {
        ...state,
        ...state.bulkDiscountItems.push(action.payload.price)
      };
    }
    case ADD_FULL_PRICE_ITEM: {
      return {
        ...state,
        ...state.fullPriceItems.push(action.payload.price)
      };
    }
    default: {
      return state;
    }
  }
};
