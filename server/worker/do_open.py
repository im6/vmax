import subprocess
from server.worker.worker_service.FileWalker import FileWalker
from local.constant_var import paths

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
            result[0] += v

    return result

def do_open(keyword):
    walker = FileWalker(paths)
    list = walker.getList()
    elem = parse_name(keyword)

    result = filter(lambda x: elem[0] == x['c'] and elem[1] == x['i'], list)

    print('================')
    if result:
        for ind, item in enumerate(result):
            print("%s, %s-%s,  %s" % (ind + 1, item['c'], item['i'], item['m']))
        subprocess.call(["open", result[0]['m']])
    else:
        print('No Match Result.')

    print('================')

