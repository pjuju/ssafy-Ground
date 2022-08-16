pipeline { 
        agent none
        stages {
                stage('Create .env') {
                        sh 'echo "REACT_APP_KAKAO_REST_API_KEY=${env.REACT_APP_KAKAO_REST_API_KEY}" >> .env'
                        sh 'echo "REACT_APP_KAKAO_REDIRECT_URI=${env.REACT_APP_KAKAO_REDIRECT_URI}" >> .env'
                        sh 'echo "REACT_APP_GOOGLE_CLIENT_ID=${env.REACT_APP_GOOGLE_CLIENT_ID}" >> .env'
                        sh 'echo "REACT_APP_GOOGLE_REDIRECT_URI=${env.REACT_APP_GOOGLE_REDIRECT_URI}" >> .env'

                        sh 'echo "REACT_APP_FB_API_KEY=${env.REACT_APP_FB_API_KEY}" >> .env'
                        sh 'echo "REACT_APP_FB_AUTH_DOMAIN=${env.REACT_APP_FB_AUTH_DOMAIN}" >> .env'
                        sh 'echo "REACT_APP_FB_PROJECT_ID=${env.REACT_APP_FB_PROJECT_ID}" >> .env'
                        sh 'echo "REACT_APP_FB_STORAGE_BUCKET=${env.REACT_APP_FB_STORAGE_BUCKET}" >> .env'
                        sh 'echo "REACT_APP_FB_MESSAGE_ID=${env.REACT_APP_FB_MESSAGE_ID}" >> .env'
                        sh 'echo "REACT_APP_FB_APP_ID=${REACT_APP_FB_APP_ID}" >> .env'
                }
                stage('Docker build') {
                        agent any
                        steps { 
                                // sh 'touch ./frontend/123.env'                                                           
                                sh 'docker build -t backimg ./backend/ground'
                                sh 'docker build -t frontimg ./frontend'
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
