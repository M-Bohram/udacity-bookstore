# build environment
FROM node:13.14.0-alpine as build

WORKDIR /app

COPY frontend .
RUN npm install

RUN npm run build

# production environment
FROM node:13.14.0-alpine
WORKDIR /app

COPY --from=build /app/build build
COPY backend .

RUN npm install

EXPOSE 5000
CMD ["node", "index.js"]