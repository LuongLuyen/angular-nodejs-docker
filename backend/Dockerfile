FROM node:14-alpine AS builder

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:14-alpine

WORKDIR /app/backend


COPY --from=builder /app/backend/package*.json ./
RUN npm install --production

# ENV TOKEN=Zabcdefghijklmnopqrstuvwxyz
# ENV USER=root
# ENV PASS=luyen123
# ENV DB_HOST=localhost
# ENV DATABASE=qltb
# ENV DB_PORT=3306


COPY --from=builder /app/backend/build ./build

EXPOSE 8080

CMD [ "node", "build/index.js" ]
# tao repository dockerhub node-be
# docker build -f Dockerfile -t node-be .
# docker tag node-be luyen2003/node-be:latest
# docker push luyen2003/node-be:latest



# docker run -p 8080:8080 -d node-be
