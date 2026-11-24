FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production NODE_NO_WARNINGS=1 PORT=8080 DB_FILE=/data/jadual.db
COPY server/ ./server/
EXPOSE 8080
CMD ["node", "server/server.js"]
