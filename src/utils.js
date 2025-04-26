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
    const monthString = month > 9 ? month + 1 : `0${month + 1}`
    const yearString = dateObj.getFullYear()

    return {
        date: dateString,
        month: monthString,
        year: yearString,
        displayDate: `${dateString}-${monthString}-${yearString}`,
        formattedDate: `${yearString}-${monthString}-${dateString}`,
    }
}

export const calculateAge = (dob) => {
    if (!dob) {
        return null
    }
    const today = new Date()
    const birthDate = new Date(dob)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--
    }
    return age
}
