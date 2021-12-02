# social-app
 [pic](./readme/1.png)


## Catalog
- [Development & Skills](#Development-&-Skills)
  - [- 前端 / front](#--前端-/-front)
  - [- 後端/back](#--後端/back)
  - [資料庫 / database](#資料庫-/-database)

- [Structure & Component](#Structure-&-Component)
- [Features](#features)
  - [#1 Sign-up, Register](#sign-up,-Register)
  - [#2 Post: create, edit, delete](#Post:-create,-edit,-delete)
  - [#3 follow, unfollow](#follow,-unfollow)



## Development & Skills
### - 前端 / front
* 「Fakebook」的前端開發主要使用**React** ，搭配使用`React-Router`完成四個主要頁面：登入、註冊、首頁、個人頁面。
* 其中，主要使用hooks操作資料、state狀態管理資料 / 管理頁頁。亦使用axios套件呼叫後端資料庫。
### - 後端/back
* 後端透過`node.js`搭配`express`引擎。
* 使用node的環境架設server、restful api。
### - 資料庫 / database
* 本專案使用mongoDB

## Structure & Component
* Page and its component
|-|-|-|-|-|
| con/page | login | register | home | profile |
|  header  | ----- | -------- |   ✔️  |   ✔️     |
|  sideBar |------ | -------- |   ✔️  |   ✔️     |
|  Feed    | ------| ---------|   ✔️  |   ✔️     |
|  rightBar|------- |---------|   ✔️  |   ✔️     |


## Features
### 1️⃣  Sign-up, Register
登入會員，進入頁面；註冊會員，進入頁面。登入的帳密將暫存於`Local Starge`，登出後刪除。
此部分將連接MongoDB驗證，隨後，更新`useContext`裡的user資料。

[測試帳號密碼](#test-account)
| - | - |
| -------- | -------- |
| Account | andrew@gmail.com |
| Password | andrewsaccount |

### 2️⃣  Post: create, edit, delete
每一則post都能編輯、刪除且能在下方留言、點讚。
這部分使用`useEffect`完成資料更新同步頁面更新。

### 3️⃣  follow, unfollow
使用者可follow新的朋友。
