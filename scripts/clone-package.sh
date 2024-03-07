#!/bin/sh

REPO_NAME="${1:-sh-custom-embedded-login}"
BRANCH_NAME="${2:-dev}"
echo "$REPO_NAME"
echo "$BRANCH_NAME"
APPDIR=`pwd`
cd ..
rm -fr $REPO_NAME
git clone https://github.com/yaradigitallabs/$REPO_NAME.git

cd $REPO_NAME
git checkout $BRANCH_NAME
