import tornado.web
import os
import json
import subprocess
from urlparse import urlparse
from server.service.UtilService import UtilService
from server.service.JobWorker import JobWorker


class mainHandler(tornado.web.RequestHandler):
    def get(self):
        view_path = os.path.join("../public", 'index.html')
        self.set_header("Cache-control", "no-cache")
        self.render(view_path)

class movieHandler(tornado.web.RequestHandler):
    def post(self, a):
        list = UtilService.csv_to_list()
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
            list = UtilService.csv_to_list()
            self.write(json.dumps({
                'data': list
            }))

        elif rsc == 'dup':
            dup_data = JobWorker.do_dup()
            self.write(json.dumps({
                'data': dup_data
            }))

        elif rsc == 'category':
            dup_data = JobWorker.do_category()
            self.write(json.dumps({
                'data': dup_data
            }))

        elif rsc == 'imgpair':
            result = JobWorker.do_pair()
            self.write(json.dumps({
                'data': result
            }))
        elif rsc == 'filter':
            try:
                bodyData = tornado.escape.json_decode(self.request.body)
                keyword = bodyData['keyword']
                filter_data = []

                search_type = UtilService.getKeywordType(keyword)
                print('search type: %s' %(search_type))
                if search_type == 0 or search_type == 2:
                    filter_data = JobWorker.do_filter_2(keyword)
                elif search_type == 1:
                    filter_data = JobWorker.do_filter_1(keyword)

                self.write(json.dumps({
                    'data': filter_data
                }))

            except Exception as e:
                print(e)
                self.write(json.dumps({
                    'data': []
                }))

