import { fetchData, handleData } from './keyword_search';

describe('fetchData', () => {
  const mockResponse = (status: number, data: any) =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      json: () => Promise.resolve(data),
    });

  // fetchMock.enableMocks();

  // beforeEach(() => {
  //   fetchMock.resetMocks();
  // });

  afterEach(() => {
    // Restore the original fetch function
    jest.restoreAllMocks();
  });

  it('should fetch data successfully', async () => {
    // fetchMock.mockResponseOnce(
    //   JSON.stringify({ results: ['result1', 'result3'] }),
    // );
    const query = 'test';
    const page = 1;

    const data = await fetchData(query, page);

    expect(data).toEqual({
      documents: [],
      meta: {
        is_end: true,
        pageable_count: 0,
        same_name: {
          keyword: 'test',
          region: [],
          selected_region: '',
        },
        total_count: 0,
      },
    });
  });
});
