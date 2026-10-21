//Importa o css
import "./App.css"
 
//Importando hook useState da biblioteca React
//Ele permite armazenar valores e atualizar
// valores automaticamente
import {useState} from "react";
 
//Cria o componente principal da aplicação
function App(){
 
  // Estado responsável por armazenar a cidade digitada
  const [cidade, setCidade] = useState("");
  // Estado responsável por armazenar a temperatura digitada
  const [temperatura, setTemperatura] = useState("");
 
  // Estado responsável por armazenar a clima digitada
  const [clima, setClima] = useState("");
 
  // Estado responsável por armazenar a umidade digitada
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
      
      //Atualiza a temperatura
      setTemperatura(dados.main.temp + "°C");
 
      //Atualiza a condição climática
      setClima(dados.weather[0].description);
 
      setUmidade(dados.main.humidity + "%");
 
      //CONTEÚDO DA AULA 29/09
      //Enviando dados do React para uma API própria utilizando o método post
 
      // Faz a requisção para a API de histórico criada por você
      await fetch ("http://localhost:3000/historico", {
       
        //Define o método HTTP utilizado
        method: "POST",
 
        //Informa que os dados enviados estrão em formato json
        headers: {
          "Content-Type": "application/json"
        },
 
        //Converte o objeto Javascript para JSON
        body: JSON.stringify({
         
          //Envia o nome da cidade consultada
          cidade: cidade,
 
          //Envia a temperatura retornada pela API OpenWeatherMap
          temperatura: dados.main.temp + "°C",
 
          //Envia a descrição do clima
          //O índice [0] acessa o primeiro elemento do array "weather"
          //Um array é uma lista de valores armazenados em sequência e acessados por posição
          clima: dados.weather[0].description,
 
          //Envia a umidade do ar
          umidade: dados.main.humidity + "%",
 
        })
      });
 
      //Fim da primeira aula
 
    }catch (erro){
      console.log(erro);
      alert("Erro ao consultar a API.");
    }
  }
   
 
//retorna a interface visual do sistema
return (
 
//Container principal da aplicação
  <div style={{
    padding: "20px",
    fontFamily: "Arial"
  }}>
 
    {/*  Título principal*/}
    <h1>Sistema de Previsão do Tempo</h1>
    {/*Campo para digitação */}
    <input
 
    //Tipo do campo
    type="text"
 
    //Texto exibido dentro da caixa
    placeholder= "Digite uma cidade"
 
    //Valor vinculado ao estado cidade
    value = {cidade}
 
    //Atualiza o estado quando usuário digita
    onChange={(e) => setCidade(e.target.value)}/>
 
  {/*botão de consulta */}
    <button
 
//executa a função consultarClima
    onClick={consultarClima}
 
//Define a margem à esquerda
    style={{
      marginLeft: "10px"
    }}>
 
{/*Texto exibido no botão */}
    Consultar
    </button>
    {/*Linha horizontal para separar seções */}
    <hr />
 
  {/*Exibe a cidade informada */}
    <h2>Cidade: {cidade}</h2>
 
 
  {/*Exibe a temperatura informada */}
    <h2>Temperatura: {temperatura}</h2>
   
    {/*Exibe condição climática */}
    <h2>Clima: {clima}</h2>
 
    {/*Exibe a umidade */}
    <h2>Umidade: {umidade}</h2>
 
</div>
)
}
 
//Exporta o componente App para ser utilizado no React
 
export default App;