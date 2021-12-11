#!/usr/bin/env bash

set -vux

# cleanup() {
#     rv=$?
#     echo "Cleaning up"
#     mssqladmin -uroot -h127.0.0.1 --protocol=tcp shutdown
#     exit $rv
# }

# trap cleanup EXIT ERR

function wait-on {
  while ! nc -z localhost $1 </dev/null; do sleep 1; done
}

service mssql start
mssql < ./docker/mssql/init-tdm-db.sql

wait-on 1434
