"use strict";
window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');
const maps    = require('./map');

window.onload = function() {
    const tileSize = 50;
    const tileCount = 11;
    const windowSize = tileSize * tileCount;
    const grassTileRef = "grass";
    const bunnySpriteRef = "bunny";
    const game = new Phaser.Game(windowSize, windowSize, Phaser.CANVAS, "game", { preload: preload, create: create, update: update, render: render });
    const state = { game: game };

    function preload() {
        game.load.image(grassTileRef, "images/grass_t.png");
        game.load.image(bunnySpriteRef, "images/bunny_s.png");
    }

    function create() {
        const settings = {
            tileSize: tileSize,
            tileCount: tileCount
        };
        const tiles = {
            grass: grassTileRef
        };
        state.game.time.slowMotion = 4.0;
        state.map = maps.createMap(game, settings, tiles);
        state.player = game.add.sprite(0, 0, bunnySpriteRef);
    }

    function update() {
        if (state.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            state.player.y -= tileSize;
        } else if (state.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            state.player.y += tileSize;
        }

        if (state.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            state.player.x -= tileSize;
        } else if (state.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            state.player.x += tileSize;
        }
    }

    function render() {
        
    }
}