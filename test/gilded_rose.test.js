const {Shop, Item} = require("../src/gilded_rose");

function createItem(name, sellIn, quality) {
  return new Item(name, sellIn, quality);
} 

describe("Gilded Rose", () => {
  test("should foo", () => {
    const gildedRose = new Shop([createItem("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  test("Test random item's quality and sell in date after 2 updates", () => {
    const gildedRose = new Shop([new Item("laptop", 0, 15)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
    expect(items[0].sellIn).toBe(-2);
  });
  test("Test Sulfuras, Hand of Ragnaros quality and sell in date after 1 updates", () => {
    const gildedRose = new Shop([createItem("Sulfuras, Hand of Ragnaros", 3, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
    expect(items[0].sellIn).toBe(3);
  });
  test("Test Sulfuras, Hand of Ragnaros corner case", () => {
    const gildedRose = new Shop([createItem("Sulfuras, Hand of Ragnaros", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(5);
  });
  test("Test Aged Brie with negative sellIn value", () => {
    const gildedRose = new Shop([createItem("Aged Brie", -3, 10)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
    expect(items[0].sellIn).toBe(-6);
  });
  test("Test Backstage passes to a TAFKAL80ETC concert with negative sellIn value", () => {
    const gildedRose = new Shop([createItem("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-3);
  });
  test("Test Backstage passes to a TAFKAL80ETC concert with smaller then 6 sellIn value", () => {
    const gildedRose = new Shop([createItem("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(2);
  });
  test("Test Backstage passes to a TAFKAL80ETC concert with smaller then 11 sellIn value", () => {
    const gildedRose = new Shop([createItem("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
    expect(items[0].sellIn).toBe(7);
  });
  test("Test Backstage passes to a TAFKAL80ETC concert with sellIn value going from 10 to 0", () => {
    const gildedRose = new Shop([createItem("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    for (let i = 0; i < 9; i++) {
      gildedRose.updateQuality();
    }
    const items = gildedRose.updateQuality();
    //sellIn   9  8  7  6  5  4  3  2  1  0
    //quality 12 14 16 18 21 24 27 30 33 36
    expect(items[0].quality).toBe(36);
    expect(items[0].sellIn).toBe(0);
  });
  test("Test Conjured item quality and sell in date after 2 updates", () => {
    const gildedRose = new Shop([new Item("Conjured", 2, 15)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
    expect(items[0].sellIn).toBe(0);
  });
  test("Test Conjured item with negative sellIn value", () => {
    const gildedRose = new Shop([new Item("Conjured", 0, 15)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(7);
    expect(items[0].sellIn).toBe(-2);
  });
});
