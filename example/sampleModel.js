import valueFactory from '../src/lib/valueFactory';
import {trackable} from '../src/lib/constant/constant';

class SampleModel {
  constructor() {
    const birthDate = valueFactory.getRandomDate('1970-01-01', '2020-01-01');
    this.data = Object.assign({
      id: valueFactory.guid(),
      employeeId: valueFactory.randomByLengthWithZero(6),
      name: valueFactory.getRandomName().name,
      hasPermission: valueFactory.randomToBool(),
      birthDate: birthDate,
      age: valueFactory.getAge(birthDate),
    }, trackable.timestamp, trackable.manager);
  }
}
export default SampleModel;