class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {

  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    const agedBrie = 'Aged Brie';
    const backstagePasses = 'Backstage passes to a TAFKAL80ETC concert';
    const sulfuras = 'Sulfuras, Hand of Ragnaros';
    const conjured = 'Conjured';

    this.items.forEach(item => {
      if (item.name !== sulfuras ) {
        item.sellIn--;
      }
      switch (item.name) {
        case sulfuras:
          this.increaseQuality(item);
          break;
        case agedBrie:
          this._processAgedBrie(item);
          break;
        case backstagePasses:
          this.processBackstagePasses(item);
          break;
        case conjured:
          this.processConjured(item);
          break;
        default:
          this.processDefault(item);
          break;
      }
    });
    return this.items;
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  _processAgedBrie(item) {
    this.increaseQuality(item);
    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  processBackstagePasses(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      this.increaseQuality(item);
      if (item.sellIn < 11) {
        this.increaseQuality(item);
      }
      if (item.sellIn < 6) {
        this.increaseQuality(item);
      }
    }
  }

  processConjured(item) {
    if (item.sellIn < 0) {
      for (let i = 0; i < 4; i++) {
        this.decreaseQuality(item);
      }
    } else {
      this.decreaseQuality(item);
      this.decreaseQuality(item);
    }
  }

  processDefault(item) {
    this.decreaseQuality(item);
    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

}

module.exports = {
  Item,
  Shop
}
