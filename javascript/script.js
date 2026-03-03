function buscarCNPJ() {
    const cnpjInput = document.getElementById('cnpj').value;
    const resultadoDiv = document.getElementById('resultado');
    const cnpj = cnpjInput.replace(/\D/g, '');

    if (cnpj.length !== 14) {
        resultadoDiv.innerHTML = '<p style="color: red;">CNPJ inválido!</p>';
        return;
    }

    resultadoDiv.innerHTML = '<p>Consultando o Burn Book...</p>';

    // Usando um proxy público para evitar o erro de CORS
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `${proxy}https://receitaws.com.br/v1/cnpj/${cnpj}`;

    fetch(url)
    .then(response => {
        if (response.status === 429) throw new Error("Muitas requisições! Aguarde 1 min.");
        return response.json();
    })
    .then(data => {
        if (data.status === "ERROR") {
            resultadoDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
        } else {
            resultadoDiv.innerHTML = `
                <p><strong>Nome:</strong> ${data.nome}</p>
                <p><strong>Situação:</strong> ${data.situacao}</p>
                <p><strong>Atividade:</strong> ${data.atividade_principal[0].text}</p>
            `;
        }
    })
    .catch(error => {
        resultadoDiv.innerHTML = `<p style="color: red;">Erro de conexão (CORS). Tente ativar o proxy ou usar extensão.</p>`;
        console.error(error);
    });
}