// renderer.js
// fs 모듈을 불러옵니다.
const fs = require('fs');

// HTML 요소를 선택합니다.
const category = document.getElementById('category');
const random = document.getElementById('random');
const menu = document.getElementById('menu');
const restaurant = document.getElementById('restaurant');
const add = document.getElementById('add');
const delete = document.getElementById('delete');

// 메뉴와 식당의 데이터를 저장할 JSON 파일의 경로를 지정합니다.
const dataFile = 'data.json';

// JSON 파일에서 데이터를 불러오는 함수를 정의합니다.
function loadData() {
  // JSON 파일이 존재하면
  if (fs.existsSync(dataFile)) {
    // JSON 파일을 읽어서 객체로 변환합니다.
    const data = JSON.parse(fs.readFileSync(dataFile));
    // 객체를 반환합니다.
    return data;
  } else {
    // JSON 파일이 존재하지 않으면
    // 빈 객체를 반환합니다.
    return {};
  }
}

// JSON 파일에 데이터를 저장하는 함수를 정의합니다.
function saveData(data) {
  // 객체를 JSON 문자열로 변환합니다.
  const json = JSON.stringify(data);
  // JSON 파일에 문자열을 씁니다.
  fs.writeFileSync(dataFile, json);
}

// 랜덤으로 메뉴와 식당을 추천하는 함수를 정의합니다.
function recommend() {
  // 데이터를 불러옵니다.
  const data = loadData();
  // 셀렉트 박스에서 선택한 카테고리를 가져옵니다.
  const selected = category.value;
  // 선택한 카테고리에 해당하는 메뉴와 식당의 리스트를 가져옵니다.
  const list = data[selected];
  // 리스트가 비어있지 않으면
// 리스트가 비어있지 않으면
if (list && list.length > 0) {
    // 리스트에서 랜덤하게 하나의 인덱스를 선택합니다.
    const index = Math.floor(Math.random() * list.length);
    // 선택한 인덱스에 해당하는 메뉴와 식당을 가져옵니다.
    const item = list[index];
    // 메뉴와 식당을 화면에 표시합니다.
    menu.textContent = item.menu;
    restaurant.textContent = item.restaurant;
  } else {
    // 리스트가 비어있으면
    // 메뉴와 식당을 공백으로 표시합니다.
    menu.textContent = '';
    restaurant.textContent = '';
    // 경고 메시지를 표시합니다.
    alert('선택한 카테고리에 메뉴와 식당이 없습니다.');
  }
}