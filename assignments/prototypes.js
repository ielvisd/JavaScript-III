/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/// constructor function: to build objects
function GameObject(attributes) {
  this.createdAt = attributes.createdAt;
  this.dimensions = attributes.dimensions;
}

GameObject.prototype.destroy = function () {
  return (`${this.name} was removed from the game`);
}

/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function CharacterStats(characterattributes) {
  //This binds the "this" keyword to GameObject
  GameObject.call(this, characterattributes);
  this.hp = characterattributes.hp;
  this.name = characterattributes.name;
}

// this sets up the __proto__ and allows us to use methods now across objects (destroy)
CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function () {
  return (`${this.name} took damage.`);
}



/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function Humanoid(humanoidattributes) {
  //This binds the "this" keyword to CharacterStats
  CharacterStats.call(this, humanoidattributes);
  this.faction = humanoidattributes.faction;
  this.weapons = humanoidattributes.weapons;
  this.language = humanoidattributes.language;
}

// this sets up the __proto__ and allows us to use methods now across objects (destroy & takeDamage)
Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function () {
  return (`${this.name} offers a greeting in ${this.language}.`)
}

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by uncommenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  hp: 5,
  name: 'Bruce',
  faction: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Toungue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  hp: 15,
  name: 'Sir Mustachio',
  faction: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Toungue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  hp: 10,
  name: 'Lilith',
  faction: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.hp); // 15
console.log(mage.name); // Bruce
console.log(swordsman.faction); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
// * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villian and one a hero and fight it out with methods!

function hero(heroattributes) {
  //This binds the "this" keyword to CharacterStats
  Humanoid.call(this, heroattributes);
  this.heropower = heroattributes.heropower;
}

// this sets up the __proto__ and allows us to use methods now across objects (destroy & takeDamage)
hero.prototype = Object.create(Humanoid.prototype);

hero.prototype.discover = function () {
  return (`${this.name} discovers ${this.heropower}.`)
}

hero.prototype.heal = function (character, hpheal) {
  console.log(`${this.name} has healed ${character.name}!. ${character.name}! gains ${hpheal} points.`);
  character.hp = character.hp + hpheal;
  return (character.hp);
}

const BlueKnight = new hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 5,
  },
  hp: 20,
  name: 'The Blue Knight',
  faction: 'Forest Kingdom',
  weapons: [
    'Sword',
    'Pencil',
  ],
  language: 'Pickle',
});

console.log(BlueKnight.heal(archer, 5));

function villain(villainattributes) {
  //This binds the "this" keyword to CharacterStats
  Humanoid.call(this, villainattributes);
  this.defend = villainattributes.defend;
}

// this sets up the __proto__ and allows us to use methods now across objects (destroy & takeDamage)
villain.prototype = Object.create(Humanoid.prototype);

villain.prototype.taunt = function () {
  return (`Loser, your powers are too weak to defeat ${this.name}!`)
}

villain.prototype.curse = function(character, hpcurse) {
  character.hp = character.hp - hpcurse;
  if (character.hp <= 0) {
    console.log(`${this.name} has cursed ${character.name}!. ${character.name}! loses ${hpcurse} points.`);
    console.log(character.destroy()); 
    return (character.hp);
  }
  else {
    console.log(`${this.name} has cursed ${character.name}!. ${character.name}! loses ${hpcurse} points.`);
     return (character.hp);
  }
}

const EvilSpongeBob = new villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 3,
  },
  hp: 20,
  name: 'Evil SpongeBob',
  faction: 'Upside Down Bikini Bottom',
  weapons: [
    'Evil Patrick',
    'Evil Laugh',
  ],
  language: 'Ocean',
});

console.log(EvilSpongeBob.curse(mage, 25));

console.log(BlueKnight.heal(swordsman, 5));


  /*
    === END STRETCH ===
  */