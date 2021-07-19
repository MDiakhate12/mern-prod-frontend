import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Box,
  createMuiTheme,
  CssBaseline,
  makeStyles,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import TodoList from "./components/TodoList";
import PropTypes from "prop-types";
import Kanban from "./components/Kanban";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "darkorange",
  },
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

  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  console.log(process.env.REACT_APP_BACKEND_URL);
  console.log(axios.defaults);

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="Todo List" />
          <Tab label="Kanban" />
        </Tabs>

        <Paper className={classes.jumbotron}>
          <Typography variant="h3" align="center">
            Todo List & Kanban
          </Typography>
        </Paper>

        <TabPanel value={value} index={1}>
          <Kanban />
        </TabPanel>
      </Paper>
    </ThemeProvider>
  );
}

export default App;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
