.POSIX:
.SUFFIXES:

SHELL = /bin/bash -o pipefail
USER ?= username
URL  ?= :3030
OK   := curlie -fsb jar.txt -c jar.txt
FAIL := curlie  -sb jar.txt -c jar.txt

.PHONY: test
test:
	curlie -s  GET    $(URL)/notfound                                         | jq -e '.error'
#	$(OK)      POST   $(URL)/login            user=$(USER)
	$(OK)      GET    $(URL)/products                                         | jq -e 'length > 0'
	$(OK)      POST   $(URL)/products         name=6502 price=650.2 brand=MOS | jq -e '.id'
	$(OK)      DELETE $(URL)/products/4                                       | jq -e
	$(OK)      GET    $(URL)/products                                         | jq -e 'length > 0'
	$(OK)      GET    $(URL)/products/555                                     | jq -e '.name == "555"'
	$(FAIL) -v GET    $(URL)/products/1337                                    |& grep 404
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
dev: ; ls *.js src/*/*.js Makefile \
	| entr -rcs '(node index.js &; sleep 0.8 && time make test || notify-send -u critical -t 1000 "woops")'
