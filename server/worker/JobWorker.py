from server.worker.worker_service.FileWalker import FileWalker
from server.worker.worker_service.CsvWriter import CsvWriter
from local.constant_var import paths, img_temp
import os

class JobWorker:
    def __init__(self):
        pass

    @staticmethod
    def do_csv():
        walker = FileWalker(paths)
        list = walker.getList()

        map = {
            'company': 'c',
            'id': 'i',
            'movie': 'm',
            'image': 'im',
            'url': 'r'
        }
        print("generating the CSV file ... ")

        wr = CsvWriter()
        wr.start(map, list)

        print('================')
        print('Finished!')
        print('================')

    @staticmethod
    def do_dup():
        walker = FileWalker(paths)
        list = walker.getList()

        result = []
        end = len(list) - 1

        for oneIndex, oneItem in enumerate(list):
            if oneIndex < end and oneItem['c'] == list[oneIndex + 1]['c'] and oneItem['i'] == list[oneIndex + 1]['i']:
                result.append(oneItem)
                result.append(list[oneIndex + 1])

        print('generate dup result successfully!')
        return result;

    @staticmethod
    def parse_name(rawstr):
        if not rawstr[0].isalpha():
            return None
        str = rawstr.replace('-','')
        alpha_start = False
        id_start = False
        result = ['', '']

        for key, v in enumerate(str):
            if v.isalpha():
                alpha_start = True
            if alpha_start and v.isdigit():
                id_start = True
            if id_start and not v.isdigit():
                break

            if id_start:
                result[1] += v
            else:
                result[0] += v.lower()

        return result

    @staticmethod
    def do_pair():
        walker0 = FileWalker(paths)
        fileList = walker0.getList()
        img_list = []
        map_list = []
        for root, dirs, files in os.walk(img_temp):
            for onename in files:
                parse_name_result = JobWorker.parse_name(onename)
                if parse_name_result:
                    img_list.append({
                        'c': parse_name_result[0],
                        'i': parse_name_result[1],
                        'oa': onename
                    })

        for one_parse in img_list:
            matched = False
            dictItem = None
            for oneFile in fileList:
                if oneFile['i'] == one_parse['i'] and oneFile['c'] == one_parse['c']:
                    matched = True
                    dictItem = oneFile
            if matched:
                map_list.append({'img':one_parse['oa'], 'target': dictItem['r']})

        return map_list

    @staticmethod
    def do_filter_0(keyword):
        walker = FileWalker(paths)
        list = walker.getList()
        result = filter(lambda x: keyword.lower() in x['c'] or keyword.lower() in x['i'], list)
        return result

    @staticmethod
    def do_filter_1(keyword):
        walker = FileWalker(paths)
        list = walker.getList()
        sku = JobWorker.parse_name(keyword)
        result = filter(lambda x: sku[0] in x['c'] and sku[1] in x['i'], list)
        return result

    @staticmethod
    def do_filter_2(keyword):
        walker = FileWalker(paths)
        list = walker.getList()
        result = filter(lambda x: keyword.lower() in x['r'] or keyword.lower() in x['m'], list)
        return result



