


class CreateHelper {
  constructor(createModel, modelArgs, modelPropName = 'defaultModel') {
    this.ModelClass = createModel;
    this.modelArgs = modelArgs;
    this.modelPropName = modelPropName;
    this.createObjectItem();
    this.result;
  }

  createObjectItem() {
    const object = new this.ModelClass(...this.modelArgs);
    const item = Object.assign({}, object[this.modelPropName]);
    return item;
  }
}

module.exports = CreateHelper;