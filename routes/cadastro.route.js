var express = require('express');
var router = express.Router();
const sql = require('../models/cadastro.model')



//Insere um cadastro no banco de dados
router.post('/cadastro',function(req,res){
    let info = req.body;
    sql.addCadastro(info.nome,
      info.apelido,
      info.num_linha,
      info.num_coluna
     ).then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(201).json(resposta);
    })
  })



  //Tentativa de login
  router.post('/autenticar',function(req,res){
    sql.autenticaCadastro(
      req.body.usuario,
      req.body.senha).then ((resposta)=>{
        if(resposta instanceof Error){
          res.status(500).json(reposta)
          return
        }
        if(resposta.length ==0){
          res.status(401).json({mensagem:"Não Autenticado"})
          return
        }
        res.status(200).json(resposta);
  
      }) 
  })




  //Adiciona o cadastro
router.post('/add',(req,res)=>{
    //Guarda as informações em uma variavel para
    //Facilitar o acesso
    let dados = req.body.info;
    sql.addCadastro(
      dados.apelido,
      dados.num_linha,
      dados.num_coluna
    ).then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(201).json(resposta);
  
  
    })
  })
  
//Rota para buscar todos os materiais
router.get('/buscarTodos',(req,res)=>{
    sql.buscaTodosCadastro().then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(200).json(resposta);
    })
  
  
  })
  


module.exports = router;