### 도서 검색 사이트 구현

#### Link

[배포 링크]()
[storybook 배포 링크]()

<br/>

#### Overview

| 도서 검색 페이지                                                                                                                                               | 도서 상세 페이지                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="773" alt="스크린샷 2023-12-12 오전 1 05 37" src="https://github.com/Gayun00/widget/assets/67543454/352aed67-5b0e-4cf6-be58-fae875702854"> | <img width="713" alt="스크린샷 2023-12-12 오전 1 07 21" src="https://github.com/Gayun00/widget/assets/67543454/89ffbd3c-53cd-4854-bdbf-a9b3791e5b99"> |
|                                                                                                                                                                |

| 도서 검색                                                                                                             | 도서 상세 페이지로 이동                                                                                               |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --- |
| ![ezgif com-video-to-gif (4)](https://github.com/Gayun00/widget/assets/67543454/a09739b0-15e9-44b2-b721-bd8df8209a16) | ![ezgif com-video-to-gif (6)](https://github.com/Gayun00/widget/assets/67543454/0640bc06-911a-4b97-b16a-4b5efb2a929e) |     |

<br/>

#### Tech stack

| 프레임워크       | 언어      |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white&style=flat&border"> | <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&style=flat&logoColor=white"> |

| 상태관리 라이브러리         | 유닛 테스트   | 컴포넌트 문서화           |
| -------------------------------- | -------------- | ---------------------- | 
| <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&style=flat&logo=ReactQuery&logoColor=white&border"> | <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&style=fla&logoColor=white&border"> | <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&style=flat&logoColor=white&border"> |     |

<br/>

#### 📒 구현 사항

1. [도서검색 사이트] 구현
   - [x] [리스트], [상세] 2개의 화면 구현
   - [x] [리스트] 화면에서 결과값 중 하나를 선택하면 세부정보를 보여주는 [상세] 화면 표시
         

<br/>

2. [리스트]특정 키워드에 대해 검색된 서적 정보표시. 
  - [x] JSON으로 받은 데이터 중 title, subtitle, image, url 프로퍼티를 필수로 화면에 표시. 
  - [x] 무한 스크롤 구현
  - [x] 특정 키워드를 입력받을 수 있도록 함 키워드는 최대 2개이고 ‘or’ 와 ‘not’ operator로
   구분 
    - ‘or(|)’ operator는 각각의 키워드로 검색한 결과를 합쳐서 표시. (e.g. ‘tdd|javascript’ : tdd로 검색한 결과와 jvascript으로 검색한 결과를 합쳐서 표시) 
    - ‘not(-)’ operator는 앞의 키워드가 제목에 포함된 서적을 검색하되 뒤의 키워드가 포함되지
   않은 서적들 표시. (e.g. ‘tdd-javascript’ : tdd가 제목에 포함된 서적을 검색하되
   javascript라는 키워드를 가지고 있는 서적은 제외)

<br/>

3. [상세]: 서적 리스트 중 선택된 서적의 상세 정보를 표시
   - [x] JSON으로 받은 데이터 중 특정 프로퍼티 필수로 화면에 표시

<br/>

#### 📒 Point

- TDD로 작업을 진행했습니다.

<br/>

#### 🧪 Test

- Jest를 사용해 유닛 테스트 코드를 작성해 필요한 로직을 검증했습니다.

<br/>

#### 📒 CI/CD

- unit test pre-commit
  - husky pre-commit을 사용해 작성한 유닛 테스트 코드로 리팩토링 및 추가 작업에 대한 안정성을 확보할 수 있도록 했습니다.
- storybook 자동 빌드/배포
  - 협업 프로세스를 고려해 PR 리뷰 단계에서 직관적으로 UI 리뷰를 진행할 수 있도록 설정했습니다.
- Vercel 자동 배포 적용
  - git flow 브랜치 전략을 사용해 작업을 진행했으며, 코드 푸시 및 main 브랜치 머지 시마다 자동 배포되도록 설정했습니다.
  - storybook과 프로덕트 배포 성공 여부를 PR에서 미리 체크하고, 승인 및 머지할 수 있도록 설정했습니다.

<br/>

#### 📒 Task

- github issue 생성을 통해 task를 관리하고, 관련 PR에 연결해 쉽게 찾아보고 히스토리를 관리할 수 있도록 했습니다.
