#!/bin/bash
container_id=$(docker ps -q -f name='takijunchik-api')
docker exec -it $container_id bash