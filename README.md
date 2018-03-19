# stock-charts

To run this application:

1. open terminal under application directory (current directory).

2. install API lib and framework: `pip3 install quandl django`

3. use command `python3 manage.py runserver 0.0.0.0:7777` to run the server (use `python` instead of `python3` if you intall python3 as default python)

4. open your browser and go to `127.0.0.1:7777` to play with this app.


Some information about this application

1. back-end framework is Django 2.0+, different version may not work well.

2. files under `/dev_files` is only for developing use, which won't be used for deploying.(includes react dev files, webpack config, ticker maker, etc.)

