import requester from './requester';
import qs from 'qs';

export async function getList() {
  let result = await requester('/api/getList');
  return result;
}
