FROM node:8.3-alpine

RUN mkdir -p /home/nodejs/budgetapp
WORKDIR /home/nodejs/budgetapp

RUN npm install express

COPY dist/ /home/nodejs/budgetapp
COPY server.js /home/nodejs/budgetapp

CMD ["node", "server.js"]
