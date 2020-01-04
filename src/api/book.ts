import axios from '../utils/request';
export async function getLocation(_id: string) {
  try {
    const url = '/api/book/getLocation';
    const result = await axios.get<BookLocation>(url, {
      params: {
        _id
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

export async function getBookingInfo(_id: string) {
  try {
    const url = '/api/book/getBookingInfo';
    const result = await axios.get(url, { params: { _id } });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function bookReservation(
  label: string,
  phone: string
): Promise<any> {
  try {
    const url = '/api/bookBooking/bookReservation';
    const result = await axios.post(url, {
      label,
      phone
    });
    if (result.status === 200) {
      return result;
    } else {
      throw new Error(JSON.stringify(result));
    }
  } catch (e) {
    throw new Error(e.message);
  }
}
