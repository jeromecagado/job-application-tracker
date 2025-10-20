# Step 1: Use a lightweight JDK base image
FROM eclipse-temurin:17-jdk

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy the built jar file from your host
COPY target/*.jar app.jar

# Step 4: Expose Spring Boot’s port
EXPOSE 8080

# Step 5: Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
