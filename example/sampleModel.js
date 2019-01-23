import generator from '../src/lib/generator';

class SampleModel {
  constructor() {
    this.defaultModel = {
      id: generator.guid(),
      name: generator.getRandomName().name,
    }
  }
}
export default SampleModel;