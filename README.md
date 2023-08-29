# 일정관리 서버
> 회사에서 사용하는 간단한 일정관리 앱을 위한 백엔드 서버

## 구성
- 시스템
  - OS Version     : Windows 10
  - NodeJS Version : v18.17.1
  - NPM Version    : 9.8.1 
- 서버
  - nestjs
- DB
  - mysql 8.0 + typeorm

## DB 준비
- 프로젝트 루트 디렉토리에 있는 ```ddl.sql``` 파일을 실행하여 스키마 생성

## 서버 환경설정
- ```.{NODE_ENV}.env``` 파일 필요
- ```npm run start```시 ```NODE_ENV=local```로 시작됨.
- ```.env``` 파일 예시
```
.local.env 예시
DB_HOST=localhost
DB_USERNAME=your-mysql-username
DB_PASSWORD=your-mysql-password
BATCH_TARGET_URL=localhost:8000
```

## API문서
서버실행 후 ```"/api"```에서 swagger로 확인 가능

## 기획 가정
1. ```모든 일정의 완료 날짜 하루 전에 특정 URL(Post) 로 해당 일정의 내용을 전달하는 기능```
  - 하루 한 번 다음 날에 완료해야 할 일정의 정보를 한 곳에서 받아보싶다고 가정
  - 업무 시작 전인 (유연근무제 8시~10시 가정) 매일 8시 전송
2. 일정의 설명을 제외한 모든 속성은 Null 값을 가질 수 없음.

## 디렉토리 구조
src  
├─auth : 인증 모듈(로그인)  
│  ├─dto  
│  ├─jwt : Gaurd설정  
│  └─token  
├─batch : 모든 일정의 완료 날짜 하루 전에 특정 URL(Post) 로 해당 일정의 내용을 전달하는 기능  
├─cofig : 환경변수 검증 및 사용  
├─common : 공통 기능  
│  └─decorators  
├─exception : 커스텀 예외(사용안함)  
├─task : 일정 리소스 모듈  
│  ├─dto  
│  └─entities  
└─user : 유저 리소스 모듈  
│  ├─dto  
│  └─entities  

## 개선해야 할 점
1. js-joda 또는 luxon 으로 Date타입 대체 검토.
2. Cron 주기(하루 중 특정 시간), Jwt 만료시간 등의 설정을 .env 로 추출.
3. Jwt => Refresh 토큰 추가, 토큰 블랙리스트 관리, 토큰 암호화.
4. task_status 테이블과 TASK_STATUS 열거형의 값 동기화 방법.
5. nestjs CLI plugin 사용하여 swagger 데코레이터 줄이기.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
