import os
import csv

class CsvWriter:
    def __init__(self):
        pass
    def start(self, map, list):
        fileName = 'local/REPORT.csv'
        full_path = os.path.join("./", fileName)
        fieldnames = []

        print('creating csv...')

        for key, value in map.items():
            fieldnames.append(key)

        with open(full_path, 'w') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()

            for oneIndex, oneItem in enumerate(list):
                item = {}
                for h in fieldnames:
                    item[h] = oneItem[map[h]]
                writer.writerow(item)

        print('create csv succesfully!')