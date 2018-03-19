import quandl
import csv

quandl.ApiConfig.api_key = "zC992yeEkw5VTye5PFJY"
i = 0
res = []
with open('ticker.csv', 'r') as csvfile:  
	readCSV = csv.reader(csvfile, delimiter=',')  
	for row in readCSV:
		i += 1
		quandlCode = 'EOD/'+ row[0] + '.4'
		try:
			data1 = quandl.get(quandlCode, start_date="2014-12-31", returns="numpy")
		except Exception as e:
			print(i, len(res))
		else:
			res.append(row[0])

print(res)
