var express = require('express')
var app = express()

//Middleware that parse request with JSON payloads
app.use(express.json());
//For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api', (req, res) => {
    res.json({ message: "API connected" })
})

app.listen(5000, '0.0.0.0', () => {
    console.log('Server running in port 5000');
})