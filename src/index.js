
const port = 3000

const express = require("express");
const roteador = require("./rotas");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(roteador);
app.listen(port,()=> console.log(`listen port ${port}`));
