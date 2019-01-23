import SampleModel from './sampleModel';
import creator from '../src/lib/creator';

const models = [];
for (let i = 0; i < 5; i++) {
  const model = new SampleModel();
  models.push(model);
}

const data = models.map((model => model.defaultModel));
creator.writeJson('sample.json', data);
