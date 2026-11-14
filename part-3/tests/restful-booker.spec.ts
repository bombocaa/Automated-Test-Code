import { expect, test } from '@playwright/test';
import { booking, credentials, updatedBooking } from './data/booking';

function expectBookingSchema(value: unknown) {
  expect(value).toEqual(expect.objectContaining({
    firstname: expect.any(String),
    lastname: expect.any(String),
    totalprice: expect.any(Number),
    depositpaid: expect.any(Boolean),
    bookingdates: expect.objectContaining({
      checkin: expect.any(String),
      checkout: expect.any(String),
    }),
    additionalneeds: expect.any(String),
  }));
}

test('creates, updates, retrieves, and deletes a booking', async ({ request }) => {
  let bookingId: number | undefined;
  let token: string | undefined;

  try {
    const authResponse = await request.post('/auth', { data: credentials });
    expect(authResponse.status()).toBe(200);
    const authBody: unknown = await authResponse.json();
    expect(authBody).toEqual(expect.objectContaining({ token: expect.any(String) }));
    token = (authBody as { token: string }).token;

    const createResponse = await request.post('/booking', { data: booking });
    expect(createResponse.status()).toBe(200);
    const createBody: unknown = await createResponse.json();
    expect(createBody).toEqual(expect.objectContaining({
      bookingid: expect.any(Number),
      booking: expect.any(Object),
    }));
    bookingId = (createBody as { bookingid: number }).bookingid;
    const createdBooking: unknown = (createBody as { booking: unknown }).booking;
    expectBookingSchema(createdBooking);
    expect(createdBooking).toMatchObject(booking);

    const bookingPath = `/booking/${bookingId}`;
    const unauthenticatedUpdate = await request.put(bookingPath, { data: updatedBooking });
    expect(unauthenticatedUpdate.status()).toBe(403);

    const updateResponse = await request.put(bookingPath, {
      data: updatedBooking,
      headers: { Cookie: `token=${token}` },
    });
    expect(updateResponse.status()).toBe(200);
    const updateBody: unknown = await updateResponse.json();
    expectBookingSchema(updateBody);
    expect(updateBody).toMatchObject(updatedBooking);

    const getResponse = await request.get(bookingPath);
    expect(getResponse.status()).toBe(200);
    const retrievedBooking: unknown = await getResponse.json();
    expectBookingSchema(retrievedBooking);
    expect(retrievedBooking).toMatchObject(updatedBooking);

    const deleteResponse = await request.delete(bookingPath, {
      headers: { Cookie: `token=${token}` },
    });
    expect(deleteResponse.status()).toBe(201);
    bookingId = undefined;

    const deletedResponse = await request.get(bookingPath);
    expect(deletedResponse.status()).toBe(404);
  } finally {
    if (bookingId !== undefined && token !== undefined) {
      await request.delete(`/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
      }).catch(() => undefined);
    }
  }
});
