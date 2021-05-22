import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import TodoList from "./components/TodoList";

const useStyles = makeStyles((theme) => ({
  jumbotron: {
    padding: theme.spacing(1),
    margin: "auto",
    marginTop: theme.spacing(1),
    maxWidth: "90%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    maxWidth: 500,
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  // axios.defaults.baseURL = `${
  //   !(
  //     process.env.REACT_APP_BACKEND_URL.startsWith("http") ||
  //     process.env.REACT_APP_BACKEND_URL.startsWith("https")
  //   )
  //     ? "http://"
  //     : ""
  // }${process.env.REACT_APP_BACKEND_URL}`;

  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
  axios.defaults.headers.common["Content-Type"] = "application/json";

  console.log(process.env.REACT_APP_BACKEND_URL);
  console.log(axios.defaults);

  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Paper className={classes.jumbotron}>
          <Typography variant="h3" align="center">
            Todo List
          </Typography>
        </Paper>

        <Paper className={classes.paper}>
          <TodoList />
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
