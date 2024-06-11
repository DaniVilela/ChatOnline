package ChatOnline.app.ControllerWebSocket;


import ChatOnline.app.Entity.Message;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
@Controller
public class chatController {

    // Maneja el envío de mensajes desde el cliente al servidor
    @MessageMapping("/sendMessage")
    @SendTo("/topic/publicChat")
    public Message sendMessage(Message message) {
        // Procesa el mensaje recibido y lo envía a todos los clientes suscritos al canal '/topic/publicChat'
        return message;
    }
}
