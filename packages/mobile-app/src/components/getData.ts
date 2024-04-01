import { Restaurant } from "@projectTypes";
export async function getData(category: string) {
  const baseUrl = "http://192.168.10.108:3000/restaurants";
  try {
    const url = `${baseUrl}/${category}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Response 실패");
    }
    const data: Restaurant[] = await response.json();

    if (data.length === 0) {
      console.log("데이터가 없습니다.");
      return;
    }
    // console.log(data);
    // const randomIndex = Math.floor(Math.random() * data.length);
    // const randomPlaceName = data[randomIndex];
    // randomPlaceName.distance += " m";
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
  }
}
