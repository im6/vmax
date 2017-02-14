import tornado.ioloop
from server.routes import routes

PORT = 5000

if __name__ == "__main__":
    app = tornado.web.Application(routes)
    app.listen(PORT)
    print('VMAX is running at port: %s' % (PORT))
    tornado.ioloop.IOLoop.current().start()
