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
  