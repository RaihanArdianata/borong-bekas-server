const app = require('../app')
const http = require('http')
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('listening port', PORT);
})