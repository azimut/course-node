.POSIX:
.SUFFIXES:

URL   ?= :3030
EMAIL ?= user@email.com
PASS  ?= stronPass123
OK     = curlie -fs --oauth2-bearer $(TOKEN)
FAIL   = curlie  -s --oauth2-bearer $(TOKEN)
SHELL := /bin/bash -o pipefail

.PHONY: test
test:
	$(eval TOKEN = $(shell curlie -s POST $(URL)/auth/login email=$(EMAIL) password=$(PASS) | jq -e .token))
	@echo "Token: "$(TOKEN)

	$(eval TMPID = $(shell $(OK) POST $(URL)/api/products/create name=6502 price=650.2 categories:='["cpu"]' | jq -re '.id'))
	$(OK)      GET    $(URL)/api/products/$(TMPID)                                                  | jq -e '.name == "6502"'

	curlie -s  GET    $(URL)/notfound                                                               | jq -e '.error'
	curlie -sv GET    $(URL)/api/products                                                           |& grep 401

	$(OK)      DELETE $(URL)/api/products/all                                                       | jq -e
	$(OK)      POST   $(URL)/api/products/create < <(jq -r '.[0]' < test/init.json)                 | jq -e '.id'
	$(OK)      POST   $(URL)/api/products/create < <(jq -r '.[1]' < test/init.json)                 | jq -e '.id'
	$(OK)      POST   $(URL)/api/products/create < <(jq -r '.[2]' < test/init.json)                 | jq -e '.id'
	$(OK)      GET    $(URL)/api/products                                                           | jq -e 'length == 3'

	$(FAIL) -v POST   $(URL)/api/products/create buzz=2 name=6502 price=650.2 categories:='["cpu"]' |& grep 400
	$(OK)      DELETE $(URL)/api/products/what                                                      | jq -e
	$(FAIL) -v GET    $(URL)/api/products/what                                                      |& grep 404
	$(FAIL) -v GET    $(URL)/api/products/1337                                                      |& grep 404

	$(OK)      GET    $(URL)/api/products/search  name==555                                         | jq -e 'length == 1'
	$(OK)      GET    $(URL)/api/products/search  minPrice==99                                      | jq -e 'length == 1'
	$(OK)      GET    $(URL)/api/products/search  maxPrice==99                                      | jq -e 'length == 2'
	$(OK)      GET    $(URL)/api/products/search  maxPrice==1                                       | jq -e 'length == 0'
	$(OK)      GET    $(URL)/api/products/search  category==cpu                                     | jq -e 'length == 1'
	$(FAIL)    GET    $(URL)/api/products/search  foo==bar                                          | jq -e '.errors[0].msg'

	$(OK)      PUT    $(URL)/api/products/80      name=Z80  price=8.0  categories:='["cpu"]'        | jq -e
	$(FAIL) -v PUT    $(URL)/api/products/80 bb=2 name=Z80  price=8.0  categories:='["cpu"]'        |& grep 400
	$(OK)      GET    $(URL)/api/products/80                                                        | jq -e '.price == 8.0'
	$(OK)      PATCH  $(URL)/api/products/80      price=79.9                                        | jq -e
	$(FAIL) -v PATCH  $(URL)/api/products/80       rice=21.99                                       |& grep 400
	$(OK)      GET    $(URL)/api/products/80                                                        | jq -e '.price == 79.9'
	$(OK)      DELETE $(URL)/api/products/80                                                        | jq -e

.PHONY: dev
dev: ; ls *.js src/*/*.js Makefile \
	| entr -rcs '(npm run swagger; node index.js &; sleep 1 && time make test || notify-send -u critical -t 2000 "woops")'

.PHONY: docs
docs: ; ls *.js src/*/*.js \
	| entr -rcs '(npm run swagger; node index.js)'
