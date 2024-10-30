
version: 0.2

phases:
  install:
    commands:
      - npm i npm@latest -g
      - aws s3 rm --recursive "s3://frontend-hide.cf" 
  pre_build:
    commands:
      - echo Pre_build Phase
      - npm install
  build:
    commands:
      - echo Build Phase
      - npm run build
  post_build:
    commands:
      - echo PostBuild Phase
      - aws s3 sync ./dist s3://frontend-hide.cf