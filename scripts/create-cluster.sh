#!/bin/bash

eksctl create cluster \
--name bookstore-cluster \
--node-type t3.medium \
--nodegroup-name bookstore-nodegrp \
--version 1.20 \
--nodes 2 \
--managed

eksctl get cluster --name=bookstore-cluster