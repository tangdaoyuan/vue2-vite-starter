import http from '@/http';

export interface IUserResp {
  code: number;
  data: {
    username: string;
    password: string;
  };
}

/**
 * 查询当前用户
 *
 * @returns {Promise}
 */
export function fetchUser(): Promise<IUserResp> {
  return new Promise(resolve => {
    http.get(`/api/account`).then(res => resolve(res?.data));
  });
}
