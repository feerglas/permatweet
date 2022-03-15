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

### Arweave

To develop locally, you need to have the ArConnect browser extension installed with a fraction of arweave tokens in it to sign transactions. You can get the extension here: https://www.arconnect.io

## Deploy

The App ist automatically build and deployed on netlify:

https://permatweet.netlify.app/


## Todo
- Download Google Webfont and bundle together with app
- add date field from tweet as transaction tag
- integrate https://github.com/textury/arlocal as  local test-net for better dev-experience
- after getting tweet, check price for transaction and inform user
- if there is an error in "getAllTransaction" when checking after getting tweet, we need to inform user and disable store button
- implement PSC
- make data that is saved anonymous
- Enable Dependabot
- Add open graph properties to html head

## Work log
Friday, 11.03.2022, 5h
Saturday, 12.03.2022, 8h
Sunday, 13.03.2022, 8h
Monday, 14.03.2022, 5h
Tuesday, 15.03.2022, 2h

## General PST/PSC info (Profit Sharing Community/Token)

Create a PSC: https://community.xyz/

Smartweave Info: https://arwiki.wiki/#/en/smartweave

Smartweave Contract Guide: https://github.com/ArweaveTeam/SmartWeave/blob/master/CONTRACT-GUIDE.md

Smartweave Examples: https://github.com/ArweaveTeam/SmartWeave/tree/master/examples

Create PST Guide: https://github.com/ArweaveTeam/SmartWeave/blob/master/CREATE-PST.md

Info about the community.xyz smart contract:
https://github.com/CommunityXYZ/contract

JS-Library to interact with community.xyz contract
https://github.com/CommunityXYZ/community-js

## Permatweet PST

Ticker Symbol: PET

## Permatweet PSC

The PSC is owned by this address: ss2NwM4zojZRxJrKO6-WgINoVlibGhhSEKpUgfTBFtg

Permatweet PSC Contract Address:
X17XU4tx8Z-jnTcwv4-e8-4SxB9ihhyF8EfyUGGLRAc

Explore CurrentContract: https://viewblock.io/arweave/address/X17XU4tx8Z-jnTcwv4-e8-4SxB9ihhyF8EfyUGGLRAc

The Logo for the the PSC is deployed here:
http://arweave.net/PwLnzYGJqtBpJA68xqVGBHb_CzVGTVht4vmMHPo001A

Community can be viewed here:
https://community.xyz/#X17XU4tx8Z-jnTcwv4-e8-4SxB9ihhyF8EfyUGGLRAc


