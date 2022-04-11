import axios from "axios";

export default axios.create({
    headers: {
        "Content-type": "application/json",
        'Accept': "application/json, text/plain, */*"
    },
});