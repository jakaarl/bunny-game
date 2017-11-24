"use strict";
window.Phaser = require('phaser-ce/build/custom/phaser-split');

// 0 = grass (33,107)
// 1 = kanto
// 2 = porkkana
const MAPS = {
  level1: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

module.exports.loadLevel = function(game, settings, tiles, levelNumber) {
  const tileMap = game.add.tilemap();
  tileMap.addTilesetImage(tiles);
  const layer = tileMap.create("layerGround", settings.tileCount, settings.tileCount, settings.tileSize, settings.tileSize);
  layer.resizeWorld();

  const mapData = MAPS['level' + levelNumber];

  for (let y = 0; y < settings.tileCount; ++y) {
    for (let x = 0; x < settings.tileCount; ++x) {
      tileMap.putTile(mapData[y][x], x, y, layer);
    }
  }
  return {
    tileMap,
    layer,
    mapData
  }
}
