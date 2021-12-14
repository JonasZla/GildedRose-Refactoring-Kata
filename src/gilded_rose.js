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
          item.quality = this.increaseQuality(item.quality);
          if (item.sellIn < 0) {
            item.quality = this.increaseQuality(item.quality);
          }
          break;
        case backstagePasses:
          if (item.sellIn < 0) {
            item.quality = 0;
            break;
          }
          item.quality = this.increaseQuality(item.quality);
          if (item.sellIn < 11) {
            item.quality = this.increaseQuality(item.quality);
          }
          if (item.sellIn < 6) {
            item.quality = this.increaseQuality(item.quality);
          }
          break;
        case conjured:
          if (item.sellIn < 0) {
            item.quality = this.decreaseQuality(item.quality);
            item.quality = this.decreaseQuality(item.quality);
            item.quality = this.decreaseQuality(item.quality);
            item.quality = this.decreaseQuality(item.quality);
          } else {
            item.quality = this.decreaseQuality(item.quality);
            item.quality = this.decreaseQuality(item.quality);
          }
          break;
        default:
          item.quality = this.decreaseQuality(item.quality);
          if (item.sellIn < 0) {
            item.quality = this.decreaseQuality(item.quality);
          }
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

}

module.exports = {
  Item,
  Shop
}
