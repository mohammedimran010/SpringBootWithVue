import { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";

import Progress from "../Progress";
import Error from "../Error";
import VehicleCard from "../Vehicle";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const VIEW_ALL = "ALL";
  const VIEW_HIRED = "ON_HIRE";
  const VIEW_AVAILABLE = "AVAILABLE";
  const DEFAULT_VIEW = VIEW_AVAILABLE;
  const [view, setView] = useState(DEFAULT_VIEW);
  const [filteredResults, setFilteredResults] = useState([]);

  const getVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/vehicle?showHired=true");
      const data = await response.data;
      setVehicles(data);

      const available = data.filter((vehicle) => getHireStatus(vehicle));
      setFilteredResults(available);
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getVehicles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHireStatus = (vehicle, available) => {
    const status = vehicle.hireStatus;
    const hasCustomer = status.customer !== null;
    const hasStartDate = status.startDate !== null;
    const hasEndDate = status.endDate !== null;

    if (available) {
      return hasCustomer && hasStartDate && hasEndDate;
    }
    return !hasCustomer && !hasStartDate && !hasEndDate;
  };

  const handleViewChange = (event) => {
    const value = event.target.value;
    setView(value);

    if (value === VIEW_ALL) {
      setFilteredResults(vehicles);
    } else if (value === VIEW_AVAILABLE) {
      const available = vehicles.filter((vehicle) => getHireStatus(vehicle));
      setFilteredResults(available);
    } else if (value === VIEW_HIRED) {
      const onHire = vehicles.filter((vehicle) => getHireStatus(vehicle, true));
      setFilteredResults(onHire);
    }
  };

  return (
    <Grid item xs={12} sm={10} className={classes.root}>
      {isLoading && <Progress />}
      {hasError && <Error errorMessage="Something went wrong :-(" />}
      {filteredResults.length > 0 && (
        <>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <FormControl>
                <InputLabel id="view-select-label">View</InputLabel>
                <Select value={view} onChange={handleViewChange}>
                  <MenuItem value={VIEW_ALL}>All</MenuItem>
                  <MenuItem value={VIEW_AVAILABLE}>Available</MenuItem>
                  <MenuItem value={VIEW_HIRED}>On Hire</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={getVehicles}>
                Refresh
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {filteredResults.map((vehicle) => (
              <Grid item xs={12} sm={3} key={vehicle.id}>
                <VehicleCard vehicle={vehicle} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Home;
