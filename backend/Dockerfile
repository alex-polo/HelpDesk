FROM python:3.12-alpine

RUN mkdir /backend-server
WORKDIR /backend-server

COPY ../requirements.txt .

RUN pip install -r requirements.txt

COPY .. .

COPY scripts/*.sh .
#RUN chmod a+x ./scripts/*.sh
RUN chmod a+x *.sh

#WORKDIR src
#CMD gunicorn src.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000