# Git

## Bash
먼저 실행 해볼 것!!
**git remote update**

[커밋하기전에 config 설정하기!!!](https://coding-groot.tistory.com/97)  
[SSH 커밋](https://coding-factory.tistory.com/244)   
[ignore 목록에 있는 파일 커밋(ex.env)](https://zoosso.tistory.com/835)   
[Bash 커밋 히스토리 조회](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EC%BB%A4%EB%B0%8B-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0)   
[remote url 주소 바꾸기](https://onedaythreecoding.tistory.com/entry/Git-%EB%A6%AC%EB%AA%A8%ED%8A%B8-%EC%A0%80%EC%9E%A5%EC%86%8C-remote-url-%EC%A3%BC%EC%86%8C-%ED%99%95%EC%9D%B8-%EB%B3%80%EA%B2%BD-%EB%AA%85%EB%A0%B9%EC%96%B4)   
[branch 가져오기](https://cjh5414.github.io/get-git-remote-branch/)   
[does not have a commit checked out 에러 해결방법](https://mmol.tistory.com/entry/%EA%B9%83%ED%97%88%EB%B8%8C-does-not-have-a-commit-checked-out-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95)

## Info 및 READ ME 꾸미기
#### https://velog.io/@seondal/Github-Readme-%EA%BE%B8%EB%AF%B8%EA%B8%B0-%EC%B4%9D%EC%A0%95%EB%A6%AC)

## git merge 되돌리기
#### https://hacktiming.tistory.com/56
소스트리에서 커밋 되돌리기를 하면 개인 브런치에서는 바로 되돌아가지만 master의 경우 브런치가 여러개라서 실패할 때가 있다.
그런 경우 소스트리 터미널 기능을 이용해서 git bash로 커밋하면 되는데

Step 1. 커밋 고유번호 파악
커밋을 하면 커밋의 고유번호가 생긴다.
그 고유번호를 파악해서 revert 명령어를 수행하면 된다.

Step 2. revert
git revert [커밋번호] -m 1   명령어를 입력하면 commit 메세지로 이동하고 ESC랑 :wq! 를 입력하면 revert가 완료된다.
(-m 1으로 하면 master 브런치에서 merge 직전 소스로, -m 2는 개인 브런치 merge 직전 소스로 돌아간다.)

## git rebase vs merge
#### https://hajoung56.tistory.com/5

회사에서 소스 관리를 위해 svn 대신 git을 사용하기로 했다.

git에서 커밋을 관리하는 방법이 2가지 있는데 rebase와 merge 방법이다.

이전까지는 merge 방식으로 개인/팀 프로젝트 관리를 했었는데 이번엔 rebase 방식을 채택했다.

merge 방식 - Feature 브런치의 커밋과 Main 브런치의 

rebase 방식 - Feature 브랜치의 커밋이 Main 브랜치가 가지고 있던 기존의 커밋 뒤에 위치하게 된다.

// 보완점
단점: 이미 push까지 한 커밋이라면, 변경한 커밋들은 원격 저장소에 push 되지 않을 것이다

커밋 히스토리를 공유하면 히스토리의 불일치가 발생할 수 있다는데 무슨 말인지 이해를 못하겠다...

이 문제는 업무를 하면서 파악해서 내용을 수정하도록 해야겠다.

```
*** git Flow 정리 ***

#### 변경내역 stash에 임시 저장
develop_[name] : git stash
develop_[name] : git stash list // stash 확인
develop_[name] : git checkout develop

#### remote 서버 develop 소스 가져오기.
develop : git pull origin develop 
develop : git checkout develop_[name]

#### stash 적용 후 본인 브랜치 최신 버전으로 rebase.
develop_[name] : git stash apply // stash 적용
develop_[name] : git rebase develop  
-- 본인이 변경한 부분이 없을 경우.(최신상태로 업데이트 됨.) 
-- 본인이 변경한 부분이 있는 경우.(error 메세지.)
develop_[name] : git add {수정파일}
develop_[name] : git commit -m '{메세지}'

-- 커밋 후 rebase 다시 실행.
develop_[name] : git rebase develop   

#### 충돌 발생 시 충돌 된 파일 수정 작업 후
develop_[name] : git add {수정파일}
develop_[name] : git commit -m '{메세지}'
develop_[name] : git rebase --continue   

#### 문제없을 시 내 브랜치 merge
develop : git merge develop_[name]

#### 최종 origin branch에 push [develop]
develop : git pull origin develop  
develop : git push origin develop
develop : git checkout develop_[name]

#### 임시저장한 stash 삭제
develop_[name] : git stash drop
```