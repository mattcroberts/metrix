#!/bin/bash

echo "Running Metrix Migration"

docker exec -u node www_metrix_api_1 yarn --cwd ./packages/api typeorm migration:run | xargs