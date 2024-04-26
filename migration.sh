#!/bin/sh
#  chmod +x migration.sh 
# Set the Docker container name
CONTAINER_NAME="portfolio-back-end"

# Run Sequelize migration
docker exec -it $CONTAINER_NAME npx sequelize-cli db:migrate

# Run Sequelize seed
docker exec -it $CONTAINER_NAME npx sequelize-cli db:seed:all
