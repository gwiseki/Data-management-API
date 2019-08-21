API 문서document

| URL                                    | Method | Description                                |
|----------------------------------------|--------|--------------------------------------------|
| /api/v1/games/:gameId/data             | POST   | 게임 데이터 생성create game data           |
| /api/v1/games/:gameId/data/:dataId     | GET    | 게임 데이터 조회read game data             |
| /api/v1/games/:gameId/data/:dataId     | PATCH  | 게임 데이터 수정update game data           |
| /api/v1/games/:gameId/data/:dataId     | DEL    | 게임 데이터 삭제delete game data           |
| /api/v1/games/:gameId/data             | GET    | 복수 게임 데이터 조회read many game data   |
| /api/v1/devices/:deviceId/data         | POST   | 장치 데이터 생성create device data         |
| /api/v1/devices/:deviceId/data/:dataId | GET    | 장치 데이터 조회read device data           |
| /api/v1/devices/:deviceId/data/:dataId | PATCH  | 장치 데이터 수정update device data         |
| /api/v1/devices/:deviceId/data/:dataId | DEL    | 장치 데이터 삭제delete device data         |
| /api/v1/devices/:deviceId/data         | GET    | 복수 장치 데이터 조회read many device data |
| /api/v1/tests/:testId/data             | POST   | 테스트 데이터 생성create test data         |
| /api/v1/tests/:testId/data/:dataId     | GET    | 테스트 데이터 조회read test data           |
| /api/v1/tests/:testId/data/:dataId     | PATCH  | 테스트 데이터 수정update test data         |
| /api/v1/tests/:testId/data/:dataId     | DEL    | 테스트 데이터 삭제delete test data         |
| /api/v1/tests/:testId/data             | GET    | 복수 테스트 데이터 조회read many test data |

1. 게임 데이터 생성create game data
| URL              | /api/v1/games/:gameId/data                                       |
| Method           | POST                                                             |
| URL parameters   | gameID = [string] : 생성할 게임 데이터가 의존성을 갖는 게임의 ID |
| Data parameters  | 반드시 필요한 필드 : data                                        |
| Success Response | Status Code : 200 Content : 단일 게임 데이터                     |
| Error Response   | Status Code : 405 Content : { message : "Invalid Input" }        |

2. 게임 데이터 조회read game data

3. 게임 데이터 수정update game data

4. 게임 데이터 삭제delete game data

5. 복수 게임 데이터 조회read many game data

6. 장치 데이터 생성create device data

7. 장치 데이터 조회read device data

8. 장치 데이터 수정update device data

9. 장치 데이터 삭제delete device data

10. 복수 장치 데이터 조회read many device data

11. 테스트 데이터 생성create test data

12. 테스트 데이터 조회read test data

13. 테스트 데이터 수정update test data

14. 테스트 데이터 삭제delete test data

15. 복수 테스트 데이터 조회read many test data