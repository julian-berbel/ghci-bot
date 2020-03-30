FROM node:10.15.3
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]