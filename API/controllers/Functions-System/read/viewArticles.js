//funções externas
import getConnection  from '../../../data/connection.js'; //conexão com o banco de dados

//função assíncrona para visualizar todos os artigos
const getAllArticles = 
async (req, res)     => {
	//executa a conexão com o banco de dados
	

    try {
		// Pega uma conexão
        const connection = await getConnection();
		
        //chama a view pronta de visualização
        const query = `SELECT * FROM ViewAllArticle;`;

        //envia a query e retorna caso tenha dado certo
		const [results] = await connection.query(query);
		results;
    
        return res.status(200).json({results});
	}catch(error){
		//caso dê algo errado, retorna no console e avisa
		console.error("Algo deu errado ao visualizar os artigos, tente novamente:", error);
		return res.status(500).json({msg: "Ocorreu um erro interno no servidor, verifique e tente novamente."});
	};
};

export default getAllArticles;