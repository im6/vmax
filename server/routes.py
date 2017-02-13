import os
import tornado.web
from server.handler import mainHandler, movieHandler, resourceHandler

routes = [
    (r"/", mainHandler),
    (r"/movie/(.*)", movieHandler),
    (r"/resource/(.*)", resourceHandler),
    (r"/(.*)", tornado.web.StaticFileHandler, {'path': os.path.join(os.getcwd(), 'public')}),
]