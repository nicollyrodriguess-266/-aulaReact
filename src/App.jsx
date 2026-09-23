//importa o css
import "./App.css"

//Importanto nosso hook useState da biblioteca React 
//Ele permite amezenar valores e atualizar a tela automaticamente 

import { useState } from "react";
//  cria um componete principal da apricação 
function App() {

  //Estado responsavel por
  //  armazenar a cidade digitada 

  const [cidade, setCidade] = useState("");

  //Estado responsavel por armazernar a temperatura da cidade 
  const [temperatura, setTemperatura] = useState("");

  //Estado responsavel por armazernar a clima da cidade 
  const [clima, setClima] = useState("");

  //Estado responsavel por armazernar a Umidade da cidade 
  const [umidade, setUmidade] = useState("");

  //função executada quando o usuário clicar no botão "consultar"
  async function consultarClima() {
    if (cidade === "") {
      alert("digite uma cidade!");
      return;
    }
    try {
      const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=692ff1066a624bfd91a0a0fa013af6c2&units=metric&lang=pt_br`
      );
      //converte a resposta para JSON
      const dados = await resposta.json();

      if (dados.cod !== 200) {
        alert("Cidade não encontrada");
        return;
      }

      //atualiza a temperatura
      setTemperatura(dados.main.temp + "°C");
      //atualiza a condição climatica
      setClima(dados.weather[0].description);
      //atualiza a umidade
      setUmidade(dados.main.humidity + "%");
    } catch (erro) {
      console.log(erro);
      alert("erro ao consultar a API.");
    }
  }

  //importa a inteface visual do sistema 
  return (
    //container principal da aplicação
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial"

      }}>
      {/* Titulo Principal */}
      <h1>Sistema de previsão do tempo</h1>

      {/*Campo para digitação*/}

      <input
        //tipo do compo
        type="text"
        //Texto exibindo dentro da caixa
        placeholder="Digite uma cidade"

        //Valor vinculado ao estado cidade
        value={cidade}

        //Atualiza o estado quando o usuario digita
        onChange={(e) => setCidade(e.target.value)} />

      {/* Botão de consulta*/}
      <button

        //Executa a função consultarClima()
        onClick={consultarClima}

        style={{

          marginLeft: "10px"
        }}
      >
        {/* Texto exibido no botão */}
        Consultar

      </button>
      {/*Linha horizonatal para separar seções */}
      <hr />
      <h2>Cidade: {cidade}</h2>
      <h2>Temperatura: {temperatura} </h2>
      <h2>Clima: {clima}</h2>
      <h2>Umidade {umidade}</h2>

    </div>

  )
}
//Exporta o componete App para ser utilizad no React 
export default App; 