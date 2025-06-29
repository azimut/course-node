PORT := 3030

test:
	http GET http://127.0.0.0:$(PORT)/notfound
	http GET http://127.0.0.1:$(PORT)/products
	http GET http://127.0.0.1:$(PORT)/products/20
