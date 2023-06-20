import React, { useEffect, useState } from "react";
import { useGetChatGptMutation } from "../../api/api";
import AvatarChatBot from "../../img/avatarChatBot.jpg";
import AvatarTestUser from "../../img/avatarTestUser.jpg";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [textChat, { isLoading, isSuccess }] = useGetChatGptMutation();
  const handleInputChange = async (event) => {
    setNewMessage({
      role: "user",
      text: event.target.value,
    });
  };

  useEffect(() => {
    if (newMessage.text) {
      textChat({
        textChat: newMessage.text,
      })
        .unwrap()
        .then((res) => {
          let newMessage = {
            role: "bot",
            text: res.text,
          };
          setMessages([...messages, newMessage]);
        });
    }
    setNewMessage({ text: "" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.text.trim() !== "") {
      console.log(newMessage.text);
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <>
      <div className="flex-grow w-[300px] p-4 ">
        {isLoading && <div>Loading...</div>}
        {messages.map((message, index) => (
          <div key={index} className="mb-2 ">
            {message.role === "bot" && (
              <div className="flex">
                <img className="h-[40px] w-[40px]" src={AvatarChatBot} />
                <p className="ml-[5%] break-words whitespace-pre-line">
                  {message.text}
                </p>
              </div>
            )}
            {message.role === "user" && (
              <div className="flex">
                <img className="h-[40px] w-[40px]" src={AvatarTestUser} />
                <p className="ml-[5%]">{message.text}</p>
              </div>
            )}
          </div>
        ))}
        {/* {isLoading && <div>loading...</div>} */}
      </div>
      <div className="border-t p-4  w-full ">
        <input
          type="text"
          value={newMessage.text}
          onChange={handleInputChange}
          className="w-full border p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatBox;
