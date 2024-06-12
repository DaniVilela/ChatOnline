# Etapa de construcción
FROM maven:3-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTest

# Etapa de ejecución
FROM openjdk:17-ea-28-jdk-slim
WORKDIR /app
COPY --from=build /app/target/app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar","app.jar"]