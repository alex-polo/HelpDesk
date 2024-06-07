FROM python:3.12-alpine

RUN mkdir /logika-server
WORKDIR /logika-server

COPY ../server/requirements.txt .

RUN pip install -r requirements.txt

COPY .. .

RUN chmod a+x ./server/scripts/*.sh

#WORKDIR src
#CMD gunicorn src.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000