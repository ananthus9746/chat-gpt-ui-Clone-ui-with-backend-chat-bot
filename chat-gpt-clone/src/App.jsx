import { useState, useEffect } from "react";
import "./App.css";
import { BsFillSendFill } from "react-icons/bs";
import React, { useRef } from "react";
import { FaUserAlt, FaRobot } from "react-icons/fa";

function App() {
  const mailtoLink = `mailto:ananthus.ann@example.com`;

  const [message, setMessage] = useState(null);
  const [value, setValue] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const messageContainerRef = useRef(null);

  // New chat button  it will earese all values
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitile) => {
    setCurrentTitle(uniqueTitile);
    setMessage(null);
    setValue("");
  };

  const getMeesages = async () => {
    const option = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:8000/completions", option);
      const data = await response.json();
      console.log("Bot response..", data.message);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("currentTitle..", currentTitle);
  //Storeing all chats in one array and setting state for "AnanthuGPT" log to hide if there is not chat/value
  useEffect(() => {
    console.log(" currentTitle, value, message", currentTitle, value, message);
    if (!currentTitle && value && message) {
      console.log("if= NO currentTitle.vlaue:", currentTitle);
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      console.log("Else= yes currentTitle.vlaue:", currentTitle);
      //Setting all chats in one array
      setPreviousChats((prevChats) => [
        ...prevChats,
        { title: currentTitle, role: "user", content: value },
        { title: currentTitle, role: message.role, content: message.content },
      ]);
    }
  }, [message, currentTitle]);
  console.log("previousChat", previousChats);
  //Current chat for feed
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title == currentTitle
  );
  //Getting unique title from previousChat the unique title is the user input question example if user input "hello" "hello" two time it only give one title  and its for chat history section
  const uniqueTitiles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  console.log("uniqueTitiles..", uniqueTitiles);

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    console.log("useEffect triggered");
    if (messageContainerRef.current) {
      console.log("Scrolling to bottom");
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [previousChats]);

  return (
    <>
      <div className="app">
        {/* SIDE BAR */}
        <section className="side_bar">
          <button onClick={createNewChat}> + New chat</button>
          {/* HISTORY */}
          <ul className="history">
            {uniqueTitiles.map((uniqueTitile, index) => (
              <li onClick={() => handleClick(uniqueTitile)} key={index}>
                {uniqueTitile}
              </li>
            ))}
          </ul>
          <nav>
            <p>Made by ananthus.ann@gmail.com</p>
          </nav>
        </section>
        <section className="main">
          {!currentTitle && <h1 className="name">AnanthuGPT</h1>}

          <ul className="feed" ref={messageContainerRef}>
            {/* MESSAGE FEED */}
            {currentChat.map((chatMessage, index) => (
              <li key={index}>
                {chatMessage.role === "user" ? (
                  <div className="user">
                    <FaUserAlt />
                    <p>{chatMessage.content}</p>
                  </div>
                ) : (
                  <div className="bot">
                    <FaRobot />
                    <p>{chatMessage.content}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* USER INPUT */}
          <div className="bottom_section">
            <div className="input_container">
              <input value={value} onChange={(e) => setValue(e.target.value)} />
              <div id="submit" onClick={getMeesages}>
                <BsFillSendFill size={23} />
              </div>
            </div>

            <p className="info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              voluptas facere, nisi autem voluptate hic! Cum repellendus autem
              ducimus! Deleniti dolore ea, ipsam voluptatum aperiam pariatur sed
              developed by Ananthu Email:{" "}
              <a className="email" href={mailtoLink}>
                {" "}
                ananthus.ann@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
