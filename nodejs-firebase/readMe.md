#This folder is for temporary processing files of mp3 and eaf docker 

build --no-cache -t takijunchik-backend .

# for monitoring
docker run -p 3000:3000 -v $(pwd):/app takijunchik-backend

# to interact wiht the docker nodejs container
docker exec -it <container-name> ash
