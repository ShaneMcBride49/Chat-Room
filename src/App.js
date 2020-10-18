import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap-theme/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import NavBarLogo from "./logo.png";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Chat />
    </div>
  );
}

function Navigation() {
  return (
    <div className="Navigation">
      <Navbar bg="primary" variant="dark" fixed="top">
        <Navbar.Brand href="#home">
          <h3>
            <Image src={NavBarLogo} width="50" height="43" />
            <b>Chat Room</b>
          </h3>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
let init = true;
let socket;
function Chat() {
  const [messageList, setMessageList] = useState([]);
  if (init) {
    socket = socketIOClient("http://localhost:4001");
    socket.on("updateMessages", (messages) => {
      setMessageList(messages);
    });
    // socket.on("connection", () => {
    //   socket.broadcast.emit("updateMessages");
    // });

    init = false;
  }
  socket.emit("getMessages");
  return (
    <div className="Chat">
      <body>
        <ListGroup id="messages">
          <AllMessages list={messageList} />
        </ListGroup>
        <MessageInput
          setMessageList={setMessageList}
          messageList={messageList}
          socket={socket}
        />
      </body>
    </div>
  );
} //<Message name="Shane McBride" message="Hello World!"/>
//

function AllMessages(messages) {
  if (messages.list != null && messages.list.message !== "") {
    var count = 0;
    return messages.list.map((i) => (
      <Message key={count++} name={i.name} message={i.message} />
    ));
  } else return <></>;
}
function Message(props) {
  if (props.sender != "" && props.message != "") {
    return (
      <React.Fragment>
        <ListGroup.Item>
          <b>Shane McBride: </b> {props.message}
        </ListGroup.Item>
      </React.Fragment>
    );
  } else {
    return <></>;
  }
}
function MessageInput(props) {
  const [messageInput, setMessageInput] = useState("");
  function handleClick(event) {
    event.preventDefault();

    props.setMessageList(
      props.messageList.concat([
        { sender: "Shane McBride", message: messageInput },
      ])
    );
    props.socket.emit(
      "updateMessages",
      props.messageList.concat([
        { sender: "Shane McBride", message: messageInput },
      ])
      );
      setMessageInput("");
  }
  return (
    <div className="ChatMessageInput">
      <Form onSubmit={handleClick}>
        <Navbar bg="dark " fixed="bottom">
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              id="messageInput"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Send a chat"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button as="input" type="submit" variant="primary" value="Send" />{" "}
            </InputGroup.Append>
          </InputGroup>
        </Navbar>
      </Form>
    </div>
  );
}

export default App;
/*
<InputGroup className="mb-3">
            <FormControl type="text" id="messageInput" placeholder="Send a chat" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <InputGroup.Append>
              <Button as="input" type="submit" variant="primary" value="Send" />{' '}
            </InputGroup.Append>
          </InputGroup>



*/
