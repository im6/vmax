import tornado.web

class mainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

class main2Handler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello2, world")