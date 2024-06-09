#!/bin/bash
gunicorn src.server:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8443 --keyfile="cert/device.key" --certfile="cert/developer.host.crt"