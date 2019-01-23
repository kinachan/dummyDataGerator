import SqlCreator from '../modules/SqlCreator';
import Creator from '../lib/creator';

class SqlHelper {
  createUseMap(tableName){
    return (result) => {
      const data = result.defaultModel;
      const columns = Object.keys(data);
    
      const sql = new SqlCreator(tableName, columns, data, null, false, false);
      return sql.create(false);
    }
  }

  writeSql(stringResults, fileName) {
    Creator.writeSql(`${fileName}.sql`, stringResults.join('\n'));
  }
}
export default SqlHelper;