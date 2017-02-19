import json

def json_reader(json_dir):
    with open(json_dir) as json_data:
        return json.load(json_data)