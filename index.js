
//#region conexão mongodb

const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('connection success!');
})

//#endregion 

// #region criar schema

const pessoaSchema = new mongoose.Schema({
    nome: String, 
    idade: Number,
    profissao: String,
});

//#endregion

//#region criar model

const Pessoa = mongoose.model("Pessoa", pessoaSchema);

const jhonata = new Pessoa({
    nome: 'Jhonata',
    idade: 23,
    profissao: 'Desenvolvedor'
});

//#endregion

//#region inserir dados

jhonata.save(function(err){
    if (err) {
        console.log(err);
    }
})

//#endregion

//#region encontrar dados

Pessoa.findOne( {nome: 'Jhonata'}, function(err, pessoa) {
    console.log(pessoa);
})

//#endregion

//#region Inserindo diversos dados

Pessoa.insertMany([
    {
	  nome: 'Jhow',
	  idade: 28,
	  profissao: 'Engenheiro'
    },
	   {
	  nome: 'Marina',
	  idade: 23,
	  profissao: 'Cozinheira'
    },
	   {
	  nome: 'Paulo',
	  idade: 26,
	  profissao: 'Mecanico'
    },
    {
	  nome: 'Edna',
	  idade: 45,
	  profissao: 'Professora'
    },
	{
	  nome: 'Arteiro',
	  idade: 44,
	  profissao: 'Cozinheiro'
    },
])

//#endregion

//#region resgatar varios dados

async function getPessoas() {
    const pessoas = await Pessoa.find({}).exec();
    console.log(pessoas);
}

getPessoas();

//#endregion

//#region deletar registro

async function getPessoa(nome) {
    const pessoa = await Pessoa.find({nome: nome}).exec();
    if (pessoa.length === 0) {
        console.log('not found')
    } else {
        console.log(pessoa);
    }
}

getPessoa('Marina');

Pessoa.deleteOne({nome: 'Marina'}).exec(); // esse é o comando

getPessoa('Marina');

//#endregion

//#region atualizar dados

Pessoa.updateOne({nome: "Arteiro"}, {profissao: "Hotelaria"}).exec();

getPessoa('Arteiro')

//#endregion

//#region Utilização do Where

async function getPessoaByNomeIdade(nome, idade) {
    const pessoa = await Pessoa
                            .where('idade').gte(idade)
                            .where('nome', nome)
                            .exec();
    if (pessoa.length == 0) {
        console.log('não encontrou');
    } else {
        console.log(pessoa);
    }
}

getPessoaByNomeIdade('Paulo', 25);

//#endregion
