import socket
import threading

# Inicializando um bloqueio para a thread de envio
send_lock = threading.Lock()

def send_message(client_socket):
    with send_lock:  # Isso garante que apenas uma mensagem será enviada por vez
        message = input("Digite sua mensagem: ")
        client_socket.send(message.encode())

def receive_message(client_socket):
    while True:
        message = client_socket.recv(1024)
        if len(message):
            print("\nResposta do servidor:", message.decode())
            with send_lock:
                # Libera o bloqueio para permitir que a próxima mensagem seja enviada
                pass

def start_client():
    host = 'localhost'
    port = 12345
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))

    # Iniciando a thread de recebimento
    receive_thread = threading.Thread(target=receive_message, args=(client_socket,))
    receive_thread.daemon = True
    receive_thread.start()

    # Iniciando a thread de envio
    send_thread = threading.Thread(target=send_message, args=(client_socket,))
    send_thread.daemon = True
    send_thread.start()

    send_thread.join()
    receive_thread.join()

if __name__ == '__main__':
    start_client()