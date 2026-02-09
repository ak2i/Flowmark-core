FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY bin ./bin
COPY src ./src
COPY docs/guides ./docs/guides

WORKDIR /work

ENTRYPOINT ["node", "/app/bin/flowmark.js"]
CMD ["--help"]
