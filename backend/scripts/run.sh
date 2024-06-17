#!/bin/bash
gunicorn src.server:app --workers 8 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8443 --keyfile="cert/privkey.pem" --certfile="cert/cert.pem"