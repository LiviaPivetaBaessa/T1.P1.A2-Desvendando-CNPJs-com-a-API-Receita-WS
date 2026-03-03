function buscarCNPJ() {
    const cnpjInput = document.getElementById('cnpj').value;
    const resultadoDiv = document.getElementById('resultado');
    const cnpj = cnpjInput.replace(/\D/g, '');

    if (cnpj.length !== 14) {
        resultadoDiv.innerHTML = '<p style="color: red;">Digite 14 números!</p>';
        return;
    }

    resultadoDiv.innerHTML = '<p>Consultando o Burn Book... aguarde.</p>';

    // 1. Criamos um elemento de "script" dinâmico
    // Isso ignora o erro de CORS e funciona no Vercel
    const antigoScript = document.getElementById('receita-script');
    if (antigoScript) antigoScript.remove(); // Limpa consulta anterior

    const script = document.createElement('script');
    script.id = 'receita-script';
    
    // 2. A URL precisa ser HTTPS e ter o callback
    script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=retornoReceita`;
    
    // Adiciona o script na página para disparar a consulta
    document.body.appendChild(script);
}

// 3. Esta função é quem recebe os dados da API
function retornoReceita(data) {
    const resultadoDiv = document.getElementById('resultado');

    if (data.status === "ERROR") {
        // Se der erro 429 (muitas requisições), a mensagem aparece aqui
        resultadoDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
    } else {
        // Exibindo os dados no tema do Burn Book
        resultadoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>Fantasia:</strong> ${data.fantasia || 'N/A'}</p>
            <p><strong>Situação:</strong> ${data.situacao}</p>
            <p><strong>Atividade:</strong> ${data.atividade_principal[0].text}</p>
            <p><strong>Telefone:</strong> ${data.telefone}</p>
        `;
    }
}
