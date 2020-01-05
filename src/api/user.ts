import axios from '../utils/request';
export async function getBookingHistory(phone: string) {
  try {
    const url = '/api/bookBooking/bookingHistory';
    const result = await axios.get(url, {
      params: {
        phone
      }
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function cancelBooking(label: string, phone: string) {
  try {
    const url = '/api/bookBooking/cancelBooking';
    const result = await axios.post(url, { phone, label });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(JSON.stringify(result));
    }
  } catch (e) {
    throw new Error(e.message);
  }
}
