pipeline { 
        agent none
        stages {
                // stage('prepare') {
		//     steps {        		
                //         sh 'touch .env.local'
                //         sh 'echo -e "VUE_APP_KAKAO_API_KEY=\'{키 내용}\'\nVUE_APP_KAKAO_MAP_API_KEY=\'{키 내용}\'\nVUE_APP_KAKAO_CLIENT_ID=\'{키 내용}\'" > .env.local'
                // }
        	// 	sh 'cp -r /var/jenkins_home/workspace/breeze/breeze/backend/* /var/jenkins_home/dist/django'
		//     }
		// }
                stage('Docker build') {
                        agent any
                        steps {
                                // sh 'cp ~/home/ubuntu/zzz.env ./frontend/src/.env'                                
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
