import { handleData } from './kakaoAPI/keyword_search';

export default async function processData() {
  try {
    const query = '한식';
    const data = await handleData(query); // handleData 함수를 호출하여 데이터 가져옴
    if (data.length === 0) {
      console.log('데이터가 없습니다.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.length); // 랜덤한 인덱스를 생성
    const randomPlaceName = data[randomIndex].place_name; // 랜덤한 인덱스의 place_name 값을 가져옴
    console.log('랜덤한 음식점 이름:', randomPlaceName); // 랜덤한 place_name 값을 출력
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

processData();
