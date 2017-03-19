from server.handler import *

routes = [
    (r"/", mainHandler),
    (r"/movie/(.*)", movieHandler),
    (r"/resource/(.*)", resourceHandler),
    (r"/action/(.*)", actionHandler),
    (r"/worker/(.*)", workerHandler),
    (r"/(.*)", tornado.web.StaticFileHandler, {'path': os.path.join(os.getcwd(), 'public')}),
]