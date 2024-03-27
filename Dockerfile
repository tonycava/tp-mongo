FROM node:18.16-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY ./prisma /app/prisma

RUN yarn install

COPY . .

RUN yarn exec svelte-kit sync
RUN npx prisma generate
RUN yarn build

CMD ["yarn", "start"]