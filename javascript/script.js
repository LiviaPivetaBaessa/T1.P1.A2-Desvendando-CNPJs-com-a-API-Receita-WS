function buscarCNPJ() {
    const cnpjInput = document.getElementById('cnpj').value;
    const resultadoDiv = document.getElementById('resultado');
    
    // Limpa pontos, barras e traços (Deixa só números)
    const cnpj = cnpjInput.replace(/\D/g, '');

    if (cnpj.length !== 14) {
        resultadoDiv.innerHTML = '<p style="color: red;">Digite um CNPJ válido com 14 números!</p>';
        return;
    }

    resultadoDiv.innerHTML = '<p>Consultando o Livro... aguarde.</p>';

    // REMOVENDO O SCRIPT ANTIGO SE EXISTIR
    const scriptAntigo = document.getElementById('jsonp-receita');
    if (scriptAntigo) scriptAntigo.remove();

    // CRIANDO O SCRIPT PARA JSONP (Resolve o problema do Vercel/CORS)
    const script = document.createElement('script');
    script.id = 'jsonp-receita';
    
    // ATENÇÃO: Usando a API correta (ReceitaWS) e não ViaCEP
    script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=callbackReceita`;
    
    document.body.appendChild(script);
}

// FUNÇÃO QUE RECEBE OS DADOS
function callbackReceita(data) {
    const resultadoDiv = document.getElementById('resultado');

    if (data.status === "ERROR") {
        resultadoDiv.innerHTML = `<p style="color: red;">Erro: ${data.message}</p>`;
    } else {
        resultadoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>Fantasia:</strong> ${data.fantasia || 'N/A'}</p>
            <p><strong>Situação:</strong> ${data.situacao}</p>
            <p><strong>Atividade Principal:</strong> ${data.atividade_principal[0].text}</p>
            <p><strong>Telefone:</strong> ${data.telefone}</p>
        `;
    }
}