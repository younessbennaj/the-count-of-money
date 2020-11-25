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
                username: "johndoe",
                currency: "EUR",
                listCrypto: [
                    "Bitcoin",
                    "Ethereum",
                    "XRP",
                    "Tether",
                    "BitcoinCash"
                ],
                tags: [
                    "blockchain",
                    "bitcoin",
                    "cryptotrading"
                ]

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
    rest.get('/crypto', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    "data": [
                        {
                            "id": 1,
                            "name": "Bitcoin",
                            "symbol": "BTC",
                            "slug": "bitcoin",
                            "cmc_rank": 1,
                            "num_market_pairs": 500,
                            "circulating_supply": 17200062,
                            "total_supply": 17200062,
                            "max_supply": 21000000,
                            "last_updated": "2018-06-02T22:51:28.209Z",
                            "date_added": "2013-04-28T00:00:00.000Z",
                            "tags": [
                                "mineable"
                            ],
                            "platform": null,
                            "quote": {
                                "USD": {
                                    "price": 1818.1818,
                                    "volume_24h": 7155680000,
                                    "percent_change_1h": -0.152774,
                                    "percent_change_24h": 0.518894,
                                    "percent_change_7d": 0.986573,
                                    "market_cap": 158055024432,
                                    "last_updated": "2018-08-09T22:53:32.000Z"
                                },
                                "BTC": {
                                    "price": 1,
                                    "volume_24h": 772012,
                                    "percent_change_1h": 0,
                                    "percent_change_24h": 0,
                                    "percent_change_7d": 0,
                                    "market_cap": 17024600,
                                    "last_updated": "2018-08-09T22:53:32.000Z"
                                }
                            }
                        },
                        {
                            "id": 1,
                            "name": "Etherum",
                            "symbol": "ETC",
                            "slug": "bitcoin",
                            "cmc_rank": 1,
                            "num_market_pairs": 500,
                            "circulating_supply": 17200062,
                            "total_supply": 17200062,
                            "max_supply": 21000000,
                            "last_updated": "2018-06-02T22:51:28.209Z",
                            "date_added": "2013-04-28T00:00:00.000Z",
                            "tags": [
                                "mineable"
                            ],
                            "platform": null,
                            "quote": {
                                "USD": {
                                    "price": 2019.1818,
                                    "volume_24h": 7155680000,
                                    "percent_change_1h": -0.152774,
                                    "percent_change_24h": -0.518894,
                                    "percent_change_7d": 0.986573,
                                    "market_cap": 158055024432,
                                    "last_updated": "2018-08-09T22:53:32.000Z"
                                },
                                "BTC": {
                                    "price": 1,
                                    "volume_24h": 772012,
                                    "percent_change_1h": 0,
                                    "percent_change_24h": 0,
                                    "percent_change_7d": 0,
                                    "market_cap": 17024600,
                                    "last_updated": "2018-08-09T22:53:32.000Z"
                                }
                            }
                        },
                        {
                            "id": 1,
                            "name": "Autre",
                            "symbol": "AUT",
                            "slug": "bitcoin",
                            "cmc_rank": 1,
                            "num_market_pairs": 500,
                            "circulating_supply": 17200062,
                            "total_supply": 17200062,
                            "max_supply": 21000000,
                            "last_updated": "2018-06-02T22:51:28.209Z",
                            "date_added": "2013-04-28T00:00:00.000Z",
                            "tags": [
                                "mineable"
                            ],
                            "platform": null,
                            "quote": {
                                "USD": {
                                    "price": 1818.1818,
                                    "volume_24h": 7155680000,
                                    "percent_change_1h": 0.152774,
                                    "percent_change_24h": 0.518894,
                                    "percent_change_7d": -0.986573,
                                    "market_cap": 158055024432,
                                    "last_updated": "2018-08-09T22:53:32.000Z"
                                },
                                "BTC": {
                                    "price": 1,
                                    "volume_24h": 772012,
                                    "percent_change_1h": 0,
                                    "percent_change_24h": 0,
                                    "percent_change_7d": 0,
                                    "market_cap": 17024600,
                                    "last_updated": "2018-08-09T22:53:32.000Z"
                                }
                            }
                        }
                    ],
                    "status": {
                        "timestamp": "2019-04-02T22:44:24.200Z",
                        "error_code": 0,
                        "error_message": "",
                        "elapsed": 10,
                        "credit_count": 1
                    }

                }
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