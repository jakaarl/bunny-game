"use strict";
window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');
const maps    = require('./map');

const TILE_SIZE = 32;
const TILE_COUNT = 10;
const WINDOW_SIZE = TILE_SIZE * TILE_COUNT;
const MOVEMENT_COOLDOWN_TIME_MS = 500;
const BUNNY_SPRITE_REF = "bunny";
const TILES_REF = "tiles";

const STATUS_PLAYING = 0;
const STATUS_NEXT_LEVEL = 1;

window.onload = function () {
  const game = new Phaser.Game(WINDOW_SIZE, WINDOW_SIZE, Phaser.CANVAS, "game", {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  const state = {
    playerTilePos: {
      x: 1,
      y: 1
    },
    currentLevel: 0,
    status: STATUS_PLAYING
  }

  function preload() {
    game.load.image(TILES_REF, "images/tiles.png")
    game.load.image(BUNNY_SPRITE_REF, "images/bunny_s.png");
  }

  function create() {
    // state.player = game.add.sprite(32, 32, BUNNY_SPRITE_REF);
    loadNextLevel();
  }

  function loadNextLevel() {
    const settings = {
      tileSize: TILE_SIZE,
      tileCount: TILE_COUNT
    };

    state.currentLevel++;
    state.status = STATUS_PLAYING;
    state.playerTilePos.x = 1;
    state.playerTilePos.y = 1;

    const createRes = maps.loadLevel(game, settings, TILES_REF, state.currentLevel);
    state.layer = createRes.layer
    state.mapData = createRes.mapData

    $('.level-name').text('TASO ' + state.currentLevel)
    $('#code').val('')
    $('.program-result-message').text('')
    $('.button.execute').text('Suorita')

    state.player = game.add.sprite(32, 32, BUNNY_SPRITE_REF);
    state.player.x = TILE_SIZE * 1;
    state.player.y = TILE_SIZE * 1;
  }

  function checkCollision(tileX, tileY) {
    return state.mapData[tileY][tileX];
  }

  function movePlayer(x, y) {
    const newX = state.playerTilePos.x + x;
    const newY = state.playerTilePos.y + y;
    const collisionType = checkCollision(newX, newY);

    if (collisionType === 0 || collisionType === 2) {
      state.player.x = TILE_SIZE * newX;
      state.player.y = TILE_SIZE * newY;
      state.playerTilePos.x = newX;
      state.playerTilePos.y = newY;
    }

    if (collisionType === 2) {
      state.status = STATUS_NEXT_LEVEL;
      $('.program-result-message').text('Voitto!')
      $('.button.execute').text('Seuraava taso')
    }
  }

  function update() {
  }

  function render() {
  }

  // PUBLIC API

  window.vasen = function() {
    movePlayer(-1, 0);
  }

  window.oikea = function() {
    movePlayer(1, 0);
  }

  window.ylos = function() {
    movePlayer(0, -1);
  }

  window.alas = function() {
    movePlayer(0, 1);
  }

  window.execute = function() {
    if (state.status === STATUS_NEXT_LEVEL) {
      loadNextLevel();
      return;
    }

    const text = document.getElementById("code").value;

    if (text.length === 0) {
      return;
    }

    const commands = text.split('\n');
    console.log('commands', commands);

    let currentCommandIndex = 0;

    function executeNextCommand() {
      const command = commands[currentCommandIndex];
      console.log('executing command', command);
      eval(command);

      currentCommandIndex++;

      if (currentCommandIndex < commands.length) {
        setTimeout(executeNextCommand, MOVEMENT_COOLDOWN_TIME_MS);
      }
    }

    executeNextCommand();
  }
}