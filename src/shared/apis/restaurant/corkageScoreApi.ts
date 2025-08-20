import apiClient from '../apiClient';

export interface CorkageScoreParams {
  range?: 1 | 3 | 7 | 30;
}

export interface CorkageScore {
  reviewId: number; //1,
  name: string; //"엔비 햄버거",
  userName: string; //"니콜라 테슬라",
  content: string; //"몰트향과 완벽하게 어우러지는 조화로운 페어링입니다.",
  rating: number; //5,
  createdAt: string; //"2025-01-01",
  imageUrl: string; //"https://image.bucket/xxx1.jpg",
  bookmarkCount: number; //27
}

export interface CorkageScoreResponse {
  success: boolean;
  code: number;
  message: string;
  data: CorkageScore[];
}

export const fetchCorkageScore = async ({ range = 1 }: CorkageScoreParams = {}): Promise<
  CorkageScore[]
> => {
  //기본값1, 허용값만 통과시킴
  const fixed = ([1, 3, 7, 30] as const).includes(range) ? range : 1;
  //보정된 값을 문자열로 바꾸어 쿼리스트링 생성
  const queryString = new URLSearchParams({ range: String(fixed) }).toString();

  //   const searchParams = new URLSearchParams();
  //   if (params.range) searchParams.append('range', String(params.range));
  //   else {
  //     {
  //       params.range = 1;
  //     }
  //     searchParams.append('range', String(params.range));
  //   }

  const response = await apiClient.get<CorkageScoreResponse>(
    `/reviews/corkageScore?${queryString}`
  );
  console.log(response);

  return response.data.data;
};
