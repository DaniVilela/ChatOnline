# Usar una imagen base con Maven y JDK 17 para construir la aplicación
FROM maven:3.8.4-openjdk-17 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de configuración de Maven
COPY pom.xml .

# Descargar las dependencias del proyecto (esto permite el uso de la caché de Docker)
RUN mvn dependency:go-offline -B

# Copiar el resto de la aplicación
COPY src ./src

# Construir la aplicación
RUN mvn package -DskipTests

# Usar una imagen base más ligera para el runtime
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el JAR construido desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto que usará la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/app-0.0.1-SNAPSHOT.jar"]
