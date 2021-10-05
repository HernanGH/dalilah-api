const bcrypt = require('bcrypt');

const main = async () => {
  const hash = await bcrypt.hash('acamica', 10);
  console.log('HASH: ', hash);
};

main();