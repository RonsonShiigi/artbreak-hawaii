#! /bin/bash
docker run -d -p 8082:8082 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://vimklzehlrykhl:2b62f0b94a033fe01356a56b6768eb7d9e88ff4c0370f9bcbd968217e3e60cf5@ec2-54-197-239-115.compute-1.amazonaws.com:5432/dai6dci9v6o4gl \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       -e HASURA_GRAPHQL_ADMIN_SECRET=poopoo \
       hasura/graphql-engine:v1.0.0-beta.2