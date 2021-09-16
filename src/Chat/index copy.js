import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import FolderList from "./FolderList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  componentWrapper: {
    width: "600px",
    height: "80vh",
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
  },

  h3: {
    textAlign: "center",
  },
}));

function Chat() {
  const [messagesArray, setMessagesArray] = useState([]);

  const classes = useStyles();

  const onSendMessage = (messageText) => {
    setMessagesArray((prev) => [
      ...prev,
      {
        messageText,
        author: "me",
      },
    ]);
  };

  useEffect(() => {
    if (messagesArray.length > 0) {
      setTimeout(() => {
        console.log("Message was sent");
      }, 1000);
    }
  }, [messagesArray]);

  return (
    <div>
        <div className={classes.chatWrapper}>      
        <div>
          <h3 className={classes.h3}>name</h3>
          <div className={classes.componentWrapper}>
            <MessageList messagesArray={messagesArray} />
            <MessageInput onSendMessage={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
