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
                cryptocurrencies: [
                    "Bitcoin",
                    "Ethereum",
                    "XRP",
                    "Tether",
                    "BitcoinCash",
                    "Chainlink",
                    "Litecoin",
                    "Cardano",
                    "Polkadot",
                    "BinanceCoin"
                ],
                tags: [
                    "blockchain",
                    "crypto",
                    "cryptocurrency",
                    "ethereum",
                    "bitcoin",
                    "cryptotrading"
                ]

            })
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
                                    "price": 9283.92,
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
]