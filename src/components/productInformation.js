import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%"
  },
  image: {
    position: "relative",
    height: 550,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

function ProductInformation(props) {
  const { classes, product, addToBasket } = props;

  return (
    <div className={classes.root}>
      {Object.keys(product).map(key => (
        <ButtonBase
          focusRipple
          key={product[key].productCode}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: "33.33%"
          }}
          onClick={() => {
            addToBasket(product[key]);
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${product[key].imagePath})`
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="h3"
              color="inherit"
              className={classes.imageTitle}
            >
              {product[key].name}
              {` £${product[key].price} each`}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
          <span>
            <Typography component="span" variant="h4" color="inherit">
              {`£ ${product[key].price}`}
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}

ProductInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductInformation);
