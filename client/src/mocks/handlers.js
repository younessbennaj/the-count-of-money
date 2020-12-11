import { rest } from 'msw';

export const handlers = [
    //Fake route to authenticate the user
    rest.post('/users/register', (req, res, ctx) => {
        return res(
            // Respond with a 200 status code
            ctx.json({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIn0.BSCkIEqh_8F1ru0UHq1e6gn6ZGfkorjZ-ZljU-YziOU" }),
            ctx.status(200),
        )
    }),
    rest.post('/users/login', (req, res, ctx) => {
        return res(
            // Respond with a 200 status code
            ctx.json({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIn0.BSCkIEqh_8F1ru0UHq1e6gn6ZGfkorjZ-ZljU-YziOU" }),
            ctx.status(200),
        )
    }),
    rest.get('/users/profile', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                mail: "john.doe@email.com",
                nickname: "johndoe",
                currencies: "EUR",
                listCrypto: [
                    "Bitcoin",
                    "Ethereum",
                    "XRP",
                    "Tether",
                    "BitcoinCash"
                ],
                listWeb: [
                    "blockchain",
                    "bitcoin",
                    "cryptotrading"
                ],
                "right": 1
            })
        )
    }),
    rest.put('/users/profile', (req, res, ctx) => {
        console.log(req.body);
        return res(
            ctx.status(200),
            ctx.json({ message: "profile updated" })
        )
    }),
    rest.get('/user', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        const isAuthenticated = sessionStorage.getItem('is-authenticated')
        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                }),
            )
        }
        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json({
                username: 'admin',
            }),
        )
    }),
    rest.get('/hello', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'hello world !',
            }),
        )
    }),
    rest.get('/cryptos/bitcoin', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    "id": "bitcoin",
                    "symbol": "btc",
                    "name": "Bitcoin",
                    "asset_platform_id": null,
                    "block_time_in_minutes": 10,
                    "hashing_algorithm": "SHA-256",
                    "categories": [
                        "Cryptocurrency"
                    ],
                    "public_notice": null,
                    "additional_notices": [],
                    "description": {
                        "en": "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is design to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>."
                    },
                    "links": {
                        "homepage": [
                            "http://www.bitcoin.org",
                            "",
                            ""
                        ],
                        "blockchain_site": [
                            "https://blockchair.com/bitcoin/",
                            "https://btc.com/",
                            "https://btc.tokenview.com/",
                            "",
                            ""
                        ],
                        "official_forum_url": [
                            "https://bitcointalk.org/",
                            "",
                            ""
                        ],
                        "chat_url": [
                            "",
                            "",
                            ""
                        ],
                        "announcement_url": [
                            "",
                            ""
                        ],
                        "twitter_screen_name": "btc",
                        "facebook_username": "bitcoins",
                        "bitcointalk_thread_identifier": null,
                        "telegram_channel_identifier": "",
                        "subreddit_url": "https://www.reddit.com/r/Bitcoin/",
                        "repos_url": {
                            "github": [
                                "https://github.com/bitcoin/bitcoin",
                                "https://github.com/bitcoin/bips"
                            ],
                            "bitbucket": []
                        }
                    },
                    "image": {
                        "thumb": "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
                        "small": "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
                        "large": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                    },
                    "country_origin": "",
                    "genesis_date": "2009-01-03",
                    "sentiment_votes_up_percentage": 68.29,
                    "sentiment_votes_down_percentage": 31.71,
                    "market_cap_rank": 1,
                    "coingecko_rank": 1,
                    "coingecko_score": 84.752,
                    "developer_score": 101.371,
                    "community_score": 88.055,
                    "liquidity_score": 100.137,
                    "public_interest_score": 0.191,
                    "public_interest_stats": {
                        "alexa_rank": 9440,
                        "bing_matches": null
                    },
                    "status_updates": [],
                    "last_updated": "2020-11-26T09:58:24.352Z"
                }
            ),
        )
    }),
    rest.get('/cryptos', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        "id": "bitcoin",
                        "name": "Bitcoin",
                        "current_price": 15918.21,
                        "high_24h": 16101.3,
                        "low_24h": 15772.68,
                        "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "ethereum",
                        "name": "Ethereum",
                        "current_price": 500.59,
                        "high_24h": 511.36,
                        "low_24h": 495.88,
                        "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
                        "allowed": true,
                        "myCrypto": false
                    },
                    {
                        "id": "ripple",
                        "name": "XRP",
                        "current_price": 0.509069,
                        "high_24h": 0.526228,
                        "low_24h": 0.503837,
                        "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "tether",
                        "name": "Tether",
                        "current_price": 0.822601,
                        "high_24h": 0.828638,
                        "low_24h": 0.822157,
                        "image": "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
                        "allowed": true,
                        "myCrypto": false
                    },
                    {
                        "id": "litecoin",
                        "name": "Litecoin",
                        "current_price": 72.13,
                        "high_24h": 74.61,
                        "low_24h": 71.33,
                        "image": "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "bitcoin-cash",
                        "name": "Bitcoin Cash",
                        "current_price": 245.94,
                        "high_24h": 250.69,
                        "low_24h": 234.94,
                        "image": "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1594689492",
                        "allowed": true,
                        "myCrypto": true
                    },
                    {
                        "id": "chainlink",
                        "name": "Chainlink",
                        "current_price": 11.3,
                        "high_24h": 11.67,
                        "low_24h": 11.17,
                        "image": "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "cardano",
                        "name": "Cardano",
                        "current_price": 0.132283,
                        "high_24h": 0.137181,
                        "low_24h": 0.130472,
                        "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
                        "allowed": true,
                        "myCrypto": true
                    },
                    {
                        "id": "polkadot",
                        "name": "Polkadot",
                        "current_price": 4.37,
                        "high_24h": 4.58,
                        "low_24h": 4.29,
                        "image": "https://assets.coingecko.com/coins/images/12171/large/aJGBjJFU_400x400.jpg?1597804776",
                        "allowed": true,
                        "myCrypto": true
                    },
                    {
                        "id": "binancecoin",
                        "name": "Binance Coin",
                        "current_price": 24.95,
                        "high_24h": 25.59,
                        "low_24h": 24.88,
                        "image": "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "stellar",
                        "name": "Stellar",
                        "current_price": 0.151164,
                        "high_24h": 0.155873,
                        "low_24h": 0.14932,
                        "image": "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "bitcoin-cash-sv",
                        "name": "Bitcoin SV",
                        "current_price": 154.63,
                        "high_24h": 160.9,
                        "low_24h": 138.55,
                        "image": "https://assets.coingecko.com/coins/images/6799/large/BSV.png?1558947902",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "usd-coin",
                        "name": "USD Coin",
                        "current_price": 0.821794,
                        "high_24h": 0.827623,
                        "low_24h": 0.81797,
                        "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
                        "allowed": true,
                        "myCrypto": false
                    },
                    {
                        "id": "eos",
                        "name": "EOS",
                        "current_price": 2.55,
                        "high_24h": 2.58,
                        "low_24h": 2.49,
                        "image": "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png?1547034481",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "monero",
                        "name": "Monero",
                        "current_price": 110.89,
                        "high_24h": 111.44,
                        "low_24h": 105.87,
                        "image": "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1547033729",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "wrapped-bitcoin",
                        "name": "Wrapped Bitcoin",
                        "current_price": 15916.62,
                        "high_24h": 16098.95,
                        "low_24h": 15786.88,
                        "image": "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1548822744",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "tron",
                        "name": "TRON",
                        "current_price": 0.02590603,
                        "high_24h": 0.02635188,
                        "low_24h": 0.02542265,
                        "image": "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066",
                        "allowed": false,
                        "myCrypto": false
                    },
                    {
                        "id": "nem",
                        "name": "NEM",
                        "current_price": 0.201659,
                        "high_24h": 0.209891,
                        "low_24h": 0.170844,
                        "image": "https://assets.coingecko.com/coins/images/242/large/NEM_Logo_256x256.png?1598687029",
                        "allowed": true,
                        "myCrypto": false
                    },
                    {
                        "id": "tezos",
                        "name": "Tezos",
                        "current_price": 1.98,
                        "high_24h": 2.02,
                        "low_24h": 1.92,
                        "image": "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862",
                        "allowed": true,
                        "myCrypto": false
                    }
                ]
            ),
        )
    }),
    rest.post('/cryptos', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ message: "Cryptos updated" })
        )
    }),
    rest.get('/articles', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "source": {
                        "id": "business-insider",
                        "name": "Business Insider"
                    },
                    "author": "snagarajan@businessinsider.com (Shalini Nagarajan)",
                    "title": "'Big Short' investor Michael Burry, the man who predicted the 2008 housing collapse, dumped these 5 stocks from his portfolio in the third quarter",
                    "description": "Burry's largest holding is still Alphabet, but he ditched 50% of his call position in the Google parent, according to a 13F filing.",
                    "url": "https://www.businessinsider.com/big-short-investor-michael-burry-ditched-stocks-13f-q3-2020-11",
                    "urlToImage": "https://images2.markets.businessinsider.com/5fb778b450e71a0011556642?format=jpeg",
                    "publishedAt": "2020-11-20T09:20:19Z",
                    "content": "Astrid Stawiarz/Getty Images\r\n\"Big Short\" money manager Michael Burry ditched about 50% of his bullish options positions in Alphabet and Facebook in the third quarter, according to a 13F filed with t… [+1938 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "CoinDesk"
                    },
                    "author": "Omkar Godbole",
                    "title": "Ether Trades Above $500 for the First Time Since July 2018",
                    "description": "Ethereum's native token ether has jumped to 28-month highs, taking year-to-date gains to nearly 290%.",
                    "url": "https://www.coindesk.com/ether-breaks-500",
                    "urlToImage": "https://static.coindesk.com/wp-content/uploads/2020/11/eth-500-1200x628.png",
                    "publishedAt": "2020-11-20T09:10:03Z",
                    "content": "Ethereum’s native cryptocurrency ether has jumped to 28-month highs, taking year-to-date gains to nearly 290%.\r\n<ul><li>The second-largest cryptocurrency by market value crossed above $500 soon befor… [+624 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Rlslog.net"
                    },
                    "author": "sCar",
                    "title": "Cypherpunks To 20k/Btc : The Rise Of The Cypherpunks, Cryptography, Bitcoin, Bitcoin Mining & Blockchain | 3 Books In 1-P2P",
                    "description": "THIS BOOK CONTAINS 3 MANUSCRIPTS: •BOOK 1 – BITCOIN IS BLOCKCHAIN AND HERE IS WHY! •BOOK 2 – LEARN FAST WHY BITCOIN IS THE INVENTION OF THE 21ST CENTURY •BOOK 3 – THE ADVENTURES OF THE CYPHERPUNK BILLIONAIRE CRYPTOREBEL Should You Read This Book? Bitcoin, Bit…",
                    "url": "http://www.rlslog.net/cypherpunks-to-20kbtc-the-rise-of-the-cypherpunks-cryptography-bitcoin-bitcoin-mining-blockchain-3-books-in-1-p2p/",
                    "urlToImage": "https://files.coincolony.net/wp-content/uploads/2020/11/bitcoin-addresses-2.jpg",
                    "publishedAt": "2020-11-20T06:36:11Z",
                    "content": "THIS BOOK CONTAINS 3 MANUSCRIPTS:BOOK 1 – BITCOIN IS BLOCKCHAIN AND HERE IS WHY!BOOK 2 – LEARN FAST WHY BITCOIN IS THE INVENTION OF THE 21ST CENTURYBOOK 3 – THE ADVENTURES OF THE CYPHERPUNK BILLIONAI… [+419 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "CoinDesk"
                    },
                    "author": "Omkar Godbole",
                    "title": "Ether Trades Above $500 for the First Time Since July 2018",
                    "description": "Ethereum's native token ether has jumped to 28-month highs, taking year-to-date gains to nearly 290%.",
                    "url": "https://www.coindesk.com/ether-breaks-500",
                    "urlToImage": "https://static.coindesk.com/wp-content/uploads/2020/11/eth-500-1200x628.png",
                    "publishedAt": "2020-11-20T09:10:03Z",
                    "content": "Ethereum’s native cryptocurrency ether has jumped to 28-month highs, taking year-to-date gains to nearly 290%.\r\n<ul><li>The second-largest cryptocurrency by market value crossed above $500 soon befor… [+624 chars]"
                }
            ]),
        )
    }),
    rest.get('/article/1', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    "source": {
                        "id": "business-insider",
                        "name": "Business Insider"
                    },
                    "author": "snagarajan@businessinsider.com (Shalini Nagarajan)",
                    "title": "'Big Short' investor Michael Burry, the man who predicted the 2008 housing collapse, dumped these 5 stocks from his portfolio in the third quarter",
                    "description": "Burry's largest holding is still Alphabet, but he ditched 50% of his call position in the Google parent, according to a 13F filing.",
                    "url": "https://www.businessinsider.com/big-short-investor-michael-burry-ditched-stocks-13f-q3-2020-11",
                    "urlToImage": "https://images2.markets.businessinsider.com/5fb778b450e71a0011556642?format=jpeg",
                    "publishedAt": "2020-11-20T09:20:19Z",
                    "content": "Astrid Stawiarz/Getty Images\r\n\"Big Short\" money manager Michael Burry ditched about 50% of his bullish options positions in Alphabet and Facebook in the third quarter, according to a 13F filed with t… [+1938 chars]"
                }
            ),
        )
    }),
]