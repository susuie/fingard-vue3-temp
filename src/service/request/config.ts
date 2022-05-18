let BASE_URL = '';
const TIME_OUT = 10000;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api/BIZCORE';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/api/BIZCORE';
} else {
  BASE_URL = '/api/BIZCORE';
}

export { BASE_URL, TIME_OUT };
