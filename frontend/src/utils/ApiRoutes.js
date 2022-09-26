const host = "http://localhost:3030";
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030'

export const loginRoute = `${BASE_URL}/api/auth/login`
export const registerRoute = `${BASE_URL}/api/auth/register`
export const setAvatarRoute = `${BASE_URL}/api/auth/setAvatar`
export const allUsersRoute = `${BASE_URL}/api/auth/allusers`
export const sendMessageRoute = `${BASE_URL}/api/messages/addmsg`;
export const getAllMessageRoute = `${BASE_URL}/api/messages/getmsg`