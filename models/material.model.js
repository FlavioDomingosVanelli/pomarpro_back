const conexao = require('../database/connection.database');

async function getMateriais(){
    try{
        const [linhas] = await conexao.query(`
           select * from tb_materiais
        
        `)
        console.log(linhas)
        return linhas;
    }catch(erro){
        return erro;
    }
}

//Busca todos usuários pelo id
async function getMaterialById(){
    try{
        const [linhas] = await conexao.query(`
           select * from tb_materiais where id = ?
        
        `[id])
        return linhas;

    }catch(erro){
        return erro;
    }
}

//Insere um usuário no banco de dados
async function addMaterial(
    nome,
    valor,
    fornecedor,
tipo){
    try{
        const [exec] = await conexao.query(`
           insert into tb_materiais(
            nome,
            valor,
            fornecedor,
            tb_tipo_id
           ) values(
               ?,?,?,?
           )
        
        `,[nome,valor,fornecedor,tipo])
        return exec.affectedRows;

    }catch(erro){
        return erro;
    }
            

}



//Função para buscar todos os materiais do banco
async function buscaTodosMaterial(){
    //Estrutura de tentativa try..catch para
    //capturar error
    try{
        let [linhas] = await conexao.query(`
            select  
             u.id,
             u.nome,
             u.valor,
             u.tb_tipo_id,
             u.fornecedor
            from tb_materiais u;
            `)

//Retorna valores buscados do banco
        return linhas;

    }catch (e){
    //Retorna o erro que aconteceu
        return e;
    }
}



module.exports = {
    getMateriais,
    getMaterialById,
    addMaterial,
    buscaTodosMaterial

}