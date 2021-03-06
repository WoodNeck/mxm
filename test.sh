#!/bin/bash

echo "Running test on branch:" $TRAVIS_BRANCH
if [[ $TRAVIS_BRANCH == 'devel-fe' ]]; then
  npm run test_fe
elif [[ $TRAVIS_BRANCH == 'devel-be' ]]; then
  python3 manage.py test && COVERALLS_REPO_TOKEN=$COVERALLS_REPO_TOKEN coveralls
else
  npm run test_all
fi
