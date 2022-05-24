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

> Login

- Method: `post`
- Path:`/api/login`
- Resquest Body:

```json
{
  "email": "string",
  "password": "string"
}
```

- Response: home page

> Register

- Method: `post`
- Path:`/api/register`
- Resquest Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

- Response: login page

---

### API-Key

> Add-apikey

- Method: `get`
- Path:`/api/add-apikey`
- Resquest Body:

```json
{
  "user_id": "string",
  "password": "string",
  "api-key": "string",
  "api-secert": "string"
}
```

- Response: OK

  ***

> DEL-apikey

- Method: `get`
- Path:`/api/del-apikey`
- Resquest Body:

```json
{
  "user_id": "string",
  "password": "string",
  "api-id": "string"
}
```

- Response: OK

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

- user_id : `string` `PK`
- user
- email
- password
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
