import tornado.ioloop
import tornado.web

PORT = 3000

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(PORT)
    print('VMAX is running at port: %s' % (PORT))
    tornado.ioloop.IOLoop.current().start()
