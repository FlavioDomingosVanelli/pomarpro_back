const conexao = require('../database/connection.database');

async function getMovimento() {
    try {
        const [linhas] = await conexao.query(`
           select * from tb_movimentacao
        
        `)
        console.log(linhas)
        return linhas;
    } catch (erro) {
        return erro;
    }
}

//Busca todos usuários pelo id
async function getMovimentoById() {
    try {
        const [linhas] = await conexao.query(`
           select * from tb_movimentacao where id = ?
        
        `[id])
        return linhas;

    } catch (erro) {
        return erro;
    }
}

//Insere um cadastro no banco de dados
async function addMovimento(tipo) {
    try {
        const [exec] = await conexao.query(`
           insert into tb_movimentacao(
            dt_movivent,
            tipo
           ) values(
               current_timestamp,?
           )
        
        `, [tipo])

        if (exec.affectedRows == 1) {
            const [linha] = await conexao.query(`
                        select last_insert_id() as id;
                    `)

            return linha[0];
        }
        return exec.affectedRows;
    } catch (erro) {
        return erro;
    }


}

async function addMov_Itens(produto,quantidade,movimentacao) {
    try {
        const [linhas] = await conexao.query(`
           insert into tb_mov_item(
           produto,
           movimentacao,
           quantidade
           )values(
            ?,?,?
           )
        
        `,[produto,movimentacao,quantidade])
        return linhas;

    } catch (erro) {
        return erro;
    }
}

//Função para buscar todos os cadastros do banco
async function buscaTodosMovimento() {
    //Estrutura de tentativa try..catch para
    //capturar error
    try {
        let [linhas] = await conexao.query(`
            select  
             u.id,
             u.dt_movivent,
             u.tipo,
            from tb_movimentacao u;
            `)

        //Retorna valores buscados do banco
        return linhas;

    } catch (e) {
        //Retorna o erro que aconteceu
        return e;
    }
}



module.exports = {
    getMovimento,
    getMovimentoById,
    addMovimento,
    addMov_Itens,
    buscaTodosMovimento

}