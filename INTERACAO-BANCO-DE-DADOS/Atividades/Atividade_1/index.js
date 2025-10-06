const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_Atividade_1', 'root', '', (
    (
        {
            host: 'localhost',
            dialect: 'mysql'    
        }
    )
));

const Funcionarios = sequelize.define('Funcionarios', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 

    rg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    
    matricula:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    dataNascimento: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    
    salario:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const Produto = sequelize.define(`Produto`, {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }, 
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    validade: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

const Cliente = sequelize.define(`Cliente`, {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dataNascimento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProtocoloAtendimento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

});


const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});


app.get('/Funcionarios', async (req, res) => {
    const funcionarios = await Funcionarios.findAll();
    res.json(funcionarios);
});

app.post('/Funcionario', async (req, res) => {
    try {
        const { nome, cpf, rg, matricula, dataNascimento, salario, telefone, email } = req.body;

        const funcionarios = await Funcionarios.create({
            nome,
            cpf,
            rg,
            matricula,
            dataNascimento,
            salario,
            telefone,
            email
        });

        res.status(201).json(funcionarios);
    } catch (error) {
        console.error('Erro ao criar funcionário:', error);
        res.status(400).json({ error: 'Erro, funcionario já cadastrado' });
    }
});

app.get ('/Produto', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
});

app.post('/Produto', async (req, res) => {
    try {
        const { nome, lote, validade } = req.body;
        const produtos = await Produto.create({ nome, lote, validade });
        res.status(201).json(produtos);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(400).json({ error: 'Erro, produto já cadastrado' });
    }  
});

app.get ('/Cliente', async (req, res) => {
    const clientes = await Cliente.findAll();
    res.json(clientes);
});
app.post('/Cliente', async (req, res) => {
    try {
        const { nome, dataNascimento, ProtocoloAtendimento } = req.body;
        const clientes = await Cliente.create({ nome, dataNascimento, ProtocoloAtendimento });
        res.status(201).json(clientes);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(400).json({ error: 'Erro, cliente já cadastrado' });
    }
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`🚀API rodando em http://localhost:${port}`);
        console.log('🚀Conectado ao banco de dados MySQL.');
    });
}).catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
});