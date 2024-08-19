const conexao = require('../database/connection.database');

async function getProduto(){
    try{
        const [linhas] = await conexao.query(`
           select * from tb_produto
        
        `)
        console.log(linhas)
        return linhas;
    }catch(erro){
        return erro;
    }
}

//Busca todos produtos pelo id
async function getProdutoById(){
    try{
        const [linhas] = await conexao.query(`
           select * from tb_produto where id = ?
        
        `[id])
        return linhas;

    }catch(erro){
        return erro;
    }
}

//Insere um produto no banco de dados
async function addProduto(
    descricao,
    unid_medida,
    valor,
    tipo
){
    try{
        const [exec] = await conexao.query(`
           insert into tb_produto(
            descricao,
            unid_medida,
            valor,
            tipo
           ) values(
               ?,?,?,?
           )
        
        `,[descricao,unid_medida,valor,tipo])
        return exec.affectedRows;

    }catch(erro){
        return erro;
    }
            

}



//Função para buscar todos os produtos do banco
async function buscaTodosProdutos(){
    //Estrutura de tentativa try..catch para
    //capturar error
    try{
        let [linhas] = await conexao.query(`
            select  
             u.id,
             u.descricao,
             u.unid_medida,
             u.valor,
             u.tipo
            from tb_produto u;
            `)

//Retorna valores buscados do banco
        return linhas;

    }catch (e){
    //Retorna o erro que aconteceu
        return e;
    }
}



module.exports = {
    getProduto,
    getProdutoById,
    addProduto,
    buscaTodosProdutos

}