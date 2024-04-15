require('dotenv').config(); // dotenv 모듈을 사용하여 .env 파일의 환경 변수를 로드

const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword';
const restAPIkey = process.env.KAKAO_RESTAPI_KEY;
let allData: { [key: string]: string | number }[] = []; // 전체 데이터를 저장할 배열

interface QueryParamsType {
  query: string;
  x: string;
  y: string;
  category_group_code: string;
  // rect: string;
  radius: string;
  size: number;
  page: number;
  [key: string]: string | number;
}

// Kakao Local API를 호출하여 데이터를 가져오는 함수
async function fetchData(params: QueryParamsType) {
  const queryParams: QueryParamsType = {
    query: params.query,
    x: params.x, // 회사 좌표 : '126.82597944995'
    y: params.y, // 회사 좌표 : '37.5676859104888'
    category_group_code: 'FD6',
    radius: params.radius,
    // rect: '126.8250689717849,37.56713802152521,126.82796203861662,37.5691469858858', // 마곡나루역 주변 4개블록 좌표
    size: 15,
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
  params.page = 1;
  try {
    let data = await fetchData({
      query: params.query,
      x: params.x,
      y: params.y,
      category_group_code: 'FD6',
      radius: params.radius,
      size: 15,
      page: params.page,
    });

    // Kakao Local API는 최대 3페이지까지(45개) 데이터 제공
    while (params.page < 4) {
      data.documents.forEach((document: { [key: string]: string | number }) => {
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
