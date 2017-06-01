from server.handler import *
from tornado.web import StaticFileHandler

routes = [
    (r"/", mainHandler),
    (r"/movie/(.*)", movieHandler),
    (r"/resource/(.*)", resourceHandler),
    (r"/action/(.*)", actionHandler),
    (r"/worker/(.*)", workerHandler),
    (r"/(.*)", StaticFileHandler, {'path': os.path.join(os.getcwd(), 'public')}),
]