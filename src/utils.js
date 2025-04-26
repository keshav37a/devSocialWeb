export const getCookieValue = (cookieName) =>
    cookieName
        ? document.cookie
              .split('; ')
              .find((row) => row.startsWith(`${cookieName}=`))
              ?.split('=')[1]
        : null

export const deleteCookie = (cookieName) => {
    document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export const formatDate = (dateObj) => {
    if (!dateObj) {
        return ''
    }
    if (typeof dateObj === 'string') {
        dateObj = new Date(dateObj)
    }

    const month = dateObj.getMonth()
    const date = dateObj.getDate()

    const dateString = date > 9 ? date : `0${date}`
    const monthString = month > 9 ? `0${month + 1}` : month + 1
    const yearString = dateObj.getFullYear()

    return {
        date: dateString,
        month: monthString,
        year: yearString,
        displayDate: `${dateString}-${monthString}-${yearString}`,
        formattedDate: `${yearString}-${monthString}-${dateString}`,
    }
}
