#!groovy

/*
The MIT License
Copyright (c) 2015-, CloudBees, Inc., and a number of other of contributors
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

node {
  stage('Init') {
    def node = tool name: 'NodeMain', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${node}/bin:${env.PATH}"
    def docker = tool name: 'Docker', type: 'jenkins.plugins.docker.tools.DockerTool'
    env.PATH
  }
  stage('Checkout') {
    echo 'Getting source code...'
    checkout scm
  }

  stage('GO NODE') {
    sh 'node -v'
    sh 'npm i'
    sh 'npm run build'
  }

  stage('build docker') {
    sh 'docker --version'
    // docker.withTool('Docker') {
    //   sh 'printenv'
    //   sh 'docker images'
    //   base = docker.build('budget-app')
    // }
  }

  stage('run docker') {
    echo 'Kill docker image here'
    echo 'Run docker image here -p 8081:8081 -d --init'
    echo 'Prune docker images here'
  }
}
