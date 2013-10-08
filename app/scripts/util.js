'use strict';
var path = require('path');
var fs = require('fs');


var util = module.exports = {
  rewrite: rewrite,
  rewriteFile: rewriteFile,
  validateFile: validateSplicableFromFile,
};

function rewriteFile (args) {
  var fullPath = readFile(args);
  
  var body = rewrite(args);

  fs.writeFileSync(fullPath, body);
};

function readFile(args){
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.haystack = fs.readFileSync(fullPath, 'utf8');

  return fullPath;
}

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite (args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  }).join('\n'));

  if (re.test(args.haystack)) {
    return args.haystack;
  }

  var lines = args.haystack.split('\n');

  var lineIndex = 0;
  lines.forEach(function (line, i) {
    if (line.indexOf(args.needle) !== -1) {
      lineIndex = i;
    }
  });

  var spaces = 0;
  while (lines[lineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  var spaceStr = '';
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  lines.splice(lineIndex, 0, args.splicable.map(function (line) {
    return spaceStr + line;
  }).join('\n'));

  return lines.join('\n');
}

function validateSplicableFromFile(args){
  readFile(args);
  return validateSplicableFromHystack(args);
};

function validateSplicableFromHystack(args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  }).join('\n'));

  if (re.test(args.haystack)) {
    return args.haystack;
  }
  return false;
}