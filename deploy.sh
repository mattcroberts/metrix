#!/bin/bash

source env.sh

echo "Running Metrix Migration"

docker-compose -p www exec -u node metrix_api yarn typeorm migration:run | xargs 