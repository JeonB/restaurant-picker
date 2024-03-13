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

    const randomPlaceName = data[randomIndex];
    randomPlaceName.distance += ' m';
    return randomPlaceName;
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
