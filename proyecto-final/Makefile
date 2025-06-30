HOST := 127.0.0.1
PORT := 3030
URL  := $(HOST):$(PORT)

.PHONY: test
test:
	http GET    $(URL)/notfound                       | jq -e '.error'
	http GET    $(URL)/products/notfound              | jq -e '.error'
	http GET    $(URL)/products                       | jq -e 'length == 2'
	http GET    $(URL)/products/20                    | jq -e '.title == "NE555"'
	http GET    $(URL)/products/search name==NE       | jq -e '.[0].id == 20'
	http GET    $(URL)/products/search minPrice==99   | jq -e '.[0].id == 20'
	http GET    $(URL)/products/search maxPrice==99   | jq -e '.[0].id == 1'
	http GET    $(URL)/products/search foo==bar       | jq -e 'length == 0'
	http POST   $(URL)/products name=NE555 price=55.5 | jq -e 'length == 3'
#	http PUT    $(URL)/products/20 name=Z80 price=80.0
#	http PATCH  $(URL)/products/20 price=79.9
#	http DELETE $(URL)/products/20
