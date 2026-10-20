//conectando a API ao Firebase. Realtime Database

import{ initializeApp } from "firebase/app";

//importa a função responsável por conectar o realtime database
import{ getDatabase } from "firebase/app";

//configuração do projeto Firebase. Essas informações são gerasas automaticamente pelo9 Firebase quando registramos a nossa aplicação. Elas funcionam como um endereço que permite que nossas aplicação encontre e se conecte ao banco de dados na nuvem

const firebaseConfig = {
    //identificador unico do aplicativo
    apikey: "AIzaSyAKEdzqmfzrjuRdriA6NXxoY0NCHkYIHcc",

    //dominio de autenticação do projeto
    authDomain: "aulareact-76d38.firebaseapp.com",
    //endereço do realtime database
    databaseURL: "https://aulareact-76d38-default-rtdb.firebaseio.com",
    //identificador do projeto firebase
    projectId: "aulareact-76d38",
    //serviço de armazenamento de arquivos
    storageBucket: "aulareact-76d38.firebasestorage.app",
    //identificador responsavel pela troca de mensagens
    messagingSenderId: "889826496457",
    //identificador unico da aplicação web
    appId: "1:889826496457:web:b8d5840a29b7f6894f6218",
    //identificador utilizado pelo google analitics
    measurementId: "G-4N5HH6SC2V"
};
 
//inicialização do firebase utilizanfo as configurações acima
const app = initializeApp(firebaseConfig);
//a partir deste objeto, será possível: ler dados, salvar dados, atualizar dados, excluir dados  
const db = getDatabase(app);


//exporta a conexão para que ela possa ser utilizada em outros arquivos, como o server.js
export default db;