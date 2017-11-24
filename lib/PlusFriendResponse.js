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

const PlusFriendKeyboard = require('./PlusFriendKeyboard');

class PlusFriendResponse {
  constructor(message, keyboard = null) {
    this.message = message;
    this.keyboard = keyboard;
  }

  toObject() {
    const { keyboard } = this;
    const response = { message: this.message.toObject() };
    if (keyboard instanceof PlusFriendKeyboard) {
      response.keyboard = keyboard.toObject();
    }
    return response;
  }
}

module.exports = PlusFriendResponse;
