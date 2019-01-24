import SqlCreator from '../modules/SqlCreator';
import fileCreator from '../lib/fileCreator';

class SqlHelper {
  createUseMap = (tableName) => {
    return (model) => {
      const columns = Object.keys(model.data);
    
      const sql = new SqlCreator(tableName, columns, model.data, null, false, false);
      return sql.createQuery(false);
    }
  }

  writeSql = (queries, fileName) => {
    fileCreator.writeSql(`${fileName}.sql`, queries.join('\n'));
  }
}
export default SqlHelper;