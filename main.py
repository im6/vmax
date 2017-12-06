from tornado import ioloop
from server.app import application

PORT = 5001
IP = 'localhost'

if __name__ == '__main__':
    application.listen(PORT, IP)
    print('app is running on %s:%s ...' % (IP, PORT))
    ioloop.IOLoop.current().start()