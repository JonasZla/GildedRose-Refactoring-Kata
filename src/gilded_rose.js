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
          item.quality = this.increaseQuality(item.quality);
          break;
        case agedBrie:
          item = this.proccessAgedBrie(item);
          break;
        case backstagePasses:
          item = this.proccessBackstagePasses(item);
          break;
        case conjured:
          item = this.proccessConjured(item);
          break;
        default:
          item = this.processDefault(item);
          break;
      }
    });
    return this.items;
  }

  increaseQuality(quality) {
    if (quality < 50) {
      return quality + 1;
    } else {
      return quality;
    }
  }

  decreaseQuality(quality) {
    if (quality > 0) {
      return quality - 1;
    } else {
      return quality;
    }
  }

  proccessAgedBrie(item) {
    item.quality = this.increaseQuality(item.quality);
    if (item.sellIn < 0) {
      item.quality = this.increaseQuality(item.quality);
    };
    return item;
  }

  proccessBackstagePasses(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      item.quality = this.increaseQuality(item.quality);
      if (item.sellIn < 11) {
        item.quality = this.increaseQuality(item.quality);
      }
      if (item.sellIn < 6) {
        item.quality = this.increaseQuality(item.quality);
      }
    }
    return item;
  }

  proccessConjured(item) {
    if (item.sellIn < 0) {
      for (let i = 0; i < 4; i++) {
        item.quality = this.decreaseQuality(item.quality);
      }
    } else {
      item.quality = this.decreaseQuality(item.quality);
      item.quality = this.decreaseQuality(item.quality);
    }
    return item;
  }

  processDefault(item) {
    item.quality = this.decreaseQuality(item.quality);
    if (item.sellIn < 0) {
      item.quality = this.decreaseQuality(item.quality);
    }
    return item;
  }

}

module.exports = {
  Item,
  Shop
}
