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
]