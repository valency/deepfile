.PHONY: all install start


all:
	@echo [install] components
	@echo [start] server


install:
	npm install --registry=https://registry.npm.taobao.org


start:
	node app.js


