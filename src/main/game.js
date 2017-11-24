"use strict";
window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');
const maps    = require('./map');

const TILE_SIZE = 32;
const TILE_COUNT = 10;
const WINDOW_SIZE = TILE_SIZE * TILE_COUNT;
const MOVEMENT_COOLDOWN_TIME = Phaser.Timer.QUARTER;

const GRASS_TILE_REF = "grass";
const BUNNY_SPRITE_REF = "bunny";
const TILES_REF = "ground_1x1";
const WALLS_REF = "walls_1x2"

window.onload = function () {

    const game = new Phaser.Game(WINDOW_SIZE, WINDOW_SIZE, Phaser.CANVAS, "game", {
      preload: preload,
      create: create,
      update: update,
      render: render
    });
  
    const state = {
      movementCooldown: false,
      playerTilePos: {
        x: 1,
        y: 1
      }
    };

    function preload() {
        game.load.image(TILES_REF, "images/tiles.png")
        // game.load.image(GRASS_TILE_REF, "images/grass_t.png");
        // game.load.image(KANTO_TILE_REF, "images/kanto.png");
        game.load.image(BUNNY_SPRITE_REF, "images/bunny_s.png");
      }

    function create() {
        // game.physics.startSystem(Phaser.Physics.ARCADE)

        const settings = {
            tileSize: TILE_SIZE,
            tileCount: TILE_COUNT
        };
        // const tiles = {
        //     grass: GRASS_TILE_REF,
        //     kanto: KANTO_TILE_REF
        // };
        // state.map = maps.createLevel1(game, settings, TILES_REF);
//        state.map = maps.createMap(game, settings, tiles);


        const createRes = maps.createLevel1(game, settings, TILES_REF);
        state.map = createRes.tileMap
        state.layer = createRes.layer
        state.mapData = createRes.mapData

        state.player = game.add.sprite(32, 32, BUNNY_SPRITE_REF);
        // game.physics.enable(state.player)
        // // state.player.body.setSize(100, 150,100, 50);
        // state.player.body.collideWorldBounds = true;
    }

    function setCooldown() {
        state.movementCooldown = true;
        game.time.events.add(MOVEMENT_COOLDOWN_TIME, unsetCooldown, this);
    }

    function unsetCooldown() {
        state.movementCooldown = false;
    }

    function moveTo(x, y) {
      if (!state.movementCooldown) {
        state.player.x = wrapAroundAtBounds(x);
        state.player.y = wrapAroundAtBounds(y);
        setCooldown();
      }
    }

    function wrapAroundAtBounds(coord) {
        if (coord < 0) return WINDOW_SIZE + coord;
        if (coord >= WINDOW_SIZE) return coord - WINDOW_SIZE;
        return coord;
    }

    function checkCollision(tileX, tileY) {
      return state.mapData[tileY][tileX];
    }

    function movePlayer(x, y) {
      console.log('movePlayer', state.playerTilePos.x)
      const newX = state.playerTilePos.x + x;
      const newY = state.playerTilePos.y + y;
      console.log('new pos', newX, newY)
      const collisionType = checkCollision(newX, newY);
      console.log('collisionType', collisionType)

      if (collisionType === 0) {
        state.player.x = TILE_SIZE * newX;
        state.player.y = TILE_SIZE * newY;
        state.playerTilePos.x = newX;
        state.playerTilePos.y = newY;
      }

      if (collisionType === 2) {
        console.log('VOITTO')
      }
    }

    function update() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            moveTo(state.player.x, state.player.y - TILE_SIZE);
            state.player.body.velocity.y = TILE_SIZE;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            // moveTo(state.player.x, state.player.y + TILE_SIZE);
            // state.player.body.velocity.y = -TILE_SIZE;
            movePlayer(0, 1)
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            moveTo(state.player.x - TILE_SIZE, state.player.y);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            moveTo(state.player.x + TILE_SIZE, state.player.y);
        }

        // game.physics.arcade.collide(state.player, state.layer);
    }

    function render() {

    }

    window.vasen = function() { movePlayer(-1, 0); }
    window.oikea = function() { movePlayer(1, 0); }
    window.ylos = function() { movePlayer(0, -1); }
    window.alas = function() { movePlayer(0, 1); }

    window.execute = function() {
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
          setTimeout(executeNextCommand, 1000);
        }
      }

      executeNextCommand();

      // eval(document.getElementById("code").value);
    }
}