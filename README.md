[![Netlify Status](https://api.netlify.com/api/v1/badges/e2879cf9-93d8-4de0-b049-b2aa851f6045/deploy-status)](https://app.netlify.com/sites/epic-chandrasekhar-6e7cd4/deploys)

# permatweet

Store specific tweets on the Arweave blockchain on demand.

## Develop

### Node version

Make sure to use the node version specified in `.nvmrc` either by using tools like nvm, asdf or similar or by installing the corresponding node version manually.

### Install dependencies

Run `npm install` to install all dependencies.

### Run locally

To run the app locally, run `npm run dev`.

### Production build

To statically build the assets for production, run `npm run generate`.

### Twitter integration

Tweets can be fetched by calling a lambda function on netlify by providing the tweet-id as a parameter:

https://permatweet.netlify.app/.netlify/functions/twitter?id=1502265834328240145

If you want to run the lambda function locally, you need to start the netlify dev-environment by running `npm run netlify:dev` instead of `npm run dev`. Then, the function will be available here:

http://localhost:8888/.netlify/functions/twitter?id=1502265834328240145

Keep in mind, that you need an `.env` file with the `TWITTER_API_BAERER` variable defined to get the function working locally.

## Deploy

The App ist automatically build and deployed on netlify:

https://permatweet.netlify.app/


## Todo
- Download Google Webfont and bundle together with app
- add favicon
