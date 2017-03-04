#!/usr/bin/env python

import imp
from wsgiref.simple_server import make_server

PORT = 5001

if __name__ == '__main__':
    ip   = 'localhost'
    app = imp.load_source('application', 'server/app.py')
    httpd = make_server(ip, PORT, app.application)
    print('app is running on port: %s' % (PORT))
    httpd.serve_forever()