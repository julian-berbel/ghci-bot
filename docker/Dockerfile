FROM node:14.16.0-alpine

COPY --from=docker:20.10.4 /usr/local/bin/docker /usr/local/bin/

WORKDIR /home/node/app

COPY package.json package-lock.json /home/node/app/
RUN npm i

COPY index.js .

ENTRYPOINT ["node", "index.js"]
