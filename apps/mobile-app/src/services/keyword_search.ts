import { QueryParamsType } from '@_types/queryParams';
import { Restaurant } from '@_types/Restaurant';
import { KAKAO_RESTAPI_KEY } from '@env';
// require('dotenv').config();
const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword';
const restAPIkey = KAKAO_RESTAPI_KEY;
let allData: Restaurant[] = []; // 전체 데이터를 저장할 배열

// Kakao Local API를 호출하여 데이터를 가져오는 함수
async function fetchData(params: QueryParamsType) {
  const queryParams: QueryParamsType = {
    query: params.query,
    x: params.x, // 회사 좌표 : '126.82597944995'
    y: params.y, // 회사 좌표 : '37.5676859104888'
    category_group_code: params.category_group_code,
    radius: params.radius,
    size: params.size,
    page: params.page,
  };
  const queryString = Object.keys(queryParams)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
    )
    .join('&');

  const url = `${baseUrl}?${queryString}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${restAPIkey}`,
    },
  });
  if (!response.ok) {
    throw new Error('Response 실패');
  }
  const data = await response.json();
  return data;
}

async function handleData(params: QueryParamsType) {
  console.log('handleData:', params);
  params.page = 1;
  try {
    let data = await fetchData({
      query: params.query,
      x: params.x,
      y: params.y,
      category_group_code: params.category_group_code,
      radius: params.radius,
      size: params.size,
      page: params.page,
    });
    console.log(data);
    // Kakao Local API는 최대 3페이지까지(45개) 데이터 제공
    while (params.page < 4) {
      data.documents.forEach((document: Restaurant) => {
        allData.push(document);
      });
      if (data.meta.is_end) break;
      params.page++;
      data = await fetchData(params);
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }
  return allData;
}
export { fetchData, handleData };
