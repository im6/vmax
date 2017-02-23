# vmax

A python web framework for movie in your hard drive


##Installation



via github:

    $ git clone https://github.com/zj1926/vmax.git
    $ cd vmax
    $ mkdir local && touch local/movie_config.json
    $ source env/bin/activation
    $ pip install -r requirements.txt
    $ python main.py

movie_config.json format example:
{
  "paths" : [
    "/absolute/path/1",
    "/absolute/path/2",
    "/absolute/path/3"
  ],
  "company_exception": [
      "10musume",
      "1pondo",
      "1000giri"
  ],
  "star_path": [
    "/tag/absolute/path/1",
    "/tag/absolute/path/2",
  ],
  "default_movie_ext": ["mp4", "avi", "mkv", "wmv"],
  "defaultReg": "^[a-zA-Z]{2,8}(|-|_)[0-9]{2,6}"
}

Now the website is available at http://localhost:5000.
