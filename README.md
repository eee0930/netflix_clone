<img src="https://capsule-render.vercel.app/api?type=waving&color=e51013&height=200&section=header&text=Netflix+Clone&fontSize=80" />

## Deployment
github pages: [https://eee0930.github.io/netflix_clone](https://eee0930.github.io/netflix_clone).

<br><br>

## Project Info
#### Goal
<ol>
  <li>netflix 웹사이트와 비슷하게 연출하여 최신 영화와 tv 프로그램 정보들을 보여줌</li>
  <li>react의 다양한 hook들을 사용하며 state의 효율적인 사용에 대한 고찰 및 연습하기</li>
  <li>react router, styled components, query, hook form, 등 다양한 리액트 라이브러리 공부</li>
  <li>api에서 제공하는 데이터를 이용하여 user interface를 고려한 화면에 다양한 정보들을 연출하기</li>
</ol>

#### Period
2023-01-09 ~ 2023-01-20


<br><br>

## Stacks 📚
#### Libraries & Languages
<div>
<img src="https://img.shields.io/badge/TypeScript-444444?style=for-the-badge&logo=typescript&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/React-333333?style=for-the-badge&logo=React&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-018EF5?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"/>
<img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white"/>
</div>

#### Config
<div>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
</div>

#### Environment
<div>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</div>

#### Communication
<div>
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/>
</div>


<br><br>


## Screens and Introduction 🎬
#### 1. list contents
<div>
<img width="80%" src="https://github.com/eee0930/netflix_clone/assets/37135523/914f9562-b038-4b06-a5ad-4596fc825a2e.gif"/>


##### skills & issues
<ol>
  <li>movies, tv show, weekly trends 화면에서 재사용할 수 있도록 slider를 compoenent로 나눔</li>
  <li>component가 destroy되거나 render 될 떄 효과를 줄 수 있는 AnimationPresence를 이용하여 slider가 넘어가는 효과를 줌. 
  slider의 key를 index라는 number type으로 주고 slider를 넘기는 버튼을 클릭하면 index가 변화되도록 함. 
  index가 바뀌면 reactjs는 새로운 slider가 생성되었다고 생각하여 slider 애니메이션 효과를 줄 수 있음.</li>
  <li>slider 버튼을 빠르게 두번 클릭하면 slider가 destroy 되기 전에 새로운 slider가 render 되어 버려서 component contents가 꼬여버리는 버그가 생김.
  slider가 움직이고 있다는 의미를 가진 leaving이라는 state를 정의하고, AnimatePresence의 onExitComplete prop을 사용하여 leaving이 true인 동안은 버튼이 동작하지 않게 구현
  </li>
  <li>화면을 리렌더링했을 때 components가 render 되어서 버튼을 클릭하지 않았는데도 slider 애니메이션 효과가 나타나는 버그가 생김.
  AnimatePresence에 initial prop을 이용하여 initail 값을 false로 설정하여 해결함.
  </li>
</ol>
</div>

#### 3. view details
<div>
<img width="80%" src="https://github.com/eee0930/netflix_clone/assets/37135523/0b5e0e36-6a0a-4cd9-9981-4f830ed6ce92.gif"/>
<p></p>
</div>

#### 4. trailer video
<div>
<img width="80%" src="https://github.com/eee0930/netflix_clone/assets/37135523/28e99ab8-0ed1-4573-8844-3441f565f9b4.gif"/>
<p></p>
</div>

#### 5. search results
<div>
<img width="80%" src="https://github.com/eee0930/netflix_clone/assets/37135523/060ddc04-c14a-4b83-9d04-80fb0d986330.gif"/>
<p></p>
</div>


<br><br>

## How to run 🏃‍♀️
### Requirements
For building and running the application you need:
- [Npm 9.2.0](https://www.npmjs.com/package/npm/v/9.2.0)

### Installation
``` bash
$ git clone https://github.com/eee0930/netflix_clone.git
$ cd netflix_clone
$ code .
```

### How to start
- Change the `REACT_APP_MOVIE_API_KEY` on the `.env.example` file.
- Click on `View` -> `Terminal`.
- Run 
```bash
$ npm install
$ npm start
```

## How to deploy?
```
$ npm run deploy
```

<br><br>

## Architecture

#### Directory structure
```bash
 ┣ components
 ┃ ┣ incl : components에 공통적으로 들어가는 components
 ┃ ┃ ┣ Banner.tsx
 ┃ ┃ ┣ ListCredits.tsx
 ┃ ┃ ┣ ListSimilarContents.tsx
 ┃ ┃ ┗ Video.tsx
 ┃ ┣ styled : 각 components에 들어갈 style들
 ┃ ┃ ┣ BannerStyle.tsx
 ┃ ┃ ┣ DetailStyle.tsx
 ┃ ┃ ┣ HeaderStyle.tsx
 ┃ ┃ ┣ ListSearchStyle.tsx
 ┃ ┃ ┣ ModalStyle.tsx
 ┃ ┃ ┗ SliderStyle.tsx
 ┃ ┣ Header.tsx
 ┃ ┣ ListSearchContent.tsx
 ┃ ┣ ListSearchPeople.tsx
 ┃ ┣ Modal.tsx
 ┃ ┣ ModalForSearch.tsx
 ┃ ┣ ModalForTrending.tsx
 ┃ ┣ SliderForContents.tsx
 ┃ ┣ SliderForTrending.tsx
 ┃ ┗ SliderForTrendingPeople.tsx
 ┣ routes
 ┃ ┣ DetailMovie.tsx
 ┃ ┣ DetailPerson.tsx
 ┃ ┣ DetailTv.tsx
 ┃ ┣ Home.tsx
 ┃ ┣ Search.tsx
 ┃ ┣ Trending.tsx
 ┃ ┗ Tv.tsx
 ┣ App.tsx
 ┣ Router.tsx
 ┣ Svg.tsx
 ┣ api.ts
 ┣ atoms.tsx : components에 전역적으로 사용될 변수들 (recoil)
 ┣ index.tsx
 ┣ styled.d.ts
 ┣ theme.ts
 ┗ util.ts : 이미지 로딩 주소