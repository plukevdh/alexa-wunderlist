prepare:
	yarn install

build: prepare
	yarn run build

pre-package:
	cp package.json dist/
	cd dist && yarn install --production

package: clean build pre-package
	cd dist && zip -r ../alexa-wunderlist.zip *

publish: package
	aws --profile plukevdh s3 cp alexa-wunderlist.zip s3://hatd-lambdas/alexa-wunderlist.zip
	aws --profile plukevdh lambda update-function-code --function-name alexa-wunderlist \
	--s3-bucket hatd-lambdas --s3-key alexa-wunderlist.zip

clean:
	rm -r dist/
	rm alexa-wunderlist.zip

schema:
	./bin/schema.js
