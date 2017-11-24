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
  
    const state = { movementCooldown: false };

    function preload() {
        game.load.image(TILES_REF, "images/tiles.png")
        // game.load.image(GRASS_TILE_REF, "images/grass_t.png");
        // game.load.image(KANTO_TILE_REF, "images/kanto.png");
        game.load.image(BUNNY_SPRITE_REF, "images/bunny_s.png");
      }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE)

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

        state.player = game.add.sprite(32, 32, BUNNY_SPRITE_REF);
        game.physics.enable(state.player)
        // state.player.body.setSize(100, 150,100, 50);
        state.player.body.collideWorldBounds = true;
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

    function update() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            moveTo(state.player.x, state.player.y - TILE_SIZE);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            moveTo(state.player.x, state.player.y + TILE_SIZE);
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            moveTo(state.player.x - TILE_SIZE, state.player.y);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            moveTo(state.player.x + TILE_SIZE, state.player.y);
        }

        game.physics.arcade.collide(state.player, state.layer);
    }

    function render() {

    }

    window.vasen = function() {
        moveTo(state.player.x - TILE_SIZE, state.player.y);
    }

    window.execute = function() {
        eval(document.getElementById("code").value);
        // var square = document.getElementById("square");
        // if (leveys) {
        //   square.style.width = leveys + "px";
        // }
        // if (korkeus) {
        //   square.style.height = korkeus + "px";
        // }
      }
}