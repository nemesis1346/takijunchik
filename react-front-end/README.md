# Steps to set up

docker build --no-cache -t takijunchik-app .
docker run -p 8080:8080 takijunchik-app

go to web browser and check: localhost:8080