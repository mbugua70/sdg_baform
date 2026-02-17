const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://iguru.co.ke/PLAYGROUND/sdg';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('player', JSON.stringify(data.player));
  return data;
}

export async function fetchTeams() {
  const response = await fetch(`${API_BASE_URL}/team/list.php`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch teams');
  }

  return response.json();
}

export async function fetchGames() {
  const response = await fetch(`${API_BASE_URL}/games/list.php`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  return response.json();
}

export async function submitPoints(pointsData) {
  const response = await fetch(`${API_BASE_URL}/points/manage.php`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(pointsData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to submit points');
  }

  return response.json();
}
