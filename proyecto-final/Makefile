.POSIX:
.SUFFIXES:
SHELL = /bin/bash -o pipefail

EMAIL ?= user@email.com
PASS  ?= stronPass123

URL   ?= :3030

TOKEN = invalid
OK    = curlie -fs --oauth2-bearer $(TOKEN)
FAIL  = curlie  -s --oauth2-bearer $(TOKEN)

.PHONY: test
test:
	$(eval TOKEN = $(shell curlie -s POST $(URL)/auth/login email=$(EMAIL) password=$(PASS) | jq .token))
	echo $(TOKEN)
	curlie -s  GET    $(URL)/notfound                                                        | jq -e '.error'
	$(OK)      GET    $(URL)/api/products                                                    | jq -e 'length > 0'
	$(OK)      POST   $(URL)/api/products        name=6502 price=650.2 categories:='["cpu"]' | jq -e '.id'
	$(FAIL) -v POST   $(URL)/api/products buzz=2 name=6502 price=650.2 categories:='["cpu"]' |& grep 400
	$(OK)      DELETE $(URL)/api/products/4                                                  | jq -e
	$(FAIL) -v DELETE $(URL)/api/products/what                                               |& grep 400
	$(OK)      GET    $(URL)/api/products                                                    | jq -e 'length > 0'
	$(OK)      GET    $(URL)/api/products/555                                                | jq -e '.name == "555"'
	$(FAIL) -v GET    $(URL)/api/products/1337                                               |& grep 404
	$(FAIL) -v GET    $(URL)/api/products/what                                               |& grep 400
	$(OK)      GET    $(URL)/api/products/search  name==555                                  | jq -e 'length == 1'
	$(OK)      GET    $(URL)/api/products/search  minPrice==99                               | jq -e 'length == 1'
	$(OK)      GET    $(URL)/api/products/search  maxPrice==99                               | jq -e 'length == 2'
	$(OK)      GET    $(URL)/api/products/search  maxPrice==1                                | jq -e 'length == 0'
	$(OK)      GET    $(URL)/api/products/search  category==cpu                              | jq -e 'length == 1'
	$(FAIL)    GET    $(URL)/api/products/search  foo==bar                                   | jq -e '.errors[0].msg'
	$(OK)      PUT    $(URL)/api/products/80      name=Z80  price=8.0  categories:='["cpu"]' | jq -e
	$(FAIL) -v PUT    $(URL)/api/products/80 bb=2 name=Z80  price=8.0  categories:='["cpu"]' |& grep 400
	$(OK)      GET    $(URL)/api/products/80                                                 | jq -e '.price == 8.0'
	$(OK)      PATCH  $(URL)/api/products/80      price=79.9                                 | jq -e
	$(FAIL) -v PATCH  $(URL)/api/products/80       rice=21.99                                |& grep 400
	$(OK)      GET    $(URL)/api/products/80                                                 | jq -e '.price == 79.9'

.PHONY: dev
dev: ; ls *.js src/*/*.js Makefile \
	| entr -rcs '(node index.js &; sleep 0.8 && time make test || notify-send -u critical -t 1000 "woops")'
