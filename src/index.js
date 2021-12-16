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

for (let i = 0; i < updateTimes; i++) {
  console.log('Call happened')
  processHttpRequests(startRequests)
  gildedRose.updateQuality()
};
console.log(gildedRose)


function processHttpRequests(requestsCount) {
  const getPromises = async () => {
    const promise = await axios.get("https://yesno.wtf/api")
    return promise
  }
  var promises = []
  for (let i = 0; i < requestsCount; i++) {
    promises.push(getPromises())
  }
  console.log('getting promisses.....')
  Promise.all(promises).then(data => {
    var counter = 0
    data.forEach(item => {
      console.log(item.data.answer)
      if (item.data.answer === 'yes') {
        counter++
      }
    })
    console.log(counter)
    writeCounterToFile(counter);
    if (counter > 0) {
      processHttpRequests(counter);
    }
  })
}

async function writeCounterToFile(counter) {
  const file = await fs.writeFile('./log.txt', counter.toString())
}