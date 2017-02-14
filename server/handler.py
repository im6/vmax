import tornado.web
import os
import csv
import json
import subprocess
from urlparse import urlparse
from worker.JobWorker import JobWorker

def csv_to_list():
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
    return list

class mainHandler(tornado.web.RequestHandler):
    def get(self):
        view_path = os.path.join("../public", 'index.html')
        self.set_header("Cache-control", "no-cache")
        self.render(view_path)

class movieHandler(tornado.web.RequestHandler):
    def post(self, a):
        list = csv_to_list()
        self.write(json.dumps(list))

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


class actionHandler(tornado.web.RequestHandler):
    def post(self, rsc):
        try:
            bodyData = tornado.escape.json_decode(self.request.body)
            url = bodyData['url']
            subprocess.call(['open', url])
            self.write({'status': 'ok'})
        except Exception as e:
            print('===========  file location error =============')
            print(rsc)
            print('==============================================')
            self.write('null')


class workerHandler(tornado.web.RequestHandler):
    def post(self, rsc):
        if rsc == 'refresh':
            JobWorker.do_csv()
            list = csv_to_list()
            self.write(json.dumps({
                'data': list
            }))
        elif rsc == 'filter':
            bodyData = tornado.escape.json_decode(self.request.body)
            keyword = bodyData['keyword']
            filter_data = JobWorker.do_filter(keyword)
            self.write(json.dump({
                'result': filter_data
            }))
            return filter_data
        elif rsc == 'dup':
            dup_data = JobWorker.do_dup()
            self.write(json.dump({
                'result': dup_data
            }))

