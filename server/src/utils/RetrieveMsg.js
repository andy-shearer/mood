const Daily = require("../scripts/Daily");

/**
 * Helper class to call the Daily message functions
 */
async function main() {
  console.log(Daily.getMessage());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });