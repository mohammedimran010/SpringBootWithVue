# springboot-sample-app

This project demonstartes the basic idea of what Spring Boot and Vue CLI do.

Create React App helps you start a React project very quickly. It gives you all the basic things you need to get up and running asap.
Spring boot helps you start and maintain a spring application quickly and easily.

## Goals
1) Develop the frontend using VueJS
2) Develop the backend using Spring boot
3) Package the Frontend and backend in a single jar file

## Requirements

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)

## Running the application locally in development mode


1) Start the backend in development mode

There are several ways to run a Spring Boot application on your local machine. One way is to use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```

2) Start the frontend in development mode

```shell
cd src/main/ui
npm i
npm start
```
Please note that Vue CLI has built in support for development-time proxy’ing the API calls via the typical NodeJS port of 9999 over to your Spring Boot web controllers on port 8080. When running the packaged jar in production, etc you don’t need to use the proxy mechanism since the Spring Boot embedded web server will be serving up the frontend, React content.

Access the application at [http://localhost:9999](http://localhost:9999)



## Running the application locally in production mode


You can run the resulting jar just like any other Spring Boot app after having built it.

```shell
mvn package

java -jar target/vehicle-hiring-VERSION-SNAPSHOT.jar
```

Access the application at [http://localhost:8080](http://localhost:8080)
