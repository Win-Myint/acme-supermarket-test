import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProductInfo } from "../../reducers/product/actions";
import {
  addBuy1Get1FreeItem,
  addBulkDiscountItem,
  addFullPriceItem
} from "../../reducers/basket/actions";
import { Title, SubTitle } from "../../components/sectionHeaders";
import Spinner from "../../components/spinner";
import ProductInformation from "../../components/productInformation";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketTotal: 0
    };
    this.pricingRules = this.props.pricingRules || {};
    this.addToBasket = this.addToBasket.bind(this);
  }

  componentDidMount() {
    const { getProductInfo } = this.props;
    getProductInfo();
  }

  addToBasket(selectedProduct) {
    const { productCode, price } = selectedProduct;
    const {
      addBuy1Get1FreeItem,
      addBulkDiscountItem,
      addFullPriceItem
    } = this.props;

    if (productCode === this.pricingRules.buy1Get1Free.productCode) {
      addBuy1Get1FreeItem(price);
    } else if (productCode === this.pricingRules.bulkDiscount.productCode) {
      addBulkDiscountItem(price);
    } else {
      addFullPriceItem(price);
    }

    this.calculateBasketTotal();
  }

  calculateBasketTotal() {
    const buy1Get1FreeTotal = this.calculateBuy1Get1FreeTotal();
    const bulkDiscountTotal = this.calculateBulkDiscountTotal();
    const fullPriceTotal = this.calculateFullPriceTotal();
    const basketTotal = (
      buy1Get1FreeTotal +
      bulkDiscountTotal +
      fullPriceTotal
    ).toFixed(2);
    this.setState({ basketTotal });
  }

  calculateBuy1Get1FreeTotal() {
    const { buy1Get1FreeItems } = this.props;
    let buy1Get1FreeTotal = 0;

    if (!buy1Get1FreeItems || buy1Get1FreeItems.length === 0) {
      return buy1Get1FreeTotal;
    }

    let pricePerUnit = buy1Get1FreeItems[0];
    let totalItemsInBasket = buy1Get1FreeItems.length;
    let totalItemsAfterDiscount = Math.round(totalItemsInBasket / 2);
    buy1Get1FreeTotal = totalItemsAfterDiscount * pricePerUnit;
    return buy1Get1FreeTotal;
  }

  calculateBulkDiscountTotal() {
    const { bulkDiscountItems } = this.props;
    let bulkDiscountTotal = 0;

    if (!bulkDiscountItems || bulkDiscountItems.length === 0) {
      return bulkDiscountTotal;
    }

    const originalPricePerUnit = bulkDiscountItems[0];
    const discountedPricePerUnit = this.pricingRules.bulkDiscount.discountPrice;
    const minBulkQuantity = this.pricingRules.bulkDiscount.minQuantity;
    let pricePerUnit =
      bulkDiscountItems.length >= minBulkQuantity
        ? discountedPricePerUnit
        : originalPricePerUnit;

    bulkDiscountTotal = bulkDiscountItems.length * pricePerUnit;
    return bulkDiscountTotal;
  }

  calculateFullPriceTotal() {
    const { fullPriceItems } = this.props;
    let fullPriceTotal = 0;

    if (!fullPriceItems || fullPriceItems.length === 0) {
      return fullPriceTotal;
    }
    const pricePerUnit = fullPriceItems[0];
    fullPriceTotal = fullPriceItems.length * pricePerUnit;
    return fullPriceTotal;
  }

  render() {
    const { product } = this.props.product;
    const { isGettingProductInfo } = this.props;

    if (isGettingProductInfo) {
      return <Spinner />;
    }

    return (
      <div>
        <Title>Add product to basket</Title>
        <ProductInformation product={product} addToBasket={this.addToBasket} />
        <SubTitle>Basket total = {`£ ${this.state.basketTotal}`}</SubTitle>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  isGettingProductInfo: state.product.isGettingProductInfo,
  buy1Get1FreeItems: state.basket.buy1Get1FreeItems,
  bulkDiscountItems: state.basket.bulkDiscountItems,
  fullPriceItems: state.basket.fullPriceItems
});

const mapDispatchToProps = dispatch => ({
  getProductInfo: () => dispatch(getProductInfo()),
  addBuy1Get1FreeItem: price => dispatch(addBuy1Get1FreeItem(price)),
  addBulkDiscountItem: price => dispatch(addBulkDiscountItem(price)),
  addFullPriceItem: price => dispatch(addFullPriceItem(price))
});

Basket.propTypes = {
  pricingRules: PropTypes.objectOf(PropTypes.any).isRequired,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  isGettingProductInfo: PropTypes.bool.isRequired,
  buy1Get1FreeItems: PropTypes.array.isRequired,
  bulkDiscountItems: PropTypes.array.isRequired,
  fullPriceItems: PropTypes.array.isRequired,
  getProductInfo: PropTypes.func.isRequired,
  addBuy1Get1FreeItem: PropTypes.func.isRequired,
  addBulkDiscountItem: PropTypes.func.isRequired,
  addFullPriceItem: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket);
