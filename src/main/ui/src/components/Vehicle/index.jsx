import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Tooltip } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import { Grid } from "@material-ui/core";
import Modal from "../Modal";

const useStyles = makeStyles((theme) => ({
  onHire: {
    color: "red",
  },
  available: {
    color: "green",
  },
  paper: {
    padding: theme.spacing(2)
  },
}));

const Vehicle = (props) => {
  const { vehicle } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [vehicleId, setVehicleId] = useState(undefined);

  const handleGetQuote = () => {
    setVehicleId(vehicle.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getHireStatus = (status) => {
    const hasCustomer = status.customer !== null;
    const hasStartDate = status.startDate !== null;
    const hasEndDate = status.endDate !== null;

    if (hasCustomer && hasStartDate && hasEndDate) {
      return (
        <Tooltip
          title={`On Hire by (${status.customer.name}) and is due back on (${status.endDate})`}
        >
          <div className={classes.onHire}>
            <ThumbDownIcon />
          </div>
        </Tooltip>
      );
    }

    return (
      <Tooltip title="Available">
        <div className={classes.available}>
          <ThumbUpIcon />
        </div>
      </Tooltip>
    );
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item container direction="column">
                <Typography variant="subtitle1" gutterBottom>
                  {vehicle.category}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {vehicle.vrn}
                </Typography>
                 <Typography variant="body2" gutterBottom>
                  {vehicle.make}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {vehicle.model}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {vehicle.fuelType}
                </Typography>
                {getHireStatus(vehicle.hireStatus)}
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleGetQuote}
                >
                  GET QUOTE
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                &pound;{parseFloat(vehicle.pricePerDay).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Modal isOpen={open} onClose={handleClose} vehicleId={vehicleId} />
    </>
  );
};

export default Vehicle;
