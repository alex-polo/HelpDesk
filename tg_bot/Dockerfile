FROM python:3.12-alpine

RUN mkdir /HelpDeskBot
WORKDIR /HelpDeskBot

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .
