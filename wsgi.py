#!/usr/bin/env python

from server.app import application
from wsgiref.simple_server import make_server

PORT = 5001
IP = 'localhost'

if __name__ == '__main__':
    httpd = make_server(host=IP, port=PORT, app=application)
    print('app is running on %s:%s ...' % (IP, PORT))
    httpd.serve_forever()