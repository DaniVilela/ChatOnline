let messageInput = document.getElementById("messageInput");
let btnSend = document.getElementById("sendButton");
function adjustHeight(element) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
}
// Call the function initially to set the correct height
adjustHeight(messageInput);


//--------CONEXION DE WEB SOCKET-----------||
// Define una variable para el cliente Stomp que manejará la conexión WebSocket
let stompClient = null;

// Función para establecer la conexión WebSocket con el servidor backend
function connect() {
// Establece una conexión SockJS al endpoint '/chat' del servidor WebSocket
    let socket = new SockJS('/chat');

   // Crea el cliente Stomp a partir del socket
    stompClient = Stomp.over(socket);

 // Conecta el cliente Stomp al servidor WebSocket
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
    if (messageContent && stompClient) {
        let message = { content: messageContent, sender: 'User' };
        stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
        messageInput.value = '';
    }
}

// Función para mostrar un mensaje en el chat
function showMessage(message) {
 // Obtiene el área de chat del DOM
    let chatArea = document.querySelector('.chat-area');

  // Crea un elemento 'p' para mostrar el mensaje
    let messageElement = document.createElement('p');

// Asigna el contenido del mensaje al elemento 'p'
    messageElement.textContent = message.sender + ': ' + message.content;

  // Agrega el mensaje al área de chat
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


