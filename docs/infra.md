# INFRA

### Policy S3

{
  "Id": "Policy1729803906512",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1729803898183",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::frontend-hide.cf/*",
      "Principal": "*"
    }
  ]
}


### Front CodeBuild

version: 0.2

phases:
  build:
    commands:
      - echo "Building Frontend"
      - cd $CODEBUILD_SRC_DIR/frontend
      - npm install
      - npm run build
  artifacts:
    files: $CODEBUILD_SRC_DIR/frontend/dist
  

version: 0.2

phases:
  install:
    commands:
      - npm i npm@latest -g
      - pip install --upgrade pip
      - pip install --upgrade awscli
  pre_build:
    commands:
      - echo Pre_build Phase
      - cd $CODEBUILD_SRC_DIR/frontend
      - npm install
  build:
    commands:
      - echo Build Phase
      - npm run build
  post_build:
    commands:
      - echo PostBuild Phase
      - echo aws s3 sync ./dist $S3_BUCKET
      
artifacts:
  files:
    - 'dist/**/*'