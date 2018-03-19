from django.http import HttpResponse
from django.shortcuts import render
import json
import csv
import quandl

quandl.ApiConfig.api_key = "zC992yeEkw5VTye5PFJY"
 
def entry(request):
    return render(request, 'index.html')


def fetchData(request):
	# convert bytes tp dict
	req = eval(request.body)
	if request.method == 'POST':

		#quandl API
		quandlCode = 'EOD/' + req['name'] + '.4'
		data = quandl.get(
			quandlCode, 
			start_date="2014-12-31",
			returns="numpy"
		)

		#parse data
		date, prices = list(map(list, zip(*data.tolist())))
		#parse datetime
		date = list(map(lambda d: d.strftime('%Y%m%d'), date))

		# computer moving average (recent 30 day)
		size = len(prices)
		head = 15; tail = size-15
		avrg1 = [sum(prices[:2*i+1])/(2*i+1) for i in range(head)]
		avrg2 = [sum(prices[i-15:i+15])/30 for i in range(head, tail)]		
		avrg3 = [sum(prices[size-2*(size-i)+1:])/(2*(size-i)-1) for i in range(tail, size)]

		prs = map(lambda t: {'date':t[0], 'price': t[1]} ,zip(date, prices))
		avg = map(lambda t: {'date':t[0], 'price': t[1]} ,zip(date, avrg1+avrg2+avrg3))
		# cannot jsonfy without list()
		res = [list(prs), list(avg)]
		return HttpResponse(json.dumps(res))
	else:
		return render(request, 'index.html')
