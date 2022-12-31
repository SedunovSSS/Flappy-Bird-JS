from http.server import HTTPServer, CGIHTTPRequestHandler
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip_addr = (s.getsockname()[0])
s.close()
port = int(input("[+] PORT: "))
print(f"[!] Server running in http://{ip_addr}:{port} [!]")
server_address = (ip_addr, port)
httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
httpd.serve_forever()



