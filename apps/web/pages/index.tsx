import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

export default function Home() {
    const [text, setText] = useState("");
    const [id, setId] = useState("");
    const [message, setMessage] = useState<string[]>([]);
    const handlepost = () => {
        socket.emit("send message", { post: text });
    };

    socket.on("your id", (data) => {
        setId(data);
    });
    socket.on("message", (data) => {
        setMessage([...message, data.post]);
    });
    return (
        <div>
            <input type="text" onChange={(e) => setText(e.target.value)} />
            <button onClick={handlepost}>Send massage </button>
            <p>id: {id}</p>
            <p>message:</p>
            {message.map((p, index) => (
                <li key={index}>{p}</li>
            ))}
        </div>
    );
}
