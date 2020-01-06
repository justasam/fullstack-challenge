#!/bin/bash

# clean up previous build
rm -rf ./build/*
# move new build
mkdir ./build/; ../frontend/build/* -f $_