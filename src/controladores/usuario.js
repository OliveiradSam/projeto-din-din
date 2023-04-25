const { knex } = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const usuarioExistente = await knex("usuarios").where({ email }).first();
        if (usuarioExistente) {
            return res.status(400).json("Já existe usuário cadastrado com o e-mail informado.");
        }

        const usuarioCriado = await knex("usuarios")
            .insert({ nome, email, senha: await bcrypt.hash(senha, 10) })
            .returning(["id", "nome", "email"])
            .first();

        return res.status(200).json(usuarioCriado);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const fazerLogin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json("Todos os campos são obrigatórios");
    }

    try {
        const usuario = await knex("usuarios").where({ email }).first();

        if (!usuario) {
            return res.status(400).json("Usuário e/ou senha inválido(s).");
        }

        const validarSenha = await bcrypt.compare(senha, usuario.senha);

        if (!validarSenha) {
            return res.status(400).json("Senha inválida.");
        }

        const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: "2h" });

        const { senha: _, ...registredUser } = usuario;

        return res.status(200).json({
            usuario: registredUser,
            token,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const criptografarSenha = async (senha) => {
    return await bcrypt.hash(senha, 10);
};

const detalharUsuario = async (req, res) => {
    return res.json(req.usuario);
};

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    if (!nome || !email || !senha) {
        return res.status(400).json("Todos os campos são obrigatórios");
    }

    try {
        const usuarioExistente = await knex("usuarios").where({ email }).whereNot({ id }).first();

        if (usuarioExistente) {
            return res.status(400).json("Já existe usuário cadastrado com o e-mail informado.");
        }

        const [updatedUser] = await knex("usuarios")
            .where({ id })
            .update({ nome, email, senha: await criptografarSenha(senha) })
            .returning(["id"]);

        if (!updatedUser) {
            return res.status(404).json("Usuário não encontrado");
        }

        return res.status(202).json("Usuário atualizado");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const listarCategorias = async (req, res) => {
    try {
        const categorias = await knex("categorias").select("*");
        return res.json(categorias);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario;
    const { filtro } = req.query;

    try {
        let transacoes = [];

        if (filtro) {
            for (let obj of filtro) {
                const rows = await knex
                    .select(
                        "t.id",
                        "t.tipo",
                        knex.raw("coalesce(t.descricao, 'sem descricao') as descricao"),
                        knex.raw("cast(t.valor as float)"),
                        "t.data_transacao as data",
                        "t.usuario_id",
                        "c.descricao as categoria_nome"
                    )
                    .from("transacoes as t")
                    .leftJoin("categorias as c", "c.id", "=", "t.categoria_id")
                    .where("t.usuario_id", id)
                    .andWhere("c.descricao", obj);

                if (rows.length > 0) {
                    transacoes.push(...rows);
                }
            }
        } else {
            const rows = await knex
                .select(
                    "t.id",
                    "t.tipo",
                    knex.raw("coalesce(t.descricao, 'sem descricao') as descricao"),
                    knex.raw("cast(t.valor as float)"),
                    "t.data_transacao as data",
                    "t.usuario_id",
                    "c.descricao as categoria_nome"
                )
                .from("transacoes as t")
                .leftJoin("categorias as c", "c.id", "=", "t.categoria_id")
                .where("t.usuario_id", id);

            transacoes = rows;
        }

        return res.json(transacoes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const detalharTransacoes = async (req, res) => {
    const usuario = req.usuario;
    const { id: transacao_id } = req.params;

    try {
        const transacao = await knex("transacoes")
            .select(
                "transacoes.id",
                "transacoes.tipo",
                knex.raw("coalesce(transacoes.descricao, 'sem descricao') as descricao"),
                knex.raw("cast(transacoes.valor as float)"),
                "transacoes.data_transacao as data",
                "transacoes.usuario_id",
                "categorias.descricao AS categoria_nome"
            )
            .leftJoin("categorias", "categorias.id", "transacoes.categoria_id")
            .where("transacoes.usuario_id", usuario.id)
            .andWhere("transacoes.id", transacao_id)
            .first();

        if (!transacao) {
            return res.status(404).json("Transação não encontrada");
        }

        return res.status(200).json(transacao);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body;
    const { id: usuario_id } = req.usuario;

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
        return res.status(400).json("Todos os campos são obrigatórios");
    }

    const trx = await knex.transaction();

    try {
        const [transacao] = await trx("transacoes")
            .insert({
                tipo,
                descricao,
                valor,
                data_transacao: data,
                usuario_id,
                categoria_id,
            })
            .returning("*");

        const [categoria] = await trx("categorias").select("descricao").where("id", categoria_id);

        await trx.commit();

        return res.status(201).json({
            ...transacao,
            categoria_nome: categoria.descricao,
        });
    } catch (error) {
        await trx.rollback();
        return res.status(500).json(error.message });
    };

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.usuario;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        const user = await knex("usuarios").where("id", id).first();

        if (!user) {
            return res.status(404).json("Usuário não encontrado");
        }

        const queryId = req.params.id;
        const updatedRows = await knex("transacoes").where("id", queryId).update({
            descricao,
            valor,
            data_transacao: data,
            categoria_id,
            tipo,
        });

        if (!updatedRows) {
            return res.status(404).json("Transação não encontrada");
        }

        return res.status(202).json("Transação atualizada");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deletarTransacao = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.usuario.id;

  try {
    const transacao = await knex('transacoes')
      .where({ id, usuario_id })
      .first();

    if (!transacao) {
      return res.status(400).json("Transação não encontrada");
    }

    const deleted = await knex('transacoes')
      .where({ id })
      .del();

    if (deleted) {
      return res.status(202).json("Transação deletada");
    } else {
      throw new Error('Erro ao deletar transação');
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const extratoTransacoes = async (req, res) => {
    const { id } = req.usuario;

    try {
        const transacoes = await knex.select("*").from("transacoes").where({ usuario_id: id });

        const entrada = somarTransacoes(transacoes, "entrada");
        const saida = somarTransacoes(transacoes, "saida");

        return res.json({ entrada, saida });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    cadastrarUsuario,
    fazerLogin,
    atualizarUsuario,
    detalharUsuario,
    listarCategorias,
    listarTransacoes,
    detalharTransacoes,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao,
    extratoTransacoes
};
