import { Grid } from "@material-ui/core";
import Header from "../Header";
import Home from "../Home";

const App = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={1}></Grid>
        <Home />
        <Grid item xs={false} sm={1}></Grid>
      </Grid>
    </Grid>
  );
};

export default App;
