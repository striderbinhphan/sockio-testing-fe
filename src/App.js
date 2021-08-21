import React, {  useEffect,  useState } from 'react';
import './App.css';
import io from "socket.io-client";
let socket;
const host = "https://socketio-testing.herokuapp.com";
// const host = "http://localhost:3030"
function App() {
  const [msg, setMsg]  = useState("");
  useEffect(function(){
    
    //socket connection
    socket = io(host);
    socket.on('sendDataServer', dataGot => {
        console.log(dataGot.data);
        // dispatch({
        //     type:"post-review",
        //     payload:{
        //         newReview: dataGot.data.content
        //     }
        // })
    }) // mỗi khi có tin nhắn thì mess sẽ được render thêm 

    return () => {
      socket.disconnect();
    };
},[]);
  const sendMessage= ()=>{
    console.log(msg);
    socket.emit("sendDataClient",msg);
  }
  const handleMessageChanged = (e) =>{
    setMsg(e.target.value);
  }
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={(e)=>handleMessageChanged(e)}></input>
        <button onClick={sendMessage}>send</button>

      </header>
    </div>
  );
}

export default App;
