import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
```

Then create `frontend/.env.production`:
```
REACT_APP_API_URL=https://life-quest-u6zi.onrender.com
