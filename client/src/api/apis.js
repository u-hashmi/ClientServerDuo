import API_BASE_URL from './config';

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getCollection`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const insertData = async (newData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/insertData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to insert data');
    }
  } catch (error) {
    console.error('Error:', error);
    return null; 
  }
};

export const deleteData = async (id) => {
  try {
    // Make a request to the API to delete the record
    const response = await fetch(`${API_BASE_URL}/deleteData/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to delete data');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateData = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updateData/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData); // Message from the server confirming update
      return updatedData; // Returning the updated data, if required
    } else {
      throw new Error('Failed to update data');
    }
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null if the update fails
  }
};

export const fetchLoanData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getLoanDataCollection`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Failed to fetch loan data');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const insertLoanData = async (newLoanData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/insertLoanData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLoanData)
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to insert loan data');
    }
  } catch (error) {
    console.error('Error:', error);
    return null; 
  }
};

export const deleteLoanData = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deleteLoanData/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to delete loan data');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateLoanData = async (id, updatedLoanData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updateLoanData/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLoanData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData); // Message from the server confirming update
      return updatedLoanData; // Returning the updated data, if required
    } else {
      throw new Error('Failed to update loan data');
    }
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null if the update fails
  }
};