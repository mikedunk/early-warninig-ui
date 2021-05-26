const  express = require('express');
const history = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || 5005;

app.use(history());
app.use(express.static(__dirname + '/dist'));
app.listen(port);
console.log('server started '+ port);