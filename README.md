# PlusFriendBot

> Kakao Plus Friend Auto Reply Bot Framework for Node.js

[![npm](https://img.shields.io/npm/v/plus-friend-bot.svg?style=flat-square)](https://www.npmjs.com/package/plus-friend-bot) [![npm](https://img.shields.io/npm/dt/plus-friend-bot.svg?style=flat-square)](https://www.npmjs.com/package/plus-friend-bot)

## ChangeLog

See [CHANGELOG](./CHANGELOG.md)

## Installation

- Install with npm:

```bash
npm install plus-friend-bot --save
```

- Clone the repo:

```bash
git clone https://github.com/Astro36/PlusFriendBot.git
```

## Usage

```javascript
const {
  PlusFriendBot, PlusFriendKeyboard, PlusFriendMessage, PlusFriendResponse,
} = require('plus-friend-bot');

const plusFriendBot = new PlusFriendBot('korean_school_meal_bot', 1234);

plusFriendBot.onStart(new PlusFriendKeyboard('buttons', ['급식 정보', '학교 설정']));
plusFriendBot.onText((userKey, type, content, send) => {
  if (content === '도움말') {
    send(new PlusFriendResponse(new PlusFriendMessage('물어보고 싶은 것 있어?'), new PlusFriendKeyboard('buttons', ['급식 정보', '학교 변경'])));
  }
});
```

## License

```text
PlusFriendBot
Copyright (C) 2017  Astro

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

PlusFriendBot is licensed under the [LGPL 3.0](./LICENSE).
