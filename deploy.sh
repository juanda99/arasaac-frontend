#!/bin/bash

# Get the version from the parameter
VERSION=$1

# If version is empty, exit with warning
if [ -z "$VERSION" ]
then
  echo "No version specified. Usage: ./deploy.sh <version>"
  exit 1
fi

# Build the Docker image
docker build -t cateduac/arasaac-frontend:$VERSION .

# Push the Docker image to Docker Hub
docker push cateduac/arasaac-frontend:$VERSION

# Tag and push the Docker image as "latest"
docker tag cateduac/arasaac-frontend:$VERSION cateduac/arasaac-frontend:latest
docker push cateduac/arasaac-frontend:latest

# Tag and push the Docker image with the major version (e.g. 1)
MAJOR_VERSION=$(echo $VERSION | cut -d. -f1)
docker tag cateduac/arasaac-frontend:$VERSION cateduac/arasaac-frontend:$MAJOR_VERSION
docker push cateduac/arasaac-frontend:$MAJOR_VERSION

# Tag and push the Docker image with the major-minor version (e.g. 1.0)
MAJOR_MINOR_VERSION=$(echo $VERSION | cut -d. -f1-2)
docker tag cateduac/arasaac-frontend:$VERSION cateduac/arasaac-frontend:$MAJOR_MINOR_VERSION
docker push cateduac/arasaac-frontend:$MAJOR_MINOR_VERSION
