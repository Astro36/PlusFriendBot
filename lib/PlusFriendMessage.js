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

const PlusFriendMessageButton = require('./PlusFriendMessageButton');
const PlusFriendObject = require('./PlusFriendObject');
const PlusFriendPhoto = require('./PlusFriendPhoto');

class PlusFriendMessage extends PlusFriendObject {
  constructor(text = null, photo = null, messageButton = null) {
    super();
    if (typeof text === 'string') {
      this.text = text;
    }
    if (photo instanceof PlusFriendPhoto) {
      this.photo = photo;
    }
    if (messageButton instanceof PlusFriendMessageButton) {
      this.messageButton = messageButton;
    }
  }

  toObject() {
    const { text, photo, messageButton } = this;
    const message = {};
    if (text) {
      message.text = text;
    }
    if (photo) {
      message.photo = photo.toObject();
    }
    if (messageButton) {
      message.messageButton = messageButton.toObject();
    }
    if (!message) {
      throw new TypeError();
    }
    return { message };
  }
}

module.exports = PlusFriendMessage;
