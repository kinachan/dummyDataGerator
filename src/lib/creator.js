import fs from 'fs';

class Creator {
  constructor() {
    this.rootPath = './dist/';
  }
  existsSync(rootPath = null) {
    if (!fs.existsSync(rootPath || this.rootPath)) {
      fs.mkdirSync(rootPath || this.rootPath);
    }
  }

  writeJson(fileName, obj, rootPath = null) {
    const json = JSON.stringify(obj, null, 2);
    this.existsSync(rootPath);

    const writer = fs.createWriteStream(`${rootPath || this.rootPath}${fileName}`, 'utf8');
    writer.write(json);
    writer.end();
  }

  writeSql(fileName, string, rootPath = null){
    this.existsSync(rootPath);
    fs.writeFileSync(`${rootPath || this.rootPath}${fileName}`, string,{encoding: 'utf8'});
  }

  writeCSharp(fileName, obj, rootPath = null) {
    this.existsSync(rootPath);
    const writer = fs.createWriteStream(`${rootPath || this.rootPath}${fileName}`, 'utf8');
    writer.write(obj.join('\r\n'));
    writer.end();
  }
}

const creator = new Creator();
export default creator;