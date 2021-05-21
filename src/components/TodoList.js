import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import {
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  TextField,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TodoList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const [title, setTitle] = useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    console.log(value);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    updateTodo(value);
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get("/")
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch(console.error);
  };

  const addTodo = () => {
    title !== "" &&
      axios
        .post("/", {
          title,
          status: "todo",
        })
        .then((res) => {
          console.log(res);
          setTodos([res.data, ...todos]);
          setTitle("");
        })
        .catch(console.error);
  };

  const deleteTodo = (value) => {
    axios
      .delete(`/${value}`)
      .then((res) => {
        console.log(res);
        setTodos(todos.filter((todo) => todo._id !== value));
      })
      .catch(console.error);
  };

  const updateTodo = (value) => {
    axios
      .put(`/${value._id}`, { status: "done" })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  return (
    <div onKeyPress={(e) => e.code === "Enter" && title !== "" && addTodo()}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={8}>
          <TextField
            label="Nouvelle tâche"
            variant="outlined"
            color="secondary"
            value={title}
            margin="dense"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item sm={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={addTodo}
            fullWidth
            size="large"
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <List className={classes.root}>
          {todos.map((todo) => {
            return (
              <ListItem
                key={todo._id}
                role={undefined}
                dense
                button
                // onClick={handleToggle(todo)}
              >
                <ListItemIcon>
                  <Tooltip
                    title={
                      todo.status !== "done"
                        ? "Marquer la tâche comme complète"
                        : ""
                    }
                  >
                    <Checkbox
                      edge="start"
                      checked={
                        checked.indexOf(todo) !== -1 || todo.status === "done"
                      }
                      tabIndex={-1}
                      disableRipple
                      onChange={handleToggle(todo)}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText id={todo._id} primary={todo.title} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => deleteTodo(todo._id)}>
                    <Tooltip title="Supprimer de la liste">
                      <DeleteIcon />
                    </Tooltip>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </div>
  );
}
