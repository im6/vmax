from server.worker.worker_service.FileWalker import FileWalker
from server.worker.worker_service.CsvWriter import CsvWriter
from local.constant_var import paths

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
