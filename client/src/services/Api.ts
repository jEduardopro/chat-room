import axios from "axios";

const baseURL = "http://localhost:3000/api";

const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
	"X-Requested-With": "XMLHttpRequest",
};

const options = {
	headers,
	baseURL,
};

const Axios = axios.create(options);

export default Axios;
