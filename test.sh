#!/bin/bash

if [[ $TRAVIS_BRANCH == 'devel_fe' ]]
then
  npm run test_fe
elif [[ $TRAVIS_BRANCH == 'devel_be' ]]
then
  python3 manage.py test
else
  npm run test_all
fi
