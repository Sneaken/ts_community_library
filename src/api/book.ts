import axios from 'axios';

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

export async function bookReservation(label: string) {
  try {
    const url = '/api/bookStorage/bookReservation';
    const result = await axios.post(url, {
      label
    });
    if (result.status === 0) {
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}
