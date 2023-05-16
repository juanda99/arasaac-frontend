#!/bin/bash

# Get the version from the parameter
VERSION=$1
npm run build
# If version is empty, exit with warning
if [ -z "$VERSION" ]
then
  echo "No version specified. Usage: ./deploy-beta.sh <version>"
  exit 1
fi

if [[ $VERSION != *"beta"* ]]; then
  echo "Version must include 'beta'."
  exit 1
fi

# Build the Docker image
docker build -f Dockerfile.beta -t cateduac/arasaac-frontend:$VERSION .

# Push the Docker image to Docker Hub
docker push cateduac/arasaac-frontend:$VERSION
