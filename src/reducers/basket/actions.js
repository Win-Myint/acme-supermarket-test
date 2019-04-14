import {
  ADD_BUY1GET1FREE_ITEM,
  ADD_BULK_DISCOUNT_ITEM,
  ADD_FULL_PRICE_ITEM
} from "./constants";

export const addBuy1Get1FreeItem = price => ({
  type: ADD_BUY1GET1FREE_ITEM,
  payload: {
    price
  }
});

export const addBulkDiscountItem = price => ({
  type: ADD_BULK_DISCOUNT_ITEM,
  payload: {
    price
  }
});

export const addFullPriceItem = price => ({
  type: ADD_FULL_PRICE_ITEM,
  payload: {
    price
  }
});
