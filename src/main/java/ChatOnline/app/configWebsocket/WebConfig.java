package ChatOnline.app.configWebsocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // Usar allowedOriginPatterns en lugar de allowedOrigins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permitir los métodos HTTP necesarios
                .allowedHeaders("*") // Permitir todos los headers
                .allowCredentials(true); // Permitir credenciales
    }

}
