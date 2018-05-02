#!/bin/bash

if [[ $TRAVIS_BRANCH == 'devel_fe' ]
then
  npm run test_fe
elif [[ $TRAVIS_BRANCH == 'devel_be' ]]
then
  python manage.py test
else
then
  npm run test_all
fi
