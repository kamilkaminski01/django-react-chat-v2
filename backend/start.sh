#!/bin/bash

echo "Starting server"
daphne -b 0.0.0.0 -p 8000 backend.asgi:application

exec "$@"
