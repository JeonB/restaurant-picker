require('dotenv').config(); // dotenv 모듈을 사용하여 .env 파일의 환경 변수를 로드

const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword';
const restAPIkey = process.env.KAKAO_RESTAPI_KEY;

// 전체 데이터를 저장할 배열
let allData: { [key: string]: string | number }[] = [];

// Kakao Local API를 호출하여 데이터를 가져오는 함수
async function fetchData(query: string, page: number) {
  const queryParams: { [key: string]: string | number } = {
    query,
    x: '126.82597944995', // 회사 좌표
    y: '37.5676859104888',
    category_group_code: 'FD6',
    rect: '126.8250689717849,37.56713802152521,126.82796203861662,37.5691469858858', // 마곡나루역 주변 4개블록 좌표
    size: 15,
    page,
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

async function handleData(query: string) {
  let page = 1;
  try {
    let data = await fetchData(query, page);

    // Kakao Local API는 최대 3페이지까지(45개) 데이터 제공
    while (page < 4) {
      data.documents.forEach((document: { [key: string]: string | number }) => {
        allData.push(document);
        // cnt++;
      });
      if (data.meta.is_end) break;
      page++;
      data = await fetchData(query, page);
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }
  return allData;
}
export { fetchData, handleData };
