// Prints config.js as JSON (used by make_placeholders.py). Run: node tools/dump-config.js
global.window = {};
require('../config.js');
process.stdout.write(JSON.stringify(window.CHAPTER));
