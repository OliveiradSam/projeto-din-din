const express = require("express");
const knex = require("knex");

const roteador = express();

const knex = require('knex')({
    client: "pg",
    connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "sam88614017",
        database: "dindin",
    },
});

module.exports = { roteador, knex };
