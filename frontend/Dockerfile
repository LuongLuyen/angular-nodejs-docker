FROM node:18-alpine AS builder

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/frontend/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# tao repository dockerhub angular-fe
# docker build -f Dockerfile -t angular-fe .
# docker tag angular-fe luyen2003/angular-fe:latest
# docker push luyen2003/angular-fe:latest




# docker run -p 80:80 -d angular-fe
