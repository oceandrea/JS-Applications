export const settings = {
    host: ''
}

function getOptions(method='get', data) {
    const options = {
        method,
        headers: {}
    }
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
        options.headers['X-Authorization'] = authToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            return await response.json();
        } catch (error) {
            return response;
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function get(url) {
    return await request(url, getOptions())
}

export async function post(url, data) {
    return await request(url, getOptions('post', data));
}

export async function put(url, data) {
    return await request(url, getOptions('put', data));
}

export async function del(url) {
    return await request(url, getOptions('delete'));
}

export async function login(data) {
    const response = await post(settings.host + '/users/login', data);

    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
}

export async function register(data) {
    const response = await post(settings.host + '/users/register', data);

    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
}

export async function logout() {
    await get(settings.host + '/users/logout');

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
}