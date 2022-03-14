import type { MockMethod } from 'vite-plugin-mock';

/**
 * 模拟延迟
 *
 * @param time 毫秒
 */

export async function sleep(time: number) {
  await new Promise(resolve => {
    setTimeout(() => resolve(void 0), time);
  });
  return;
}

export default [
  {
    url: '/api/ping',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: 'pong!'
      };
    }
  },
  {
    url: '/api/account',
    method: 'get',
    rawResponse: async (req, res) => {
      await sleep(3000), res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          code: 0,
          data: {
            username: 'tangdaoyuan',
            password: '123'
          }
        })
      );
    }
  }
] as MockMethod[];
