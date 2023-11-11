const net = require('net');

const host = 'localhost';
const port = 12345;

const server = net.createServer((client) => {
    const clientAddress = `${client.remoteAddress}:${client.remotePort}`;
    console.log("Conexão estabelecida com:", clientAddress);

    client.on('data', (data) => {
        console.log("Mensagem recebida de:", clientAddress);
        // Introduzindo um atraso aleatório
        setTimeout(() => {
            const responseMessage = "Servidor recebeu sua mensagem: " + data.toString();
            client.write(responseMessage);
        }, Math.random() * (3000 - 500) + 500);
    });

    client.on('end', () => {
        console.log("Conexão encerrada com:", clientAddress);
    });

    client.on('error', (err) => {
        console.error(`Erro de conexão com ${clientAddress}: ${err.message}`);
    });
});

server.listen(port, host, () => {
    console.log(`Servidor iniciado e ouvindo na porta: ${port}`);
});

server.on('error', (err) => {
    console.error(`Erro do servidor: ${err.message}`);
});
