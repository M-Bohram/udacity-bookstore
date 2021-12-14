pipeline {
  agent {
    kubernetes {
      yamlFile "agent.yaml"
    }
  }
  environment {
    PROJECT = "simple-ecommerce"
    DOCKER_ID = "mbohram"
    DOCKER_REPO = "${DOCKER_ID}/${PROJECT}"
    DOCKER_CONTEXT = "."
    IMAGE_TAG = "${DOCKER_REPO}:${BUILD_NUMBER}"
  }
  stages {
    stage("Install-dependencies") {
      steps {
        container("npm") {
          sh """
          npm install
          """
        }
      }
    }
    stage("Lint-Eslint") {
      steps {
         container("npm") {
          sh """
          npm run lint
          """
        }
      }
    }
    stage("Build-NPM") {
      steps {
        container("npm") {
          sh """
          npm run build
          """
        }
      }
    }
    stage("Deliver-ContainerImage") {
      steps {
        container("kaniko") {
          sh "/kaniko/executor --context ${DOCKER_CONTEXT} --destination ${IMAGE_TAG}"
        }
      }
    }
    stage("Deploy-Kubernetes") {
      steps {
        container("kustomize") {
          sh "sed -i 's~image: .*~image: ${IMAGE_TAG}~g' kubernetes/deployment.yaml"
          sh "kubectl apply -f kubernetes/deployment.yaml"
        }
      }
    }
  }
}