/* PlusFriendBot
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
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const bodyParser = require('body-parser');
const express = require('express');

const PlusFriendKeyboard = require('./PlusFriendKeyboard');

class PlusFriendBot {
  constructor(url, port = 3000) {
    this.addCallbacks = [];
    this.banCallbacks = [];
    this.leaveCallbacks = [];
    this.messageCallbacks = [];
    this.server = express();
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
    this.url = url;
    this.server.post(['', this.url, 'friend', ''].map(value => value.replace(/^\/|\/$/, '')).join('/'), (req, res) => {
      this.addCallbacks.forEach(value => value(req.body.user_key));
      res.end();
    });
    this.server.delete(['', this.url, 'friend/:user_key', ''].map(value => value.replace(/^\/|\/$/, '')).join('/'), (req, res) => {
      this.banCallbacks.forEach(value => value(req.params.user_key));
      res.end();
    });
    this.server.delete(['', this.url, 'chat_room/:user_key', ''].map(value => value.replace(/^\/|\/$/, '')).join('/'), (req, res) => {
      this.leaveCallbacks.forEach(value => value(req.params.user_key));
      res.end();
    });
    this.server.post(['', this.url, 'message', ''].map(value => value.replace(/^\/|\/$/, '')).join('/'), (req, res) => {
      const { body } = req;
      this.messageCallbacks.forEach((value) => {
        value(body.user_key, body.type, body.content, (response) => {
          res.json(response.toObject());
        });
      });
      res.end();
    });
    this.server.listen(port, () => {
      console.log(`Plus Friend Bot listening on port ${port}!`);
    });
  }

  onAdded(callback) {
    this.addCallbacks.push(callback);
  }

  onBanned(callback) {
    this.banCallbacks.push(callback);
  }

  onLeave(callback) {
    this.leaveCallbacks.push(callback);
  }

  onStart(plusFriendKeyboard) {
    if (plusFriendKeyboard instanceof PlusFriendKeyboard) {
      this.server.get(['', this.url, 'keyboard', ''].map(value => value.replace(/^\/|\/$/, '')).join('/'), (req, res) => {
        res.json(plusFriendKeyboard.toObject());
        res.end();
      });
    } else {
      throw new TypeError();
    }
  }

  onText(callback) {
    this.messageCallbacks.push(callback);
  }
}

module.exports = PlusFriendBot;
