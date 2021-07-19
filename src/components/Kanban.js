import React, { useState } from "react";
// import Column from "./Column";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

export default function Kanban() {
  const [tasks, /*setTasks*/] = useState({
    "task-1": { id: "task-1", title: "Task 1", wtatus: "todo" },
    "task-2": { id: "task-2", title: "Task 2", wtatus: "todo" },
    "task-3": { id: "task-3", title: "Task 3", wtatus: "doing" },
    "task-4": { id: "task-4", title: "Task 4", wtatus: "done" },
  });
  const [columns, /*setColumns*/] = useState({
    "column-1": {
      id: "column-1",
      title: "Column 1",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": { id: "column-2", title: "Column 2", taskIds: ["task-3"] },
    "column-3": { id: "column-3", title: "Column 3", taskIds: ["task-4"] },
  });
  const [columnOrder, /*setColumnOrder*/] = useState([
    "column-1",
    "column-2",
    "column-3",
  ]);

  const classes = useStyles();

  return (
    <div>
      {columnOrder.map((columnId) => {
        const column = columns[columnId];
        const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

        // return <Column key={columnId} column={column} tasks={columnTasks} />;
        return (
          <Card className={classes.root}>
            <CardHeader title={column.title} />
            <CardContent>
              <List>
                {columnTasks.map((task) => (
                  <ListItem key={task.id} role={undefined} dense button>
                    <ListItemText id={task.id} primary={task.title} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        );
      })}
    </div>
  );
}
