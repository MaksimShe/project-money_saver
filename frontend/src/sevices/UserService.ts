const API_BASE_URL_BACKEND = "http://localhost:3005"

export const getUserByUsername = async (username: string) => {
  if (API_BASE_URL_BACKEND) {
    const response = await fetch(`${API_BASE_URL_BACKEND}/user/${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('User not found');
    }

    return await response.json();
  }
}

export const loginUser = async (username: string) => {
  if (API_BASE_URL_BACKEND) {
    const response = await fetch(`${API_BASE_URL_BACKEND}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  }
}

export const closeTile = async (username: string, tileNumber: number) => {
  if (API_BASE_URL_BACKEND) {
    const response = await fetch(`${API_BASE_URL_BACKEND}/close-tile`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, tileNumber }),
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to close tile');
    }

    return await response.json();
  }
}

export const reopenTile = async (username: string, tileNumber: number) => {
  if (API_BASE_URL_BACKEND) {
    const response = await fetch(`${API_BASE_URL_BACKEND}/reopen-tile`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, tileNumber }),
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to reopen tile');
    }

    return await response.json();
  }
}