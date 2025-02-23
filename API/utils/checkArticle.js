import getConnection from "../data/connection";   // conexão com o banco de dados

//função para checar se o artigo existe
module.exports =
async function checkArticle(title){
    //executa a conexão com o banco de dados
    

    try{
        // Pega uma conexão
        const connection = await getConnection();

        // armazena a query que chama a view que retorna somente o ID, nickname e e-mail
        const query = "SELECT * FROM ViewAllArticle WHERE title_article=?;";
        const value = title; 
        
        //executa a query
        const [results] = await connection.query(query, value);
        if(results.length != 0){
            return false;
            
        }else{
            return true;
        }
    }catch(error){
        console.error("Algo deu errado ao checar se o artigo existe, tente novamente: ", error); 
        return res.status(500).json({ msg: "Algo deu errado na conexão com o servidor, tente novamente." });

    };
};
