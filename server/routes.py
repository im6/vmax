import os
import tornado.web
from server.handler import mainHandler, movieHandler, resourceHandler, actionHandler

routes = [
    (r"/", mainHandler),
    (r"/movie/(.*)", movieHandler),
    (r"/resource/(.*)", resourceHandler),
    (r"/action/(.*)", actionHandler),
    (r"/(.*)", tornado.web.StaticFileHandler, {'path': os.path.join(os.getcwd(), 'public')}),
]