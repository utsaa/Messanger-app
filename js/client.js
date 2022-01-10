const socket= io('http://localhost:8000', {transports: ['websocket']});

const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio= new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    // console.log(`the nessage is ${messageElement} `);
    messageContainer.append(messageElement);
    if (position=='right'){
    audio.play();
    }
}

console.log("In client.js");
const name= prompt("Enter your name to join");
console.log(name);
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');

});

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'right');
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`, 'left');
    socket.emit('send',message);
    messageInput.value="";

});

socket.on('leave', name=>{
 append(`${name} left the chat`,'right')
});