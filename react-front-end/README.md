# Steps to set up

docker build --no-cache -t takijunchik-app .
docker run -p 8080:8080 takijunchik-app

go to web browser and check: localhost:8080

SEEMS THAT FIREBASE IS IN THE FRONT END RIGHT AWAY, IT DOESNT EVEN NEED A BACKEND. DONT KNOW WHY I DEVELOPED A SECOND DATABASE LOCALLY WITH MARIADB