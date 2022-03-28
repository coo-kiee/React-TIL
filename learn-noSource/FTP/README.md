# React FTP

## 배포 방법
#### https://mesonia.tistory.com/44
npm run build 실행 > 배포 위치에 build 폴더 내부 파일 복사 > index.html의 절대경로로 상대경로로 변경(="/ => ="./)
**※ 업무시에 절대경로로 사용했다 > 이유?**

index.html의 절대경로를 안바꾸고 사용하는 방법 - package.json: "homepage":"./" 설정
#### https://stackoverflow.com/questions/46510538/how-upload-reactjs-project-to-ftp

**※ 배포용 env에 추가 - PUBLIC_URL=/도메인**