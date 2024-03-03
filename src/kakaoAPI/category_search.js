require("dotenv").config(); // dotenv 모듈을 사용하여 .env 파일의 환경 변수를 로드

const baseUrl = "https://dapi.kakao.com/v2/local/search/category";
const restAPIkey = process.env.KAKAO_RESTAPI_KEY;

// 전체 데이터를 저장할 배열
let allData = [];

// 페이지별로 요청 보내기
async function fetchData(page) {
  const queryParams = new URLSearchParams({
    category_group_code: "FD6",
    x: "126.82597944995",
    y: "37.5676859104888",
    radius: 150,
    size: 15,
    page,
  });

  const url = `${baseUrl}?${queryParams}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${restAPIkey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}
// fetchData 함수 호출 후 결과 처리
async function handleData() {
  let page = 1;
  try {
    let data = await fetchData(page);
    let cnt = 1;

    do {
      data.documents.forEach((place) => {
        console.log(place.place_name);
        cnt++;
      });
      page++;
      data = await fetchData(page);
    } while (data.meta.is_end && page < 4);
    console.log("음식점 수: " + cnt);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

handleData();
