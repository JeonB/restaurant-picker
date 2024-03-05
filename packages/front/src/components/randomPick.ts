export default async function randomPick(category: string) {
  const baseUrl = 'http://localhost:3000/restaurants';
  try {
    const url = `${baseUrl}/${category}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Response 실패');
    }
    const data = await response.json();
    if (data.length === 0) {
      console.log('데이터가 없습니다.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * data.length); // 랜덤한 인덱스를 생성
    const randomPlaceName = JSON.stringify(data[randomIndex]); // 랜덤한 인덱스의 place_name 값을 가져옴
    // console.log(randomPlaceName);
    return randomPlaceName;
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
