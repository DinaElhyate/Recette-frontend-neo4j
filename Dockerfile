FROM node:14

WORKDIR /app

COPY src/App.js /app

EXPOSE 3000

CMD ["node", "App.js"]
