import os
import tornado.web
from server.handler import mainHandler, main2Handler

STATICPATH = os.path.join("../", "public")
print STATICPATH
routes = [
    (r"/", mainHandler),
    (r"/get", main2Handler),
    (r'/', tornado.web.StaticFileHandler, {'path': '/public'})
]