#!/usr/bin/env python
from tornado import wsgi
from server.routes import routes

settings = {
    "cookie_secret": "cat and dog",
    #"xsrf_cookies": True,
}

application = wsgi.WSGIApplication(routes, **settings)