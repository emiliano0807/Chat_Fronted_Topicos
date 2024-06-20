import {io} from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'
const url = 'http://localhost:3000'
const url2 = 'https://chat-api-topicos.onrender.com'

const users=["Irbin", "Goku", "Paco", "Angel", "Emiliano", "Angela Aguilar", "Emilio", "Vicente Fox", "Lord Peña", "AMLO"]

const getUsername=()=>{
    const randomUser= Math.floor(Math.random() * users.length);
    return users[randomUser];
}
let socket = io(url2,{
    auth: {
        username: getUsername(),
        serverOffset: 0
    }
})
const form = document.getElementById('form')
const input = document.getElementById('message')
const messages = document.getElementById('chat')


socket.on('chat message', (msg, sender, serverOffset)=>{
    socket.auth.serverOffset= serverOffset
    const item = document.createElement('li');
    const msgg= [`<strong>${sender}:</strong> <br>${msg}</br>`, `${msg}`];
    item.innerHTML = (sender=== socket.auth.username)? msgg[1] : msgg[0];
    

    if(sender=== socket.auth.username){
        item.classList.add('message-right')
    }else{
        item.classList.add('message-left')
    }
    messages.appendChild(item)
    messages.scrollTop = messages.scrollHeight
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value) {
        socket.emit('chat message', input.value, socket.auth.username, socket.auth.serverOffset)
        input.value = ""
    }
})
