# Spring Boot와 React를 사용하여 MSA 프로젝트 만들기

Spring Boot와 React.js 를 모두 구성하여 MSA로 모듈별 프로젝트를 생성 및 관리<br>

## 사용한 툴
![js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![js](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![js](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![js](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![js](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![js](https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=eclipse&logoColor=white)
![js](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white)
![js](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![js](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)
![js](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=RabbitMQ&logoColor=white)

## 개요

리액트와 스프링 부트를 연동하여 MSA로 구성된 프로젝트를 만들고 싶었습니다. 현재 두개의 모듈과 하나의 데이터 베이스로 연동을 하였고 JWT를 사용하여 인증 설정을 해놓았습니다.

<br>

## 설계
![image](https://github.com/user-attachments/assets/99eb6bc9-308a-406b-8f3a-859b7b7065da)

<br>

## Spring 구성
![image](https://github.com/user-attachments/assets/8fd90126-fd19-45f5-9d9c-172e19a9deba)


## 사용한 버전
Node : v20.16.0 <br>
Spring Boot : 3.3.3 <br>
JDK : 17 <br>
react : 18.3.1 <br>
redis : 3.05 <br>
RabbitMQ : 3.13.7 <br>

### React.js 구성 요소
```bash
# 프로젝트 생성 및 실행
mkdir 본인 프로젝트명 # root directory
cd 본인 프로젝트명
npx create-react-app 본인 프로젝트명
cd 본인 프로젝트명
npm start

# 필요한 모듈 설치
npm install bootstrap react-bootstrap --save # 부트스트랩 모듈
npm install react-router-dom --save # 라우터 모듈
npm install axios --save # 서버와 통신하기 위한 모듈
```

### Spring Boot 구성 요소
```bash
#JPA, JWT, Log4J, Eureka, MySql 설정
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-redis'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	implementation 'org.bgee.log4jdbc-log4j2:log4jdbc-log4j2-jdbc4.1:1.16'
	runtimeOnly 'com.mysql:mysql-connector-j'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
	implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
	implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
	implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'
}
```

### 설명
(로그인 + 게시판) , (상품) 두개의 모듈을 스프링 부트로 구성되어 있으며 각 모듈은 로그인시 JWT 생성하여 api 접근시 Filter에서 JWT를 체크한다. <br>

Eureka, api-gateway를 설정, 9000(api-gateway), 9002(로그인+게시판), 9003(상품) 포트 생성 <br>

5개의 메뉴를 구성(현재는 게시판과, 상품만 구성) 게시판에는 댓글과 좋아요 기능이 달렸으며 아이디를 인식하여 수정 및 삭제 접근이 허용된다, 상품 등록은 이미지 업로드 기능이 들어가 있다. <br>

redis 사용, 로그아웃된 토큰을 수집하여 해당된 토큰으로 로그인 없이 접근을 방지한다. <br>


### 추후 개발
<a>config 서버생성 하나의 config만 관리</a> <br>

ELK 생성하여 로그 수합

### 스크린샷
![image](https://github.com/user-attachments/assets/98ef6912-0fe9-4609-8601-a12d78e9cf53)
![image](https://github.com/user-attachments/assets/17667739-d2cd-4f39-809f-34b285944589)
![image](https://github.com/user-attachments/assets/a9ab66e7-35a5-4a35-8683-c8ab05a1e055)






