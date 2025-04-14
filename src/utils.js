export const getCookieValue = (cookieName) =>
    cookieName
        ? document.cookie
              .split('; ')
              .find((row) => row.startsWith(`${cookieName}=`))
              ?.split('=')[1]
        : null;

export const deleteCookie = (cookieName) => {
    document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
