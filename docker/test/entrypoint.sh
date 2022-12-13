#!/bin/bash

service ssh start

#cd /var/www/html && pm2 --name exegol-biz --error /home/exegol/logs/exegol-biz-error.log start npm -- start

nginx -g "daemon off;"