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
    const monthString = month > 8 ? month + 1 : `0${month + 1}`
    const yearString = dateObj.getFullYear()

    return {
        date: dateString,
        month: monthString,
        year: yearString,
        displayDate: `${dateString}-${monthString}-${yearString}`,
        formattedDate: `${yearString}-${monthString}-${dateString}`,
        utcDate: new Date(
            dateObj.getUTCFullYear(),
            dateObj.getUTCMonth(),
            dateObj.getUTCDate(),
            dateObj.getUTCHours(),
            dateObj.getUTCMinutes(),
            dateObj.getUTCSeconds()
        ),
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

export const getGenderDisplayName = (gender) => {
    if (!gender) {
        return ''
    }
    return gender.charAt(0).toUpperCase() + gender.slice(1)
}

export const scrollToBottom = (containerRef) => {
    const container = containerRef.current
    container.scrollTop = container.scrollHeight
}

export const getTimeFromDateInHHMM = (time) => {
    if (typeof time === 'string') {
        time = new Date(time)
    }
    if (!time) {
        return ''
    }
    const hours = time.getHours()
    const minutes = time.getMinutes()
    return { hours, minutes, formattedTime: `${hours}:${minutes}` }
}
