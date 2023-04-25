const { knex } = require("../conexao");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

const autenticar = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Não autorizado.");
    }

    try {
        const token = authorization.replace("Bearer ", "");

        const { id } = jwt.verify(token, secret);

        const usuario = await knex("usuarios").where({ id }).first();

        if (!usuario) {
            return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
        }

        const { senha: _, ...userData } = usuario;

        req.usuario = userData;

        next();
    } catch (error) {
        if (error.message === "invalid signature") {
            return res.status(401).json("Para acessar este recurso um token de autenticação válido deve ser enviado.");
        }
        return res.status(500).json(error.message);
    }
};

module.exports = autenticar;
