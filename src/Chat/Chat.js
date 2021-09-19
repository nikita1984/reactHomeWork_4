import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

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

function Chat(props) {
    const { chatId } = useParams();
  
    const classes = useStyles();
  
    // useEffect(() => {
    //   if (messagesArray.length > 0) {
    //     setTimeout(() => {
    //       console.log("Message was sent");
    //     }, 1000);
    //   }
    // }, [messagesArray]);
  
    const getChat = () => {
      for (let chat of props.chats) {
        if (chat.id === chatId){
          return chat;
        } 
      };
    };
  
    const chat = getChat();
  
    if (!chat) {
      return (<div>
        <h3>Указанный чат не найден.</h3>
        <h3>Выбери любой доступный чат</h3>
        </div> );
    }
  
    return (<div>
        <div className={classes.chatWrapper}>
          <div>
            <h3 className={classes.h3}>{chat.name}</h3>
            <div className={classes.componentWrapper}>
              <MessageList messagesArray={chat.mesages} />
              <MessageInput chat={chat} onSendMessage={props.onSendMessage} />
            </div>
          </div>
        </div>
    </div>);
    ;
  }

  export default Chat;