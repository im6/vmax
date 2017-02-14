from server.worker.worker_service.FileWalker import FileWalker
from server.worker.worker_service.CsvWriter import CsvWriter
from local.constant_var import paths

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
    def parse_name(str):
        alpha_start = False
        id_start = False
        result = ['', '']

        for key, v in enumerate(str):
            if v.isalpha():
                alpha_start = True
            if alpha_start and v.isdigit():
                id_start = True

            if id_start:
                result[1] += v
            else:
                result[0] += v.lower()

        return result

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



