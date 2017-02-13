import tornado.web
import os
import csv
import json
from urlparse import urlparse

class mainHandler(tornado.web.RequestHandler):
    def get(self):
        view_path = os.path.join("../public", 'index.html')
        self.set_header("Cache-control", "no-cache")
        self.render(view_path)

class movieHandler(tornado.web.RequestHandler):
    def post(self, a):
        list = []
        with open(os.path.join(os.getcwd(), 'REPORT.csv'), 'rb') as f:
            reader = csv.reader(f)
            for row in reader:
                oneRow = {
                    'r': row[0],
                    'm': row[1].split('|-|'),
                    'c': row[2],
                    'i': row[3],
                    'im': row[4].split('|-|') if len(row[4]) > 0 else []
                }

                list.append(oneRow)

        list.pop(0)
        self.write(json.dumps(list[100:200]))

class resourceHandler(tornado.web.RequestHandler):
    def get(self, rsc):
        try:
            rsc1 = urlparse(rsc).geturl()
            file = open('/' + rsc1, "r")
            # self.set_header('Content-Type', 'image/jpg')
            self.write(file.read())
            file.close()
        except Exception as e:
            print('===========  file location error =============')
            print(rsc)
            print('==============================================')
            self.write('null')


