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

module.exports.createLevel1 = function(game, settings, tiles) {
  const tileMap = game.add.tilemap();
  console.log('tiles', tiles)
  tileMap.addTilesetImage(tiles);
  tileMap.setCollisionBetween(1, 5); 
  tileMap.setCollision(1);

  const layer = tileMap.create("layerGround", settings.tileCount, settings.tileCount, settings.tileSize, settings.tileSize);
  layer.resizeWorld();

  // const collisionLayer = map.tileMap('Collision')
  // collisionLayer.visible = false;
  // tileMap.setCollisionByExclusion([], true, this.collisionLayer);
  // collisionLayer.resizeWorld();

  // 0 = grass (33,107)
  // 1 = kanto
  const mapData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  for (let y = 0; y < settings.tileCount; ++y) {
    for (let x = 0; x < settings.tileCount; ++x) {
      if (mapData[y][x] === 0) {
        tileMap.putTile(0, x, y, layer);
      }

      if (mapData[y][x] === 1) {
        tileMap.putTile(1, x, y, layer);
      }
    }
  }
  return {
    tileMap,
    layer
  }
}
