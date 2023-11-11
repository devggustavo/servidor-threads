// Importando os módulos necessários: 'net' para networking e 'readline' para leitura de linha de comando
const net = require('net');
const readline = require('readline');

// Definindo o host e a porta para a conexão do socket
const host = 'localhost';
const port = 12345;

// Criando um novo socket para o cliente
const client = new net.Socket();

// Configurando a interface de leitura de linha de comando
const rl = readline.createInterface({
    input: process.stdin,   // Define a entrada padrão do terminal como entrada
    output: process.stdout, // Define a saída padrão do terminal como saída
    prompt: 'Digite sua mensagem: ' // Define o texto do prompt no terminal
});

// Conectando o cliente ao servidor
client.connect(port, host, () => {
    console.log('Conectado ao servidor.');
    rl.prompt(); // Exibe o prompt de mensagem após a conexão ser estabelecida
});

// Evento acionado quando uma linha (mensagem) é inserida no terminal
rl.on('line', (line) => {
    client.write(line); // Envia a linha para o servidor
    // O prompt não é chamado aqui para evitar sobreposição com respostas do servidor
});

// Evento acionado quando dados são recebidos do servidor
client.on('data', (data) => {
    console.log('\nResposta do servidor: ' + data.toString());
    rl.prompt(); // Exibe o prompt novamente após receber a resposta do servidor
});

// Evento acionado quando a conexão é fechada
client.on('close', () => {
    console.log('Conexão encerrada.');
    rl.close(); // Fecha a interface de leitura de linha de comando
});

// Evento acionado em caso de erro de conexão
client.on('error', (err) => {
    console.error('Erro de conexão: ' + err.message);
    rl.close(); // Fecha a interface de leitura de linha de comando em caso de erro
});
