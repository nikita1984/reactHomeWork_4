// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      maxWidth: 360,
      color: "#1976d2",
      cursor: "pointer"
      //backgroundColor: theme.palette.background.paper,
    },
  }));

const FolderList = ({chatsAray}) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {chatsAray.map((chat) => (
                <ListItem key={chat.id}>
                    <ListItemText primary={chat.name} />
                </ListItem>))
            }
        </List>
    );
};

export default FolderList;