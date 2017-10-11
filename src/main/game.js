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
    const game = new Phaser.Game(windowSize, windowSize, Phaser.CANVAS, "game", { preload: preload, create: create, update: update });
    const state = {};

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
        state.map = maps.createMap(game, settings, tiles);
        state.player = game.add.sprite(0, 0, bunnySpriteRef);
        state.player.checkWorldBounds = true;
        state.player.events.onOutOfBounds.add(function(player) {
            // TODO: WTF, updated position does not get rendered?
            const x = player.body.position.x;
            const y = player.body.position.y;
            if (x < 0) {
                player.reset(windowSize + x, y);
            } else if (x >= windowSize) {
                player.reset(x % windowSize, y);
            }
            if (y < 0) {
                player.reset(x, windowSize + y);
            } else if (y >= windowSize) {
                player.reset(x, y % windowSize);
            }
        }, this);
        state.cursors = game.input.keyboard.createCursorKeys();
        game.time.slowMotion = 4.0;
        game.physics.arcade.enable(state.player);
    }

    function update() {
        if (state.cursors.up.isDown) {
            state.player.body.position.y -= tileSize;
        } else if (state.cursors.down.isDown) {
            state.player.body.position.y += tileSize;
        }

        if (state.cursors.left.isDown) {
            state.player.body.position.x -= tileSize;
        } else if (state.cursors.right.isDown) {
            state.player.body.position.x += tileSize;
        }
    }
}