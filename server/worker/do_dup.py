from server.worker.worker_service.FileWalker import FileWalker
from local.constant_var import paths

def print_green(str):
    print('\x1b[1;32;40m' + str + '\x1b[0m')

def print_blue(str):
    print('\x1b[3;36;40m' + str + '\x1b[0m')

def do_dup():
    walker = FileWalker(paths)
    list = walker.getList()

    print("generating the duplication list: ")

    result = []
    end = len(list) - 1

    for oneIndex, oneItem in enumerate(list):
        if oneIndex < end and oneItem['c'] == list[oneIndex + 1]['c'] and oneItem['i'] == list[oneIndex + 1]['i']:
            result.append(oneItem)
            result.append(list[oneIndex + 1])

    print_blue('================')
    if result:
        for ind, item in enumerate(result):
            print("%s, %s-%s,  %s" % (ind + 1, item['c'], item['i'], item['r']))
    else:
        print_green('No Dup Result.')
    print_blue('================')
