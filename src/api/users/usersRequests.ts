import axiosInstance from "../axiosConfig";
import {User} from '../../types/api/user.types';

const userRequests = {
    getUsers: async () => {
      try {
        const response = await axiosInstance.get('/user');
        return response.data as Array<User>;
      } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to fetch users. Please try again later.');
      }
    },
  };
  
  export default userRequests;