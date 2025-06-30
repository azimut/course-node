HOST := 127.0.0.1
PORT := 3030
URL  := $(HOST):$(PORT)
AUTH := http --check-status --auth user:password

.PHONY: test
test:
	http    GET    $(URL)/notfound                               | jq -e '.error'
	http    GET    $(URL)/products/asdf                          | jq -e '.error'
	$(AUTH) GET    $(URL)/products                               | jq -e 'length == 2'
	$(AUTH) GET    $(URL)/products/search  name==NE              | jq -e '.[0].id == 20'
	$(AUTH) GET    $(URL)/products/search  minPrice==99          | jq -e '.[0].id == 20'
	$(AUTH) GET    $(URL)/products/search  maxPrice==99          | jq -e '.[0].id == 1'
	$(AUTH) GET    $(URL)/products/search  foo==bar              | jq -e 'length == 0'
	$(AUTH) GET    $(URL)/products/20                            | jq -e '.title == "NE555"'
	http    GET    $(URL)/products/1337                          | jq -e '. == {}'
	$(AUTH) POST   $(URL)/products         name=NE555 price=55.5 | jq -e 'length == 3'
	$(AUTH) PUT    $(URL)/products/20      name=Z80   price=8.0  | awk 'END { if (NR > 0) exit(1) }'
	$(AUTH) PATCH  $(URL)/products/20      price=79.9            | awk 'END { if (NR > 0) exit(1) }'
	$(AUTH) DELETE $(URL)/products/20                            | awk 'END { if (NR > 0) exit(1) }'
