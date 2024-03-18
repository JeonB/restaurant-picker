import { fetchData } from './keyword_search';

describe('fetchData', () => {
  const mockResponse = (status: number, data: any) =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      json: () => Promise.resolve(data),
    });

  const mockFetch = (url: string, options: any) => {
    // Mock implementation of fetch
    // You can customize this based on your needs
    if (url === 'https://api.kakao.com/v1/search/keyword.json?query=test&x=126.82597944995&y=37.5676859104888&category_group_code=FD6&rect=126.8250689717849,37.56713802152521,126.82796203861662,37.5691469858858&size=15&page=1') {
      return mockResponse(200, { results: ['result1', 'result2'] });
    } else {
      return mockResponse(404, { error: 'Not found' });
    }
  };

  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = jest.fn().mockImplementation(mockFetch);
  });

  afterEach(() => {
    // Restore the original fetch function
    jest.restoreAllMocks();
  });

  it('should fetch data successfully', async () => {
    const query = 'test';
    const page = 1;

    const data = await fetchData(query, page);

    expect(data).toEqual({ results: ['result1', 'result2'] });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.kakao.com/v1/search/keyword.json?query=test&x=126.82597944995&y=37.5676859104888&category_group_code=FD6&rect=126.8250689717849,37.56713802152521,126.82796203861662,37.5691469858858&size=15&page=1',
      {
        method: 'GET',
        headers: {
          Authorization: 'KakaoAK YOUR_REST_API_KEY',
        },
      }
    );
  });

  it('should throw an error if response is not ok', async () => {
    const query = 'test';
    const page = 1;

    global.fetch = jest.fn().mockImplementation(() => mockResponse(500, { error: 'Internal server error' }));

    await expect(fetchData(query, page)).rejects.toThrow('Response 실패');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});