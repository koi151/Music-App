const fs = require("fs-extra");

const listFolderCopy = [
  {
    sourceDirectory: "views",
    targetDirectory: "dist/views"
  },
  {
    sourceDirectory: "public",
    targetDirectory: "dist/public"
  }
];

listFolderCopy.forEach(item => {
  fs.copy(item.sourceDirectory, item.targetDirectory, (err) => {
    if (err) {
      console.error(`Error occurred while copying directories ${item.sourceDirectory}:`, err);
    } else {
      console.log(`Copied ${item.sourceDirectory} directory successfull`);
    }
  });
});