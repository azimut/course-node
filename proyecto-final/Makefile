USER ?= username
HOST ?= 127.0.0.1
PORT ?= 3030
URL  := $(HOST):$(PORT)
OK   := http --session proyecto-final --check-status
FAIL := http --session proyecto-final

.PHONY: test
test:
	http       GET    $(URL)/notfound                                         | jq -e '.error'
#	$(OK)      POST   $(URL)/login            user=$(USER)
	$(OK)      GET    $(URL)/products                                         | jq -e 'length == 3'
	$(OK)      GET    $(URL)/products/555                                     | jq -e '.name == "555"'
	$(FAIL) -v GET    $(URL)/products/1337                                    | grep -q 404
	$(OK)      POST   $(URL)/products         name=6502 price=650.2 brand=MOS | jq -e 'length == 4'
	$(OK)      DELETE $(URL)/products/4                                       | jq -e
	$(OK)      GET    $(URL)/products                                         | jq -e 'length == 3'
	$(OK)      GET    $(URL)/products/search  name==555                       | jq -e 'length == 1'
	$(OK)      GET    $(URL)/products/search  minPrice==99                    | jq -e 'length == 1'
	$(OK)      GET    $(URL)/products/search  maxPrice==99                    | jq -e 'length == 2'
	$(OK)      GET    $(URL)/products/search  maxPrice==1                     | jq -e 'length == 0'
	$(FAIL)    GET    $(URL)/products/search  foo==bar                        | jq -e '.errors[0].msg'
	$(OK)      PUT    $(URL)/products/80      name=Z80  price=8.0   brand=NEC | jq -e
	$(OK)      GET    $(URL)/products/80                                      | jq -e '.price == 8.0'
	$(OK)      PATCH  $(URL)/products/80      price=79.9                      | jq -e
	$(OK)      GET    $(URL)/products/80                                      | jq -e '.price == 79.9'

.PHONY: dev
dev: ; npm run dev
