import socket
import threading
import time
import random

def client_thread(client_socket, address):
    while True:
        try:
            message = client_socket.recv(1024)
            if message:
                print("Mensagem recebida de:", address)
                # Introduzindo um atraso aleatório
                time.sleep(random.uniform(0.5, 3))
                response_message = "Servidor recebeu sua mensagem: " + message.decode()
                client_socket.send(response_message.encode())
            else:
                # Sem mensagem, a conexão foi encerrada pelo cliente
                break
        except ConnectionResetError:
            # A conexão foi encerrada pelo cliente
            break
    client_socket.close()
    print("Conexão encerrada com:", address)

def start_server():
    host = 'localhost'
    port = 12345
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen(5)
    print("Servidor iniciado e ouvindo na porta:", port)

    while True:
        client_socket, address = server_socket.accept()
        print("Conexão estabelecida com:", address)
        # Cria uma nova thread para lidar com a conexão do cliente
        threading.Thread(target=client_thread, args=(client_socket, address)).start()

if __name__ == '__main__':
    start_server()