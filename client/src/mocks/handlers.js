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
                        "id": "ethereum",
                        "name": "Ethereum",
                        "current_price": 421.59,
                        "high_24h": 505.4,
                        "low_24h": 412.04,
                        "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
                        "allowed": true,
                        "myCrypto": false
                    },
                    {
                        "id": "tether",
                        "name": "Tether",
                        "current_price": 0.843038,
                        "high_24h": 0.84733,
                        "low_24h": 0.832405,
                        "image": "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
                        "allowed": true,
                        "myCrypto": false
                    }
                ]
            ),
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