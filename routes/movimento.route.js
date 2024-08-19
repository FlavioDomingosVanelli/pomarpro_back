var express = require('express');
var router = express.Router();
const sql = require('../models/movimento.model')



//Insere um cadastro no banco de dados
router.post('/movimento',function(req,res){
    let info = req.body;
    sql.addMovimento(
      info.dt_movivent,
      info.tipo,
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
    sql.autenticaMovimento(
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
    console.log(dados)
    sql.addMovimento(dados.tipo).then((resposta)=>{
        console.log(resposta)
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }


      sql.addMov_Itens(
        dados.produto,
        dados.quantidade,
        resposta.id
      ).then((resposta2)=>{
        console.log(resposta2)
        if(resposta2 instanceof Error){
            res.status(500).json(resposta2);
            return;
          }
          res.status(201).json(resposta2);
      })




      
  
  
    })
  })
  
//Rota para buscar todos os materiais
router.get('/buscarTodos',(req,res)=>{
    sql.buscaTodosMovimento().then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(200).json(resposta);
    })
  
  
  })
  


module.exports = router;