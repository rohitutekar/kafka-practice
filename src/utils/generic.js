// ANSI escape codes for text color
exports.ansiReset = "\x1b[0m";
exports.ansiRed = "\x1b[31m";
exports.ansiGreen = "\x1b[32m";
exports.ansiYellow = "\x1b[33m";
exports.ansiBlue = "\x1b[34m";
exports.ansiBold = "\x1b[1m";

exports.log = (...messages) => {
  console.log(...messages);
};
