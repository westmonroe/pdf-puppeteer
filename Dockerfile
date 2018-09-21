FROM buildkite/puppeteer:latest

ENV PATH="${PATH}:/usr/src/app/node_modules/.bin"

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV PORT 3000
EXPOSE $PORT

CMD [ "npm", "start" ]
