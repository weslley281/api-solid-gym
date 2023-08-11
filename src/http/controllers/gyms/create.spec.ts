import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Gym (e2e)', () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close;
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Quebra dentes',
        description: 'dojo de artes marciais',
        phone: '(65)981233996',
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
