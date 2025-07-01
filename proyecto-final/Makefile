USER := username
PASS := password
HOST := 127.0.0.1
PORT := 3030
URL  := $(HOST):$(PORT)
HTTP := http --check-status --session proyecto-final
CURL := curl --silent -w '%{http_code}'

.PHONY: test
test:
	http    GET    $(URL)/notfound                                         | jq -e '.error'
#	$(HTTP) POST   $(URL)/login            user=$(USER) pass=$(PASS)
	$(HTTP) GET    $(URL)/products                                         | jq -e 'length == 3'
	$(HTTP) GET    $(URL)/products/555                                     | jq -e '.name == "555"'
	$(CURL)        $(URL)/products/1337                                    | grep -q 404
	$(HTTP) POST   $(URL)/products         name=6502 price=650.2 brand=MOS | jq -e 'length == 4'
	$(HTTP) DELETE $(URL)/products/4                                       | jq -e
	$(HTTP) GET    $(URL)/products                                         | jq -e 'length == 3'
	$(HTTP) GET    $(URL)/products/search  name==555                       | jq -e 'length == 1'
	$(HTTP) GET    $(URL)/products/search  minPrice==99                    | jq -e 'length == 1'
	$(HTTP) GET    $(URL)/products/search  maxPrice==99                    | jq -e 'length == 2'
	$(HTTP) GET    $(URL)/products/search  maxPrice==1                     | jq -e 'length == 0'
	http    GET    $(URL)/products/search  foo==bar                        | jq -e '.errors'
	$(HTTP) PUT    $(URL)/products/80      name=Z80   price=8.0 brand=NEC  | jq -e
	$(HTTP) GET    $(URL)/products/80                                      | jq -e '.price == 8.0'
	$(HTTP) PATCH  $(URL)/products/80      price=79.9                      | jq -e
	$(HTTP) GET    $(URL)/products/80                                      | jq -e '.price == 79.9'
