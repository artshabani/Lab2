import axios from "axios";

let user = null;
let loading = true;

async function getUser() {
    const response = await axios.get("http://localhost:5000/api/account").then((res) => res.data)
    user = response;
    loading = false;
    console.log("this is the response",response)
}

function userData() {
    return {user, getUser, loading}
}

export default userData;