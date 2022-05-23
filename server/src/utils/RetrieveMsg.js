const Daily = require("../scripts/Daily");

/**
 * Helper class to call the Daily message functions
 */
async function main() {
  for(let i=0; i <= 5; i++) {
    console.log(Daily.getMorningMsg());
    console.log(Daily.getAfternoonMsg());
    console.log("=============");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });