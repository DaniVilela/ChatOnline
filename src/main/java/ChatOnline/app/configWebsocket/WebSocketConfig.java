package ChatOnline.app.configWebsocket;


import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker //habilita websocket y el enrutamiento de mensajes
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    // Configura el sistema de mensajería WebSocket
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Habilita un broker simple para enviar mensajes a los clientes en un canal específico
        registry.enableSimpleBroker("/topic");
        // Especifica el prefijo de destino de los mensajes enviados por los clientes
        registry.setApplicationDestinationPrefixes("/app");
    }

    // Registra el endpoint del servidor WebSocket
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Agrega el endpoint '/chat' y habilita el protocolo SockJS
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}
