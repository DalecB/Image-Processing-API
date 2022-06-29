import { resizeImage } from '../utilities/getImage';
import supertest from 'supertest';
import { app } from '../index';

const request = supertest(app);
describe('1. Test endpoint response', () => {
  it('get /image endpoint', async () => {
    const response = await request.get(
      '/image?filename=Yumi&width=500&height=500'
    );
    expect(response.status).toBe(200);
  });
});
describe('2. Image Transform function should resolve or reject', () => {
  it('expect transform to not throw error', async () => {
    const transform = await resizeImage(400, 400, 'Yumi');
    expect(transform).toBeTrue();
  });
});
