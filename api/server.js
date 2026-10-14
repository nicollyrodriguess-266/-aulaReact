import express from "express";

import cors from "cors";
//importa o módulo FS (file system)
//esse módulo permite ler e escrever arquivos utilizando JavaSrcipt
import fs from "fs";

//importa a conexão criada com o firabase
import db from "./firebase.js";

import {
    ref,
    push
}from "firebase/database"
import { json } from "stream/consumers";

const app = express();

app.use(cors());

//permite que a apii receba e interpreste dados no formato json
app.use(express.json());

let historico = [];

//verifica se o hitórico json existe. Caso exista, os dados são armazenados para dentro do vetor histórico
if (fs.existsSync(".api/historico.json")){
    //lê o conteúdo do arquvivo  
    const dadosArquivo = fs.readFileSync(
        "./api/historico.json",
        "utf8"
    );

    try{
        if(dadosArquivo.trim()!== ""){
            //converte JSON do arquivo para um array javascript
            historico = JSON.parse(dadosArquivo);
        }else{
            historico = [];
        }
    }catch{
        historico = [];
 
    }
}

app.get("/historico", (req, res) => {
    res.json(historico);

});

app.post("/historico", async(req, res) => {
    historico.push(res.body)
    const referenciaFirebase = ref (
        db, 
        "historico");

    await push(
    referenciaFirebase,
    req.body
    );

    const historicoJSON = JSON.stringify(
    historico,
    null,
    2);
    
    //salva os dados atualizados no arquivo histórico.JSON
    fs.writeFileSync(
        "./api/historico.JSON",
        historicoJSON
    );

    res.JSON ({
        mensagem: "consuta salva"
    });
})