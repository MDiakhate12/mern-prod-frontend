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
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

export default function Column({ column, tasks }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={column.title} />
      <CardContent>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} role={undefined} dense button>
              <ListItemText id={task.id} primary={task.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
