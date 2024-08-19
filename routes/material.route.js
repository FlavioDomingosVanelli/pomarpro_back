var express = require('express');
var router = express.Router();
const sql = require('../models/material.model')



//Insere um usuário no banco de dados
router.post('/material',function(req,res){
    let info = req.body;
    sql.addMaterial(info.nome,
      info.nome,
      info.valor,
      info.tb_tipo_id,
      info.fornecedor
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
    sql.autenticaMaterial(
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




  //Adiciona o material
router.post('/add',(req,res)=>{
    //Guarda as informações em uma variavel para
    //Facilitar o acesso
    let dados = req.body.info;
    sql.addMaterial(
      dados.nome,
      dados.valor,
      dados.fornecedor,
      dados.tipo
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
    sql.buscaTodosMaterial().then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(200).json(resposta);
    })
  
  
  })
  


module.exports = router;