import os
import tornado.web
from server.handler import mainHandler, movieHandler, resourceHandler, actionHandler, workerHandler

routes = [
    (r"/", mainHandler),
    (r"/movie/(.*)", movieHandler),
    (r"/resource/(.*)", resourceHandler),
    (r"/action/(.*)", actionHandler),
    (r"/worker/(.*)", workerHandler),
    (r"/(.*)", tornado.web.StaticFileHandler, {'path': os.path.join(os.getcwd(), 'public')}),
]