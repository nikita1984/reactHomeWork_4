import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
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
    height: "800px",
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
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
    <div className={classes.chatWrapper}>
      <div className={classes.componentWrapper}>
        <MessageList messagesArray={messagesArray} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
