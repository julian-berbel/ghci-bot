FROM node:14.16.0

RUN wget -qO- https://get.docker.com/ | sh

WORKDIR /home/node/app

COPY package.json package-lock.json /home/node/app/
RUN npm i

COPY index.js .

ENTRYPOINT ["node", "index.js"]
