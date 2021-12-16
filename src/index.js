const fs = require('fs').promises;
const { Shop, Item } = require("./gilded_rose");
const axios = require("axios");

const args = process.argv.slice(2);
const updateTimes = args[0];
const startRequests = args[1];

const items = [
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
];

const gildedRose = new Shop(items);

run();

async function run() {
  for (let i = 0; i < updateTimes; i++) {
    await processHttpRequests(startRequests);
    gildedRose.updateQuality();
  };
  console.log(gildedRose);
}

async function processHttpRequests(requestsCount) {
  const getPromises = async () => {
    const promise = await axios.get("https://yesno.wtf/api");
    return promise;
  }
  var promises = [];
  for (let i = 0; i < requestsCount; i++) {
    promises.push(getPromises());
  }
  const data = await Promise.all(promises);
  var counter = 0;
  data.forEach(item => {
    console.log('Response from API: ', item.data.answer);
    if (item.data.answer === 'yes') {
      counter++;
    }
  })
  console.log('Yes counter: ', counter);
  writeCounterToFile(counter);
  if (counter > 0) {
    await processHttpRequests(counter);
  }
}

async function writeCounterToFile(counter) {
  await fs.writeFile('./log.txt', counter.toString());
}