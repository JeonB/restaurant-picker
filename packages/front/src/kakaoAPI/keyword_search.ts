// require('dotenv').config(); // dotenv 모듈을 사용하여 .env 파일의 환경 변수를 로드
const restAPIkey = process.env.REACT_APP_KAKAO_RESTAPI_KEY;
const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword';

// 전체 데이터를 저장할 배열
let allData: { [key: string]: string }[] = [];

// 페이지별로 요청 보내기
async function fetchData(query: string, page: number) {
  const queryParams: { [key: string]: string | number } = {
    query,
    x: '126.82597944995',
    y: '37.5676859104888',
    category_group_code: 'FD6',
    rect: '126.8250689717849,37.56713802152521,126.82796203861662,37.5691469858858',
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
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}
// fetchData 함수 호출 후 결과 처리
async function handleData(query: string) {
  let page = 1;
  try {
    let data = await fetchData(query, page);

    do {
      data.documents.forEach((document: { [key: string]: string }) => {
        allData.push(document);
      });
      page++;
      data = await fetchData(query, page);
    } while (!data.meta.is_end && page < 4);
  } catch (error) {
    console.error('Error occurred:', error);
  }
  return allData;
}
export { fetchData, handleData };
