function buscarCNPJ() {
    const cnpjInput = document.getElementById('cnpj').value;
    const resultadoDiv = document.getElementById('resultado');
    const cnpj = cnpjInput.replace(/\D/g, '');

    if (cnpj.length !== 14) {
        resultadoDiv.innerHTML = '<p style="color: red;">Digite 14 números!</p>';
        return;
    }

    resultadoDiv.innerHTML = '<p>Consultando o Burn Book...</p>';

    // Criamos um elemento de script para fazer a chamada JSONP
    const script = document.createElement('script');
    
    // A Receita WS usa o parâmetro 'callback' para retornar os dados
    script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=processarDados`;
    
    // Remove o script do HTML após a execução para não sujar o código
    script.onload = () => script.remove();
    
    document.body.appendChild(script);
}

// Esta função será chamada automaticamente pela API
function processarDados(data) {
    const resultadoDiv = document.getElementById('resultado');

    if (data.status === "ERROR") {
        // Trata o erro 429 ou CNPJ não encontrado que vem dentro do JSON
        resultadoDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
    } else {
        resultadoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>Situação:</strong> ${data.situacao}</p>
            <p><strong>Atividade:</strong> ${data.atividade_principal[0].text}</p>
            <p><strong>Telefone:</strong> ${data.telefone}</p>
        `;
    }
}