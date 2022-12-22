FROM ubuntu:20.04

# Install dependencies & apps
RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/America/Bogota /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
ENV TZ="America/Bogota"
RUN apt-get -y update && apt-get install -y \
    openssh-server \
    iputils-ping \
    telnet \
    nano \
    nginx \
    curl \
    rsync  \
    grsync \
    vim

## Get latest Node JS
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Install Production Process Manager for Node.js
RUN npm install pm2 -g

# Add user
RUN useradd -G www-data,root -u 1000 -d /home/exegol exegol
RUN mkdir -p /home/exegol/.npm && \
    chown -R exegol:www-data /home/exegol && chmod -R 775 /home/exegol && \
    chown -R exegol:www-data /var/www/html && chmod -R 775 /var/www/html

#Nginx Config
RUN rm -f /etc/nginx/sites-enabled/default

# Run Services
COPY entrypoint.sh /home/exegol/entrypoint.sh
CMD ["/bin/bash", "/home/exegol/entrypoint.sh"]
RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config

#Extras
WORKDIR /var/www/html
