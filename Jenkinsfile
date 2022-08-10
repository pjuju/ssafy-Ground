pipeline { 
        agent none
        stages {
                stage('Docker build') {
                        agent any
                        steps {
                                sh 'echo hello2'
                        }
                }
                stage('Docker run') {
                        agent any
                        steps {
                                sh 'echo hello'
                        }
                }
        }

}