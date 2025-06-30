HOST := 127.0.0.1
PORT := 3030
URL  := $(HOST):$(PORT)

.PHONY: test
test:
	http GET    $(URL)/notfound | jq -e .error
	http GET    $(URL)/products
	http GET    $(URL)/products/20
	http GET    $(URL)/products/search name==NE
	http GET    $(URL)/products/search minPrice==10
	http GET    $(URL)/products/search maxPrice==10
	http GET    $(URL)/products/search foo==bar | jq -e .error
	http POST   $(URL)/products name=NE555 price=55.5
	http PUT    $(URL)/products/20 name=Z80 price=80.0
	http PATCH  $(URL)/products/20 price=79.9
	http DELETE $(URL)/products/20
	http GET    $(URL)/products/notfound | jq -e .error
