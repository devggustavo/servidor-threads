# servidor-threads

Utilizando sockets e uma arquitetura cliente/servidor crie um servidor que será responsável por escutar as mensagens dos clientes em uma determinada porta e devolver uma resposta para esse cliente. Sugestão: inserir um delay aleatório no servidor para simular o atraso na resposta das mensagens.

Deverá ser criado um cliente que irá enviar uma mensagem para a porta que o servidor escuta, esse cliente terá duas threads.

Uma thread para enviar a mensagem com a intenção de liberar o terminal para que outra mensagem possa ser enviada em seguida
Outra thread para receber a resposta do servidor e imprimir na tela a resposta
Comunicação via TCP ou UDP
