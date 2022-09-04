# Project

## FRONT-END

> Login

- Method: `get`
- Path:`/login`
- Response: Login page

> Register

- Method: `get`
- Path:`/register`
- Response: Register page

> Home

- Method: `get`
- Path:`/home`
- Response: Home page

> เก็บ api

- Method: `get`
- Path:`/setting`
- Response: Setting page

## BACK-END

### ("/ ")

> Login ✅

- Method: `post`
- Path:`/login`
- Resquest Body:

```json
{
  "email": "string",
  "password": "string"
}
```

- Response: OK

  ***

> Register ✅

- Method: `post`
- Path:`/register`
- Resquest Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

- Response: OK

  ***

> authen ✅

- Method: `post`
- Path:`/authen`
- Resquest Header:

```json
{
  "Authorization": "Bearer " + token
}
```

- Response:

```json
{
  "status": "ok ",
  "decode": {
    "User_id": "ac5c3b26-db74-4c60-8c7a-57476f2a7d87",
    "iat": 1662305441,
    "exp": 1662309041
  }
}
```

---

> symbols ✅

- Method: `get`
- Path:`/symbols`
- Response :

```json
{
  "status": "ok",
  "symbols": ["BTC", "ETH", "BNB", ...]
}
```

- Response: OK

  ***

> strategies ✅

- Method: `get`
- Path:`/strategies`
- Response :

```json
{
  "status": "ok",
  "strategies": {
    "strategies_id": "strategies_name"
  }
}
```

- Response: OK

  ***

---

<h5 style="text-align: center;">need authentication token in header</h5>

---

### API ("/api ")

> Addbot

- Method: `post`
- Path:`/api/add_apibitkub`
- Resquest Body:

```json
{
  "user_id": "string",
  "api-key": "string",
  "api-secert": "string"
}
```

- Response: OK

  ***

> Add-apikey ✅

- Method: `post`
- Path:`/api/add_apibitkub`
- Resquest Body:

```json
{
  "user_id": "string",
  "api-key": "string",
  "api-secert": "string"
}
```

- Response: OK

  ***

> DEL-apikey

- Method: `get`
- Path:`/api/del_apikey`
- Resquest Body:

```json
{
  "user_id": "string",
  "password": "string",
  "api-id": "string"
}
```

- Response: OK

  ***

### CHECK ("/api/check ")

> check link apibitkub ✅

- Method: `post`
- Path:`/api/check/link_apibitkub`
- Response Body:

```json
{
  "status": "ok",
  "linkAPI": Boolean
}
```

- Response: OK

  ***

> check have bot ✅

- Method: `post`
- Path:`/api/check/havebot`
- Response Body:

```json
{
  "Type": type // 0 = trade ,1 = noti
}
```

- Response: OK

```json
{
  "status": "ok",
  "bot": {
    "Bot_id": "35e50c43-1ef8-4041-aa7e-4a324a466504",
    "User_id": "ac5c3b26-db74-4c60-8c7a-57476f2a7d87",
    "Type": 1
  }
}
```

---

> check bot by bot_id ✅

- Method: `post`
- Path:`/api/check/bot_by_botid`
- Response Body:

```json
{
  "Bot_id": "35e50c43-1ef8-4041-aa7e-4a324a466504" // 0 = trade ,1 = noti
}
```

- Response: OK

```json
{
  "status": "ok",
  "bot": {
    "Bot_id": "35e50c43-1ef8-4041-aa7e-4a324a466504",
    "User_id": "ac5c3b26-db74-4c60-8c7a-57476f2a7d87",
    "Type": 1
  }
}
```

---

---

## <h3 style="text-align: center;">ยังไม่ได้ทำ</h3>

---

### Userselectsym

> Add-userselectsym

- Method: `get`
- Path:`/api/add-userselectsym`
- Resquest Body:

```json
{
  "user_id": "string",
  "userselectsym": {
    "sym": "boolean"
  }
}
```

---

## DATABASE

> USERS :

- user_id : `string` `PK` `AUTO`
- username : `string`
- email : `string`
- password : `string`
  ***

> API :

- api_id: `string` `PK`
- api_key: `string`
- api_secret: `string`
- user_id : `string` `FK-USER`
  ***

> Symbols :

- sym: `string` `PK`
- sym_THB : `string`
  ***

> Strategys

- Strategy_id : `string` `PK`
- Strategy_name : `string`
  ***

> History :

- History_id : `string` `PK`
- user_id : `string` `FK-USER`
- sym: `string` `FK-Symbols`
- timestamp : `DATETIME`
  ***

> USERSELECTSYM :

- USERSELECTSYM_id : `string` `PK`
- user_id : `string` `FK-USER`
- sym: `string` `FK-Symbols`
- Strategy_id : `string` `FK-Symbols`
  ***

---
