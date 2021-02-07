import { useState, useReducer } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { DateRangeInput } from "@datepicker-react/styled";

import Progress from "../Progress";
import Error from "../Error";

const useStyles = makeStyles((theme) => ({
  paperWidthSm: {
    maxWidth: 645,
  },
  paperScrollPaper: {
    maxHeight: "unset",
  },
  daysUnderline: {
    textDecoration: "underlined",
  },
  days: {
    textAlign: "center",
    marginTop: 5,
  },
  price: {
    textAlign: "center",
  },
}));

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

const Modal = (props) => {
  const { isOpen, onClose, vehicleId } = props;
  const classes = useStyles();
  const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [days, setDays] = useState(undefined);
  const [isCalculateBtnDisabled, setIsCalculateBtnDisabled] = useState(true);

  const getQuote = async () => {
    setIsLoading(true);
    try {
      const startDate = new Date(state.startDate).toISOString().slice(0, 10);
      const endDate = new Date(state.endDate).toISOString().slice(0, 10);
      const response = await axios.get(
        `/api/v1/vehicle/calculate?id=${vehicleId}&startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.data;
      setPrice(data.cost);
      setDays(data.days);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        classes={{
          paperWidthSm: classes.paperWidthSm,
          paperScrollPaper: classes.paperScrollPaper,
        }}
      >
        <DialogTitle>GET QUOTE</DialogTitle>
        <DialogContent>
          {isLoading && <Progress />}
          {hasError && <Error errorMessage="Something went wrong :-(" />}
          <div>
            <div id="datePicker">
              <DateRangeInput
                minBookingDate={new Date()}
                displayFormat="yyyy-MM-dd"
                onDatesChange={(data) => {
                  dispatch({ type: "dateChange", payload: data });
                  setIsCalculateBtnDisabled(
                    data.startDate === null || data.endDate === null
                  );
                }}
                onFocusChange={(focusedInput) =>
                  dispatch({ type: "focusChange", payload: focusedInput })
                }
                startDate={state.startDate}
                endDate={state.endDate}
                focusedInput={state.focusedInput}
              />
            </div>

            {price && (
              <>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.days}
                >
                  Price for <b className={classes.daysUnderline}>{days}</b> days
                </Typography>
                <Typography variant="h4" className={classes.price}>
                  &pound;{parseFloat(price).toFixed(2)}
                </Typography>
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isCalculateBtnDisabled}
            onClick={getQuote}
            variant="contained"
            color="primary"
          >
            CALCULATE
          </Button>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
