#!/bin/bash
gunicorn src.server:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8444 --keyfile="cert/objectus.ru.key" --certfile="cert/objectus.ru.pem"