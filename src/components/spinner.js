import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  spinnerWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "35vh"
  },
  progress: {
    margin: theme.spacing.unit * 1
  }
});

function Spinner(props) {
  const { classes } = props;
  return (
    <div className={classes.spinnerWrapper}>
      <CircularProgress className={classes.progress} size={200} />
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Spinner);
