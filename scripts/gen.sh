#!/bin/zsh

# Accept a destination folder and component name
# Generate a file and a test from templates
# build to run from package.json at root

FOLDER=$1
COMPONENT=$2
FILE=$(echo "$2" | tr '[:upper:]' '[:lower:]')
TEMPLATE=$PWD/scripts/template.js
OUT=$PWD/src/$FOLDER/$FILE.js
TESTS=$PWD/scripts/template.test.js
OUTTESTS=$PWD/src/$FOLDER/__tests__/$FILE.test.js

usage() {
  echo "Usage: $0 [FOLDER] [COMPONENT]"
  exit 1
}

if [ -z $FOLDER ]
then
  echo "Missing FOLDER"
  usage
fi

if [ -z $COMPONENT ]
then
  echo "Missing Component Name"
  usage
fi

# if directory doesnt exist, make it
mkdir -p src/$FOLDER/__tests__

# create the component
sed "s/MyComponent/$COMPONENT/g" $TEMPLATE > $OUT

# create the test file
sed "s/MyComponent/$COMPONENT/g" $TESTS > $OUTTESTS

#sed -i "s/mycomponent/$FILE/g" $OUTTESTS
