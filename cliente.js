const net = require('net');
const readline = require('readline');

const host = 'localhost';
const port = 12345;

const client = new net.Socket();

// Cria uma interface para ler linhas do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Digite sua mensagem: '
});

client.connect(port, host, () => {
    console.log('Conectado ao servidor.');
    rl.prompt(); // Exibe o prompt inicial

    // Envia mensagem quando o usuário digitar algo
    rl.on('line', (line) => {
        client.write(line); // Não chama rl.prompt() aqui
    });
});

// Lida com dados recebidos do servidor
client.on('data', (data) => {
    console.log('\nResposta do servidor: ' + data.toString());
    rl.prompt(); // Exibe o prompt após receber a resposta do servidor
});

// Lida com o fechamento da conexão
client.on('close', () => {
    console.log('Conexão encerrada.');
    rl.close();
});

// Lida com erros
client.on('error', (err) => {
    console.error('Erro de conexão: ' + err.message);
    rl.close();
});
