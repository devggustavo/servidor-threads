// Importa o módulo 'net', que é usado para criar um servidor TCP
const net = require('net');

// Define o endereço do host e a porta em que o servidor será executado
const host = 'localhost';
const port = 12345;

// Cria um servidor TCP usando a função createServer.
// Esta função recebe um callback que é chamado toda vez que um cliente se conecta ao servidor.
const server = net.createServer((client) => {
    // Obtém o endereço IP e a porta do cliente conectado
    const clientAddress = `${client.remoteAddress}:${client.remotePort}`;
    console.log("Conexão estabelecida com:", clientAddress);

    // Ouve por dados enviados pelo cliente. Esta função callback é chamada sempre que o cliente envia dados.
    client.on('data', (data) => {
        console.log("Mensagem recebida de:", clientAddress);
        // Introduz um atraso aleatório antes de responder ao cliente
        setTimeout(() => {
            // Constrói a mensagem de resposta
            const responseMessage = "Servidor recebeu sua mensagem: " + data.toString();
            // Envia a mensagem de resposta de volta ao cliente
            client.write(responseMessage);
        }, Math.random() * (3000 - 500) + 500); // Atraso aleatório entre 0.5 a 3 segundos
    });

    // Este evento é acionado quando o cliente encerra a conexão
    client.on('end', () => {
        console.log("Conexão encerrada com:", clientAddress);
    });

    // Ouve por erros na conexão
    client.on('error', (err) => {
        console.error(`Erro de conexão com ${clientAddress}: ${err.message}`);
    });
});

// O servidor começa a ouvir conexões no host e porta definidos
server.listen(port, host, () => {
    console.log(`Servidor iniciado e ouvindo na porta: ${port}`);
});

// Ouve por erros no servidor
server.on('error', (err) => {
    console.error(`Erro do servidor: ${err.message}`);
});
