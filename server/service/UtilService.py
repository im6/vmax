import csv
import os
import re



def map_list_item(row):
    oneRow = {
        'r': row[0],
        'm': row[1].split('|-|'),
        'c': row[2],
        'i': row[3],
        'im': row[4].split('|-|') if len(row[4]) > 0 else []
    }
    return oneRow


def csv_to_list():
    list = []
    with open(os.path.join(os.getcwd(), 'local/REPORT.csv'), 'rb') as f:
        reader = csv.reader(f)
        for row in reader:
            oneRow = map_list_item(row)
            list.append(oneRow)
    list.pop(0)
    return list


def getKeywordType(str):
    type = 0
    p0 = re.compile("^[0-9]{2,6}$")
    p1 = re.compile("^[a-zA-Z]{2,8}$")
    p2 = re.compile("^[a-zA-Z]{2,8}[0-9]{2,6}$")

    if p0.match(str):
        type = 0
    elif p1.match(str):
        type = 0
    elif p2.match(str):
        type = 1
    else:
        type = 2

    return type


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