from server.worker.worker_service.FileWalker import FileWalker
from local.constant_var import paths
import subprocess

def do_filter(keyword):
    walker = FileWalker(paths)
    list = walker.getList()

    result = filter(lambda x: keyword.lower() in x['m'].lower(), list)

    print('================')
    if result:
        for ind, item in enumerate(result):
            print("%s, %s-%s,  %s" % (ind + 1, item['c'], item['i'], item['m']))
    else:
        print('No Match Result.')

    print('================')

    open_id = raw_input("please select to open: ")

    if open_id:
        selected_ind = int(open_id)
        selected = result[selected_ind - 1]
        subprocess.call(["open", selected['m']])
    else:
        print('search fininshed.')


