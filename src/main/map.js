"use strict";
window.Phaser = require('phaser-ce/build/custom/phaser-split');

module.exports.createMap = function(game, settings, tiles) {
    const tileMap = game.add.tilemap();
    tileMap.addTilesetImage(tiles.grass, undefined, settings.tileSize, settings.tileSize);
    const layer = tileMap.create("layer", settings.tileCount, settings.tileCount, settings.tileSize, settings.tileSize);
    for (let i = 0; i < settings.tileCount; i++) {
        for (let j = 0; j < settings.tileCount; j++) {
            tileMap.putTile(0, i, j, layer);
        }
    }
    return tileMap;
}
