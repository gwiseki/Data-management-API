API 문서document

# 용어 정의

| 한글 정의     | English definition | 설명                                                                                                                                  |
|---------------|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| 게임 데이터   | gamedata                    | 특정 게임에 의존성을 갖는 데이터(특정 게임을 포함하고 있는 데이터) Data dependent on specific game(data containing specific game)     |
| 장치 데이터   | devicedata                  | 특정 장치에 의존성을 갖는 데이터(특정 장치를 포함하고 있는 데이터) Data dependent on specific device(data containing specific device) |
| 테스트 데이터 | testdata                    | 특정 테스트에 의존성을 갖는 데이터(특정 테스트를 포함하고 있는 데이터) Data dependent on specific test(data containing specific test) |

# API

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
|------------------|------------------------------------------------------------------|
| Method           | POST                                                             |
| URL parameters   | gameId = [string] : 생성할 게임 데이터가 의존성을 갖는 게임의 ID |
| Data parameters  | 반드시 필요한 필드 : data                                        |
| Success Response | Status Code : 200 Content : 단일 게임 데이터                     |
| Error Response   | Status Code : 405 Content : { message : "Invalid Input" }        |

2. 게임 데이터 조회read game data

| URL              | /api/v1/games/:gameId/data/:dataId                               |
|------------------|------------------------------------------------------------------|
| Method           | GET                                                              |
| URL parameters   | gameId = [string] : 조회할 게임 데이터가 의존성을 갖는 게임의 ID |
|                  | dataId = [string] : 조회할 게임 데이터의 ID                      |
| Data parameters  | none                                                             |
| Success Response | Status Code : 200 Content : 단일 게임 데이터                     |
| Error Response   | Status Code : 404 Content : { message : "gamedata not found" }   |

3. 게임 데이터 수정update game data

| URL              | /api/v1/games/:gameId/data/:dataId                               |
|------------------|------------------------------------------------------------------|
| Method           | PATCH                                                            |
| URL parameters   | gameId = [string] : 수정할 게임 데이터가 의존성을 갖는 게임의 ID |
|                  | dataId = [string] : 수정할 게임 데이터의 ID                      |
| Data parameters  | 반드시 필요한 필드 : data                                        |
| Success Response | Status Code : 200 Content : 단일 게임 데이터                     |
| Error Response   | Status Code : 404 Content : { message : "gamedata not found" }   |
|                  | Status Code : 405 Content : { message : "Invalid Input" }        |

4. 게임 데이터 삭제delete game data

| URL              | /api/v1/games/:gameId/data/:dataId                               |
|------------------|------------------------------------------------------------------|
| Method           | DEL                                                              |
| URL parameters   | gameId = [string] : 삭제할 게임 데이터가 의존성을 갖는 게임의 ID |
|                  | dataId = [string] : 삭제할 게임 데이터의 ID                      |
| Data parameters  | none                                                             |
| Success Response | Status Code : 200                                                |
| Error Response   | Status Code : 404 Content : { message : "gamedata not found" }   |

5. 복수 게임 데이터 조회read many game data

| URL              | /api/v1/games/:gameId/data                                       |
|------------------|------------------------------------------------------------------|
| Method           | GET                                                              |
| URL parameters   | gameId = [string] : 삭제할 게임 데이터가 의존성을 갖는 게임의 ID |
|                  | dataId = [string] : 삭제할 게임 데이터의 ID                      |
| Data parameters  | none                                                             |
| Query parameters | page = [number] : 조회할 게임 데이터 목록의 페이지 번호          |
|                  | limit = [number] : 한 페이지에 조회할 게임 데이터 갯수           |
| Success Response | Status Code : 200 Content : 여러개의 게임 데이터                 |
| Error Response   | Status Code : 404 Content : { message : "gamedata not found" }   |

6. 장치 데이터 생성create device data

| URL              | /api/v1/devices/:deviceId/data/:dataId                             |
|------------------|--------------------------------------------------------------------|
| Method           | POST                                                               |
| URL parameters   | deviceId = [string] : 생성할 장치 데이터가 의존성을 갖는 장치의 ID |
| Data parameters  | 반드시 필요한 필드 : data                                          |
| Success Response | Status Code : 200 Content : 단일 장치 데이터                       |
| Error Response   | Status Code : 405 Content : { message : "Invalid Input" }          |

7. 장치 데이터 조회read device data

| URL              | /api/v1/devices/:deviceId/data/:dataId                             |
|------------------|--------------------------------------------------------------------|
| Method           | GET                                                                |
| URL parameters   | deviceId = [string] : 조회할 장치 데이터가 의존성을 갖는 장치의 ID |
|                  | dataId = [string] : 조회할 장치 데이터의 ID                        |
| Data parameters  | none                                                               |
| Success Response | Status Code : 200 Content : 단일 장치 데이터                       |
| Error Response   | Status Code : 404 Content : { message : "devicedata not found" }   |

8. 장치 데이터 수정update device data

| URL              | /api/v1/devices/:deviceId/data/:dataId                             |
|------------------|--------------------------------------------------------------------|
| Method           | PATCH                                                              |
| URL parameters   | deviceId = [string] : 수정할 장치 데이터가 의존성을 갖는 장치의 ID |
|                  | dataId = [string] : 수정할 장치 데이터의 ID                        |
| Data parameters  | 반드시 필요한 필드 : data                                          |
| Success Response | Status Code : 200 Content : 단일 장치 데이터                       |
| Error Response   | Status Code : 404 Content : { message : "devicedata not found" }   |
|                  | Status Code : 405 Content : { message : "Invalid Input" }        |

9. 장치 데이터 삭제delete device data

| URL              | /api/v1/devices/:deviceId/data/:dataId                             |
|------------------|--------------------------------------------------------------------|
| Method           | DEL                                                                |
| URL parameters   | deviceId = [string] : 삭제할 장치 데이터가 의존성을 갖는 장치의 ID |
|                  | dataId = [string] : 삭제할 장치 데이터의 ID                        |
| Data parameters  | 반드시 필요한 필드 : data                                          |
| Success Response | Status Code : 200                                                  |
| Error Response   | Status Code : 404 Content : { message : "devicedata not found" }     |

10. 복수 장치 데이터 조회read many device data

| URL              | /api/v1/devices/:deviceId/data                                     |
|------------------|--------------------------------------------------------------------|
| Method           | GET                                                                |
| URL parameters   | deviceId = [string] : 삭제할 장치 데이터가 의존성을 갖는 장치의 ID |
|                  | dataId = [string] : 삭제할 장치 데이터의 ID                        |
| Data parameters  | none                                                               |
| Query parameters | page = [number] : 조회할 장치 데이터 목록의 페이지 번호            |
|                  | limit = [number] : 한 페이지에 조회할 장치 데이터 갯수             |
| Success Response | Status Code : 200 Content : 여러개의 장치 데이터                   |
| Error Response   | Status Code : 404 Content : { message : "devicedata not found" }   |

11. 테스트 데이터 생성create test data

| URL              | /api/v1/tests/:testId/data/:dataId                                   |
|------------------|----------------------------------------------------------------------|
| Method           | POST                                                                 |
| URL parameters   | testId = [string] : 생성할 테스트 데이터가 의존성을 갖는 테스트의 ID |
| Data parameters  | 반드시 필요한 필드 : data                                            |
| Success Response | Status Code : 200 Content : 단일 장치 데이터                         |
| Error Response   | Status Code : 405 Content : { message : "Invalid Input" }            |

12. 테스트 데이터 조회read test data

| URL              | /api/v1/tests/:testId/data/:dataId                                   |
|------------------|----------------------------------------------------------------------|
| Method           | GET                                                                  |
| URL parameters   | testId = [string] : 조회할 테스트 데이터가 의존성을 갖는 테스트의 ID |
|                  | dataId = [string] : 조회할 테스트 데이터의 ID                        |
| Data parameters  | none                                                                 |
| Success Response | Status Code : 200 Content : 단일 테스트 데이터                       |
| Error Response   | Status Code : 404 Content : { message : "testdata not found" }       |

13. 테스트 데이터 수정update test data

| URL              | /api/v1/tests/:testId/data/:dataId                                   |
|------------------|----------------------------------------------------------------------|
| Method           | GET                                                                  |
| URL parameters   | testId = [string] : 조회할 테스트 데이터가 의존성을 갖는 테스트의 ID |
|                  | dataId = [string] : 조회할 테스트 데이터의 ID                        |
| Data parameters  | 반드시 필요한 필드 : data                                            |
| Success Response | Status Code : 200 Content : 단일 테스트 데이터                       |
| Error Response   | Status Code : 405 Content : { message : "testdata not found" }       |
|                  | Status Code : 405 Content : { message : "Invalid Input" }        |

14. 테스트 데이터 삭제delete test data

| URL              | /api/v1/tests/:testId/data/:dataId                                   |
|------------------|----------------------------------------------------------------------|
| Method           | DEL                                                                  |
| URL parameters   | testId = [string] : 삭제할 테스트 데이터가 의존성을 갖는 테스트의 ID |
|                  | dataId = [string] : 삭제할 테스트 데이터의 ID                        |
| Data parameters  | 반드시 필요한 필드 : data                                            |
| Success Response | Status Code : 200                                                    |
| Error Response   | Status Code : 404 Content : { message : "testdata not found" }       |

15. 복수 테스트 데이터 조회read many test data

| URL              | /api/v1/tests/:testId/data                                           |
|------------------|----------------------------------------------------------------------|
| Method           | GET                                                                  |
| URL parameters   | testId = [string] : 삭제할 테스트 데이터가 의존성을 갖는 테스트의 ID |
|                  | dataId = [string] : 삭제할 테스트 데이터의 ID                        |
| Data parameters  | none                                                                 |
| Query parameters | page = [number] : 조회할 테스트 데이터 목록의 페이지 번호            |
|                  | limit = [number] : 한 페이지에 조회할 테스트 데이터 갯수             |
| Success Response | Status Code : 200 Content : 여러개의 테스트 데이터                   |
| Error Response   | Status Code : 404 Content : { message : "testdata not found" }       |