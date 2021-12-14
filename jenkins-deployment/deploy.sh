#!/bin/bash

# kubectl create namespace jenkins
# kubectl create -f rbac.yaml
# kubectl create secret docker-registry regcred --docker-username=mbohram --docker-password=ad3382a3-042c-4a95-9a5a-d140090adf7b -n jenkins

# helm repo add jenkins https://SonarSource.github.io/helm-chart-sonarqube
# helm repo update
helm install jenkins jenkins/jenkins --values helm-values.yaml -n jenkins --wait

