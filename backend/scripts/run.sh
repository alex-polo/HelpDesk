#!/bin/bash
gunicorn src.server:app --workers 8 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8443 --keyfile="cert/SSL/www.objectus.ru.key" --certfile="cert/SSL/certificate_ca.crt"