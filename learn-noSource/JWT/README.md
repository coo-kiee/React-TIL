# JWT
#### https://han-um.tistory.com/17

JWT는 AccessToken과 RefreshToken을 구분해서 사용한다.

구분하는 이유는 RefreshToken의 사용 횟수를 줄이고, 사용용도에 맞게 구분하기 위해서이다.

주요 프로세스:   
서버에 로그인 요청(로그인 정보 + AccessToken) > 서버에서 AccessToken 만료기간 확인 > 만료 했으면 RefreshToken 정보를 서버에 재전송 > DB에서 RefreshToken 확인 후 AccessToken 재발급

고려해야할 사항: 만료시간이 지났는지를 기준으로 삼지 않고, 적게 남았을 경우 + 지난 경우로 조건을 주어야 api 서버가 검증하는 시간과 갭차이를 줄일 수 있다.(ex. 만료시간이 1:11인 Token의 경우 브라우저에서 서버로 데이터 전송 시간이 1:10 > 서버에서 데이터 수령 시간이 1:11이면 브라우저에서는 기간이 남았다고 판단해서 RefreshToken을 보내지 않았지만 서버에서는 기간 만료된 것으로 판단해서 요청이 거절된다.)