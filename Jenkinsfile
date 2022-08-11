pipeline { 
        agent none
        stages {
                stage('Gradle build') {
                        agent any
                        steps { 
                                sh 'chmod 755 ./backend/ground/gradlew' 
                                // sh './backend/ground/gradlew init'                  
                                sh './backend/ground/gradlew bootJar'
                                sh 'echo hello1'
                        }
                }
                stage('Docker build') {
                        agent any
                        steps {
                                sh 'docker build -t backimg ./backend/ground'
                                sh 'docker build -t frontimg ./frontent'
                                sh 'echo hello2'
                        }
                }
                stage('Docker run') {
                        agent any
                        steps {
                                sh 'docker ps -f name=front -q \
                                        | xargs --no-run-if-empty docker container stop'

                                sh 'docker ps -f name=back -q \
                                        | xargs --no-run-if-empty docker container stop'

                                sh 'docker container ls -a -f name=front -q \
                                        | xargs -r docker container rm'

                                sh 'docker container ls -a -f name=back -q \
                                        | xargs -r docker container rm'


                                sh 'docker run -d --name front -p 80:80 frontimg'
                                sh 'docker run -d --name back -p 8080:8080 backimg'
                                sh 'echo hello3'
                        }
                }
        }

}
