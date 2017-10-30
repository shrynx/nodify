'use strict';

const ansiEscape = require('ansi-escapes');
const stderr = require('./stderr.js');

const SHOW_ALTERNATE_SCREEN = '\u001B[?1049h';
const HIDE_ALTERNATE_SCREEN = '\u001B[?1049l';

function alternateScreen(enabled) {
  if (!enabled) {
    let needAnnounce = true;
    return {
      open() {},
      close() {},
      reset(heading) {
        if (needAnnounce) {
          stderr(heading);
          needAnnounce = false;
        }
      },
    };
  }

  return {
    open() {
      process.stderr.write(SHOW_ALTERNATE_SCREEN);
    },
    close() {
      process.stderr.write(HIDE_ALTERNATE_SCREEN);
    },
    reset(heading) {
      stderr(`${ansiEscape.eraseScreen}${ansiEscape.cursorTo(0, 0)}${heading}`);
    },
  };
}

module.exports = alternateScreen;
