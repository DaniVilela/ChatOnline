let messageInput = document.getElementById("messageInput");
let btnSend = document.getElementById("sendButton");
let userInput = document.getElementById("user");

//ajusta la altura del textarea
function adjustHeight(element) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
}
adjustHeight(messageInput);


//--------CONEXION DE WEB SOCKET-----------||
// Define una variable para el cliente Stomp que manejará la conexión WebSocket
let stompClient = null;

function connect() {
// Establece una conexión SockJS al endpoint '/chat' del servidor WebSocket
    let socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
  // Suscribe al cliente a un canal específico '/topic/publicChat' para recibir mensajes
     stompClient.subscribe('/topic/publicChat', function (response) {
            showMessage(JSON.parse(response.body));
        });
    });
}

function sendMessage() {
    let messageContent = messageInput.value.trim();
    let user= "";
    if(userInput.value.trim() == ""){
        user = "|---Anónimo---|";
    }else{
        user = "|---"+userInput.value.trim()+"---|";
    }
    if (messageContent && stompClient) {
        let message = { content: messageContent, sender: user };
        stompClient.send("/app/sendMessage", {}, JSON.stringify(message)); //envía el mensaje
        messageInput.value = '';
    }
}

// Función para mostrar un mensaje en el chat
function showMessage(message) {
 // Obtiene el área de chat del DOM
    let chatArea = document.querySelector('.chat-area');
    let messageElement = document.createElement('p');
    messageElement.textContent = message.sender + ":   " + message.content;
    chatArea.appendChild(messageElement);
}

// Conectar al WebSocket cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    connect();
});
// Event listener para el botón de enviar mensaje
btnSend.addEventListener('click', function () {
    sendMessage();
});


