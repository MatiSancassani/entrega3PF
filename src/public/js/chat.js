const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let messageLogs = document.getElementById('messageLogs');
let data;

socket.on('message',  msg => {
    data = msg ;
})

socket.on('messageLogs',  msgs => {
   render(msgs);
})

const render = (msgs) =>{
    let messages = "";
    msgs.forEach(message => {
        const currentUser = message.user === user;    
        const messageClass = currentUser ? 'Mymessage' : 'Othermessage';
        messages = messages = `<div class="${messageClass}">${message.user}: ${message.message}</div>` 
    });
    messageLogs.innerHTML += messages;    
}

Swal.fire ({
    title: 'Identification',
    input: 'text',
    text: 'Enter your name',
    allowOutsideClick: false
}).then(response => {
    if(response.isConfirmed) {
        user = response.value;
        render(data);
    }
})



chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            const message = chatBox.value;
            socket.emit('message', {user, message});
            chatBox.value = '';
        }
    }
});

socket.on('newUser', ()=> {
    Swal.fire({
        text: "New user connected",
        toast: true,
        position: "top-right"
    });
})