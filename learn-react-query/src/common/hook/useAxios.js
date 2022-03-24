import axios from 'axios';

const useAxios = () => {
    return axios.create({
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'Accept': "application/json; charset=UTF-8"
        }
    });
}

export default useAxios;