import {trackable, currentTimeStamp, dummyUUID} from './constant/constant';
import {CASES, converterMap} from './namingConverterMap';

export const isTimeStamp = key => Object.keys(trackable.timestamp).some(x =>x === converterMap[CASES.Snake](key));
export const isManager = key => Object.keys(trackable.manager).some(x =>x === converterMap[CASES.Snake](key));

export const getTrackableValue = (key) => {
  const hasTimeStamp = isTimeStamp(key);
  const hasManager = isManager(key);

  if (!hasTimeStamp && !hasManager) return null;
  if (hasTimeStamp) return currentTimeStamp;

  return dummyUUID;
}

export const getTrackableType = (key) => {
  const hasTimeStamp = isTimeStamp(key);
  const hasManager = isManager(key);

  if (!hasTimeStamp && !hasManager) return null;
  if (hasTimeStamp) return 'DateTime';
  return 'Guid';
}
