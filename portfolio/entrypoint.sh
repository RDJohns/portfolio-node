#!/bin/bash
#  chmod +x portfolio/entrypoint.sh
if [ "$APP_ENV" = 'development' ]; then 
  npm i && npm run dev; 
else 
  npm i && npm start; 
fi 