const API_BASE_URL_BACKEND = "http://localhost:3005"

type User = {
  username: string,
  totalSum: number,
  tempDays: number,
  multiplier: number
}

export const createUser = async (
  username: string,
  totalSum: number,
  tempDays: number,
  multiplier: number = 1
) => {
  if (API_BASE_URL_BACKEND) {
    const response = await fetch(`${API_BASE_URL_BACKEND}/create`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, totalSum, tempDays, multiplier}),
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json();
  }
};
