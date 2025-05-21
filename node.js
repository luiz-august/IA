// Receber o SELECTOR do formulário
const formPerguntaChat = document.getElementById('form-pergunta-chat');


import { bas } from './lock.js';


const data = "bas";
const encryptedData = CryptoJS.AES.encrypt(data, bas).toString();
localStorage.setItem("Oi, procurando alguma coisa por aqui?", encryptedData);




if ( bas === "") {
    document.getElementById('pergunta').innerHTML = "<span style='color: #f00;'>Necessário colocar  na API</span>";
}


// Acessa o IF quando tem o SELETOR na página HTML
if (formPerguntaChat) {
    // Aguardar o usuário clicar no botão Enviar
    formPerguntaChat.addEventListener("submit", async (e) => {
        // Bloquear o recarregamento da página
        e.preventDefault();


        // Substituir o texto do botão para "Pesquisando..."
        document.getElementById('btn-pergunta-chat').value = "Pesquisando...";


        // Receber o valor do campo pergunta
        let pergunta = document.getElementById('campo-pergunta').value;


        // Enviar o texto da pergunta para a página HTML
        document.getElementById('pergunta').innerHTML = pergunta;


        // Limpar a resposta
        document.getElementById('resposta').innerHTML = "<span></span>";
       
        try {


         const resposta = await fetch("https://api.openai.com/v1/responses", {
            // Método para enviar os dados
            method: "POST",
            // Dados enviados no cabeçalho da requisição
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + bas,
            },
            // Enviar os dados no corpo da requisição
            body: JSON.stringify({
                model: "gpt-4o-mini", // Modelo
                store: true,
                messages: [
                    { role: "system", content: "Você é um assistente legal até" },
                    { role: "user", content: pergunta } // Texto da pergunta
                ],
                max_tokens: 2048, // Tamanho da resposta
                temperature: 0.5, // Criatividade na resposta
                n: 1 // Retorna apenas uma resposta
            }),
        })
            // Acessa o then quando obtiver resposta
            .then((resposta) => {
                // Verifica se a resposta foi bem-sucedida
                if (!resposta.ok) {
                    console.error("Erro na requisição", resposta.status, resposta.statusText);
                    return Promise.reject("Erro na requisição");
                }
                return resposta.json(); // Se ok, converte a resposta para JSON
            })
            .then((dados) => {
                // Verifica os dados retornados
               
                // Enviar o texto da resposta para a página HTML
                document.getElementById('resposta').innerHTML = dados.choices[0].message.content;
            })
            .catch((erro) => {
                // Enviar o texto da resposta para a página HTML
                console.log("Erro", erro);
                document.getElementById('resposta').innerHTML = "Sem resposta";
            });


        // Substituir o texto do botão para "Enviar"
        document.getElementById('btn-pergunta-chat').value = "Enviar";
       //escreve algo
    }catch{(error,"Tenha cuidado com o que você está procurando por aqui!!")
       
  }
  function brincadeirinha(bas) {
    if (bas) {  // Use o operador lógico '&&' para comparar as duas variáveis
        return "UAU LUIZ e LUCAS melhoraram muito no back-end";
    } else {
        return "Que pena, o LUIZ e LUCAS têm que melhorar mais no back-end";
    }
}


let hehe = brincadeirinha(true);
console.log(hehe);


});
}
