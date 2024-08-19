const conexao = require('../database/connection.database');

async function getCadastro(){
    try{
        const [linhas] = await conexao.query(`
           select * from tb_pomar
        
        `)
        console.log(linhas)
        return linhas;
    }catch(erro){
        return erro;
    }
}

//Busca todos usuários pelo id
async function getCadastroById(){
    try{
        const [linhas] = await conexao.query(`
           select * from tb_pomar where id = ?
        
        `[id])
        return linhas;

    }catch(erro){
        return erro;
    }
}

//Insere um cadastro no banco de dados
async function addCadastro(
    apelido,
    num_linha,
    num_coluna,
tipo){
    try{
        const [exec] = await conexao.query(`
           insert into tb_pomar(
            apelido,
            num_linha,
            num_coluna
           ) values(
               ?,?,?
           )
        
        `,[apelido,num_linha,num_coluna])
        return exec.affectedRows;

    }catch(erro){
        return erro;
    }
            

}



//Função para buscar todos os cadastros do banco
async function buscaTodosCadastro(){
    //Estrutura de tentativa try..catch para
    //capturar error
    try{
        let [linhas] = await conexao.query(`
            select  
             u.id,
             u.apelido,
             u.num_linha,
             u.num_coluna
            from tb_pomar u;
            `)

//Retorna valores buscados do banco
        return linhas;

    }catch (e){
    //Retorna o erro que aconteceu
        return e;
    }
}



module.exports = {
    getCadastro,
    getCadastroById,
    addCadastro,
    buscaTodosCadastro

}