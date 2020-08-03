const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const Swagger2Postman = require('./convert.js');

const pathWorking = "/tmp";
const fileYaml = path.join(pathWorking, "oas.yaml");
const fileJson = path.join(pathWorking, "oas.json");
const filePman = path.join(pathWorking, "postman.json");

try {
  const objDoc = yaml.safeLoad(fs.readFileSync(fileYaml, "utf8"));
  fs.writeFileSync(fileJson, JSON.stringify(objDoc, null, 2));

  console.log(`Converted JSON text has been saved to ${fileJson}`);

  const converter = new Swagger2Postman();
  const objPman = converter.convert(objDoc);
  fs.writeFileSync(filePman, JSON.stringify(objPman.collection, null, 2));
  console.log(`Converted PostMan collection has been saved to ${filePman}`);

} catch (e) {
  console.log(e);
}
