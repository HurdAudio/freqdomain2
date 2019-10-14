'use strict';

var activePatching = false;
var connect = { input: null, output: null };
var lines = [];
var cursorX = 0;
var cursorY = 0;
var activeLine = null;
var connectorOffset = 10;
var patchCables = [];
