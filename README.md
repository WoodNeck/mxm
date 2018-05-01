# MIX X MATCH
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![PEP8](https://img.shields.io/badge/code%20style-pep8-orange.svg)](https://www.python.org/dev/peps/pep-0008/)

| Branches       | Build Status |
|----------------|--------------|
| devel          |[![Build Status](https://travis-ci.org/WoodNeck/mxm.svg?branch=devel)](https://travis-ci.org/WoodNeck/mxm)|
| devel-frontend |[![Build Status](https://travis-ci.org/WoodNeck/mxm.svg?branch=devel-fe)](https://travis-ci.org/WoodNeck/mxm)|
| devel-backend  |[![Build Status](https://travis-ci.org/WoodNeck/mxm.svg?branch=devel-be)](https://travis-ci.org/WoodNeck/mxm)|

- Principles and Practices of Software Development, 2018 Spring, Team 6

*****

# Prerequisites
You have to install [Python](https://www.python.org/)(>=3.5) and [node.js](https://nodejs.org/ko/)&[npm](https://www.npmjs.com/)(>=5.8.0) before starting.

# Installing
Next set of commands will install all python & javascript dependencies.
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# Running the tests
## Run all tests
``` bash
npm test
```

## E2E tests
We're using [Nightwatch.js](http://nightwatchjs.org/) for E2E test.
``` bash
npm run e2e
```

## Unit tests
#### Frontend
We're using [Jest](https://facebook.github.io/jest/) for unit test.
``` bash
npm run unit
```

#### Backend
``` bash
python3 manage.py test backend
```

## Linting
#### Javascript
We're using [standard](https://github.com/standard/standard) style for javascript files.

``` bash
npm install standardx --global
npm install snazzy --global
standardx --fix --verbose "assets/**/*.js" | snazzy
```

#### Python
We're using [PEP8](https://www.python.org/dev/peps/pep-0008/) style for python files.

```
    pip install flake8
    flake8 .
```

# Deployment


# Deployment
#### Tested on Ubuntu 16.04 LTS
We're using [nginx](https://nginx.org/en/) and [uwsgi](https://uwsgi-docs.readthedocs.io/en/latest/) configs for deployment web server deployment.
Simply use deploy.sh shell script for deploy
``` bash
./deploy.sh
```

Install nginx & uwsgi first
```
    sudo apt-get install nginx
    pip install uwsgi
```
You should provide proper absolute path for these files
- mxm_nginx.conf
- mxm_uwsgi.ini
Make a symbolic link for nginx
```
    cd /etc/nginx/sites-enabled
    sudo ln -s path/to/mix_x_match/mxm_nginx.conf /etc/nginx/sites-enabled/
```
Now you can run nginx & uwsgi with django
```
    // At the root of project directory
    sudo systemctl start nginx
    uwsgi --ini mxm_uwsgi.ini
```
You can stop nginx with
```
    sudo systemctl stop nginx
```


# Built With
#### Overall
- [Travis.ci](https://travis-ci.org/WoodNeck/mxm) - Continuous Integration

#### Frontend
- [Vue.js](https://vuejs.org/) - Main web framework
- [Vuex](https://vuex.vuejs.org/kr/) - State management
- [Vue-router](https://router.vuejs.org/kr/) - SPA development tool
- [Axios](https://github.com/axios/axios) - Web request & response handling
- [Jest](https://facebook.github.io/jest/) - Unit test
- [npm](https://www.npmjs.com/) - Package manager

#### Backend
- [Django](https://www.djangoproject.com/) - Main framework
- [Django rest framework](http://www.django-rest-framework.org/) - Web API building
- [Django webpack loader](https://github.com/owais/django-webpack-loader) - Django integration with frontend webpack

# Contributing
Please read [CONTRIBUTING.md](https://github.com/WoodNeck/mxm/blob/master/CONTRIBUTING.md) for details.

# License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/WoodNeck/mxm/blob/master/LICENSE) file for details

# Contributors
- Kim, Mingyu
- Kim, Yoonsung
- Kim, Jungwon
- Lee, Yunsun
