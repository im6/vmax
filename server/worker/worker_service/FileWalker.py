import os
import re
import subprocess
from local.constant_var import company_exception


default_movie_ext = ['mp4', 'avi', 'mkv', 'wmv']
defaultReg = "^[a-zA-Z]{2,8}(|-|_)[0-9]{2,6}"
defaultReg2 = "^(" + '|'.join(company_exception) + "|[a-zA-Z]{2,8})(|-|_)[0-9]{2,6}"


class FileWalker:
    def __init__(self, pathList, regEx = defaultReg2):
        self.path_list = pathList
        self.regStr = regEx

    def addToList(self, list, name, asset):
        name_grp = self.split_sku(name)
        list.append({
            "c": name_grp[0],
            "i": name_grp[1],
            "m": '|-|'.join(asset['m']),
            'im': '|-|'.join(asset['im']),
            'r': asset['r']
        })

    def split_sku(self, name):
        shortName = re.search(self.regStr, name).group(0)
        isRegular = True
        matchStr = None

        for oneExc in company_exception:
            if oneExc in shortName:
                isRegular = False
                matchStr = oneExc

        if isRegular:
            name_grp = re.split('(\d.*)', shortName)
        else:
            name_grp = [matchStr, shortName.replace(matchStr, '')]

        return name_grp

    def check_match(self, str):
        p = re.compile(self.regStr)
        isMatch = p.match(str)
        return isMatch

    def change_format(self, str):
        str1 = str.replace("-", "")
        str2 = str1.lower()
        return str2

    def is_movie(self, name):
        ext = self.get_ext(name)
        return ext in default_movie_ext

    def get_ext(self, name):
        return name.split('.')[-1]

    def getMoviePathInFolder(self, root):
        result = {
            'm': [],
            'im': [],
            'r': root
        }
        for root, dirs, files in os.walk(root):
            for onef in files:
                if self.get_ext(onef) in default_movie_ext:
                    result['m'].append(onef)
                elif self.get_ext(onef) == 'jpg':
                    result['im'].append(onef)
        return result

    def open_move(self, path):
        subprocess.call(["open", path])

    def traverse(self):
        list = []
        for cwd in self.path_list:
            print('analysizing dir: %s...' % (cwd))
            for root, dirs, files in os.walk(cwd):
                folder_name = os.path.basename(root)
                folder_name1 = self.change_format(folder_name)
                if self.check_match(folder_name1):
                    # standard sku folder:
                    asset = self.getMoviePathInFolder(root)
                    self.addToList(list, folder_name1, asset)
                else:
                    # not big company product
                    continue
        return list

    def getList(self):
        list = self.traverse()
        list.sort(key=lambda x: x['c'] + x['i'])
        return list