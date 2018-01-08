#!groovy

properties([
    [
        $class: 'GithubProjectProperty',
        displayName: 'Document Management Store Api Gateway Web',
        projectUrlStr: 'https://github.com/hmcts/document-management-store-api-gateway-web/'
    ],
    pipelineTriggers([
        [$class: 'GitHubPushTrigger']
    ])
])


@Library('Reform')
import uk.gov.hmcts.Ansible
import uk.gov.hmcts.Artifactory
import uk.gov.hmcts.Packager
import uk.gov.hmcts.RPMTagger
import uk.gov.hmcts.Versioner

String channel = '#dm-pipeline'

def product = "evidence"
def app = "document-management-store-api-gateway-web"
def artifactorySourceRepo = "evidence-local"

def ansible = new Ansible(this, product)
def artifactory = new Artifactory(this)
def packager = new Packager(this, product)
def versioner = new Versioner(this)

def rpmTagger
def rpmVersion
def version


node {
    try {
        stage('Checkout') {
            deleteDir()
            checkout scm
        }

        stage('Build') {
            sh "yarn install"
            sh "yarn setup"
        }

        stage('Lint') {
            sh 'yarn lint'
        }

        stage('Node security check') {
            try {
                sh 'yarn test:nsp'
            } catch (Throwable e) {
                def errors = sh(script: 'yarn test:nsp-warn', returnStdout: true)
                slackSend(
                    channel: "#dm-pipeline",
                    color: 'danger',
                    message: "${env.JOB_NAME}:  <${env.BUILD_URL}console|Build ${env.BUILD_DISPLAY_NAME}> has vunerabilities: ${errors}")

            }finally{
//                need to generate a nsp report somehow
            }
        }

        stage('Test') {
            try{
                sh "yarn test"
                sh "yarn test:coverage"
            } finally {
                publishHTML([
                    allowMissing         : false,
                    alwaysLinkToLastBuild: false,
                    keepAll              : false,
                    reportDir            : "mochawesome-report/",
                    reportFiles          : 'mochawesome.html',
                    reportName           : 'Unit Test Report'
                ])
                publishHTML([
                    allowMissing         : false,
                    alwaysLinkToLastBuild: false,
                    keepAll              : false,
                    reportDir            : "coverage/lcov-report/",
                    reportFiles          : 'index.html',
                    reportName           : 'Coverage Report'
                ])
            }
        }

        try {
            stage('Start App with Docker') {
                sh "docker-compose -f docker-compose.yml -f docker-compose-test.yml pull"
                sh "docker-compose up --build -d"
            }

            stage('Run Integration tests in docker') {
                sh "docker-compose -f docker-compose.yml -f docker-compose-test.yml run -e GRADLE_OPTS document-management-store-integration-tests"
            }
        }
        catch (e){
            throw e
        }
        finally {
            sh "docker-compose logs --no-color > logs.txt"
            archiveArtifacts 'logs.txt'
            sh "docker-compose down"
        }

        if ("master" == "${env.BRANCH_NAME}") {
            stage('Sonar') {
                sh "yarn sonar-scan -Dsonar.host.url=$SONARQUBE_URL"
            }
        }

        if ("master" == "${env.BRANCH_NAME}") {

            stage('Package (RPM)') {
                rpmVersion = packager.nodeRPM(app)
                version = "{document_management_store_api_gateway_web_version: ${rpmVersion}}"
            }

            stage('Publish RPM') {
                packager.publishNodeRPM(app)
                def rpmName = packager.rpmName(app, rpmVersion)
                rpmTagger = new RPMTagger(this, app, rpmName, artifactorySourceRepo)
            }

            stage('Publish Docker') {
                dockerImage(imageName: "evidence/${app}")
            }

            stage ('Deploy and Test on Dev') {
                build job: 'document-deploy', parameters: [
                    [$class: 'StringParameterValue', name: 'BUILD_APP', value: app],
                    [$class: 'StringParameterValue', name: 'BUILD_VERSION', value: rpmVersion],
                    [$class: 'StringParameterValue', name: 'ENVIRONMENT', value: 'dev']
                ]
            }

                stage ('Deploy and Test on Test') {
                    build job: 'document-deploy', parameters: [
                        [$class: 'StringParameterValue', name: 'BUILD_APP', value: app],
                        [$class: 'StringParameterValue', name: 'BUILD_VERSION', value: rpmVersion],
                        [$class: 'StringParameterValue', name: 'ENVIRONMENT', value: 'test']
                    ]
                    //rpmTagger.tagTestingPassedOn("test")
                }

        }
        notifyBuildFixed channel: channel

    } catch (e){
        notifyBuildFailure channel: channel
        throw e
    }
}
