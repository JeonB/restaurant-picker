[![image.png](https://i.postimg.cc/TYL069Dc/image.png)](https://postimg.cc/mt4C37Vc)

**요구 사항 분석 및 설계**:

> **사용자 요구사항 정의**
>
> 1.  랜식추 프로그램은 매일 근무지 주변 식당 중에서 랜덤으로 한 개의 식당과 메뉴를 추천해줘야 한다.

1. **기능 명세**:

   > [![image.png](https://i.postimg.cc/nrtFhTLQ/image.png)](https://postimg.cc/FdD5Py39)
   >
   > 1. 식당은 회사 기준 250m 이내로 제한한다.
   > 2. 랜덤으로 나온 식당 중 마음에 안 들면 다시 랜덤 선택이 가능해야 한다. 이 때, 한 번 나온 식당은 제외한다. 리셋 기능도 있어야 한다.
   > 3. 카테고리별로 메뉴 선정이 가능해야한다. 예를 들어 일식,중식,한식,양식,분식 등의 카테고리에서 식당과 메뉴과 추천되어야 한다.
   > 4. 식당 리스트는 사용자가 직접 추가 및 삭제가 가능해야 한다.
   > 5. 방문한 식당은 리스트에 저장되어야 한다. 리스트에 저장된 식당 중 랜덤 선택에서 제외하는 기능도 있어야 한다.

2. **데이터 구조 설계**:

   > 1. PostgreSQL , TypeORM 사용
   > 2. 식당 entity 작성 - 식당명, 카테고리, 거리, 장소 URL, 전화번호 데이터를 Kakao API를 통해 추출 및 가공하여 DB에 저장

3. **알고리즘 설계**:

   > 1. 랜덤 식당 및 메뉴 추천 알고리즘.
   > 2. 바로 직전 추첨된 메뉴,일주일전 메뉴 등 사용자가 설정한 메뉴들을 제외가능하게 할 수 있음.
   > 3. 반경 250m이내의 식당만 크롤링
   > 4. 인원수에 맞는 식당 추천. 예를 들어, 얌샘 김밥은 4인 이하만 가능

4. **사용자 인터페이스 설계**:

   > UI는 PrimeReact, MUI를 활용하여 구현

5. **프로그램 구현**:

   1. 기술 스택
      > **FrontEnd**
      >
      > - ReactJS, PrimeReact, Typescript,NextJS
      >
      > ***
      >
      > **BackEnd**
      >
      > - Node.js, Fastify, PostgreSQL, TypeORM, Typescript
      >
      > ***
      >
      > **Security**
      >
      > - JWT
      >
      > ***
      >
      > **Infra**
      >
      > - Docker, AWS
      >
      > ***
      >
      > **Mobile App**
      >
      > - ReactNative

6. **테스트 및 디버깅**: 구현한 프로그램을 테스트하여 버그를 찾고 수정. 이를 통해 프로그램의 안정성과 신뢰성을 확인.

---

**개발 환경 구축**

1. npm package를 설치합니다:

   `npm install`

2. Docker를 통해 PostgreSQL 컨테이너를 설치합니다:

   `docker run --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password123! -e POSTGRES_DB=test -d postgres:12.18-bullseye`

3. docker-compose up 명령어로 한 개의 컨테이너로 실행가능합니다.(선택):

   `docker-compose up -d`
