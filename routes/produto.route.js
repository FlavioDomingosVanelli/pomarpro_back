var express = require('express');
var router = express.Router();
const sql = require('../models/produto.model')



//Insere um produto no banco de dados
router.post('/produto',function(req,res){
    let info = req.body;
    sql.addProduto(info.nome,
      info.descricao,
      info.unid_medida,
      info.valor,
      info.tipo
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
    sql.autenticaProduto(
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




  //Adiciona o produto
router.post('/add',(req,res)=>{
    //Guarda as informações em uma variavel para
    //Facilitar o acesso
    let dados = req.body.info;
    sql.addProduto(
      dados.descricao,
      dados.unid_medida,
      dados.valor,
      dados.tipo
    ).then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(201).json(resposta);
  
  
    })
  })
  
//Rota para buscar todos os produtos
router.get('/buscarTodos',(req,res)=>{
    sql.buscaTodosProdutos().then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(200).json(resposta);
    })
  
  
  })
  


module.exports = router;