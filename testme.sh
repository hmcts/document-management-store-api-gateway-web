#!/bin/sh
yarn clean
./fakeversion.sh
yarn install
yarn setup
yarn lint
./bin/test_dependency.sh
./bin/test_coverage.sh
./bin/test_integration.sh
