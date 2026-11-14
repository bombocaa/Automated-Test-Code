export const credentials = {
  username: 'admin',
  password: 'password123',
};

export const booking = {
  firstname: 'Playwright',
  lastname: 'API Test',
  totalprice: 175,
  depositpaid: true,
  bookingdates: {
    checkin: '2027-06-10',
    checkout: '2027-06-15',
  },
  additionalneeds: 'Breakfast',
};

export const updatedBooking = {
  ...booking,
  firstname: 'Updated Guest',
  totalprice: 200,
  additionalneeds: 'Breakfast and late checkout',
};
