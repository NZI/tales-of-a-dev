#!/bin/env bash
composeFiles=""

for file in ./src/services/*/docker-compose.yml; do
    composeFiles="$composeFiles -f $file";
done
docker-compose -f docker-compose.yml $composeFiles $@ --remove-orphans