import getConnection  from '../../../data/connection.js';       //conexão com o banco de dados
import checkXp     from '../../../utils/checkXp.js';         //checar e modificar o xp,level e quest do usuário

// função de modificação de level do usuário que pode ser exportada
const updateLevel = 
async (req, res) => {  //função assíncrona com parâmetros de requisição e resposta
    
    const userID = req.user.id;  //pegando o id do usuário pelo token
    const {type, xp_material,peso} = req.body
    //pegando os dados a serem modificados
    const dados = await checkXp(userID, type, xp_material, peso); // variável responsável por armazenar os dados
    
       // variável que armazena a execução de conexão com o banco de dados
    
    const xp    = dados[0]; //armazenando o xp do usuário
    const level = dados[1]; //armazenando o level do usuário
    const quest = dados[2]; //armazenando a quest do usuário
        
    //try catch para modificar o level do usuário
    try{
        // Pega uma conexão
        const connection = await getConnection();
        
        // query para modificar o level do usuário  
        const query  = "CALL ModifyLevelUser(?, ?, ?, ?);";
        const values = [userID, xp, level, quest];

        // envio de query e captação de resposta
        const results = await connection.query(query, values);
        results;
        
        res.status(200).json({msg:"Level atualizado com sucesso."});
    } catch(error){
        console.error(error);
        res.status(500).json({ msg: "Algo deu errado na conexão com o servidor, tente novamente." });
    };
};

export default updateLevel;