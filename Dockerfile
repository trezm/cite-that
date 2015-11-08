FROM node:4.2.2-onbuild

RUN         mkdir -p /node
WORKDIR     /node
COPY        . /node

ENV         RUNNING_DOCKER  true
EXPOSE      3000
