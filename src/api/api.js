import axios from 'axios';

export const getAll = async () => {
	const response = await axios.get('https://restcountries.com/v3.1/all');
	if (!response) {
		return [];
	}

	if (!response.data) {
		return [];
	}

	return response.data;
}