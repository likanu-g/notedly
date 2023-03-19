const express = require('express');
const app = express();
app.get('/', (req, rep) => rep.send('Hello world'));
app.listen(4000, () => console.log('Listening on port 4000!'));
