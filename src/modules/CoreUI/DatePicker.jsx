import { useRef, useState } from 'react'

import { DayPicker } from 'react-day-picker'

import { Input } from '@CoreUI'
import { useOutsideClick } from 'hooks'

import 'react-day-picker/dist/style.css'
import { formatDate } from 'src/utils'

export const DatePicker = ({
    classNames = {},
    currentDate = new Date(),
    fromYear = new Date().getFullYear() - 100,
    inputProps,
    onDateChange,
    toYear = new Date().getFullYear(),
}) => {
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState(currentDate)

    const dayPickerRef = useRef()
    const inputRef = useRef()

    const handleShowCalendar = () => setShowCalendar(true)
    const handleHideCalendar = () => setShowCalendar(false)

    const handleDateChange = (dateObj) => {
        if (!dateObj) {
            return
        }
        const { formattedDate } = formatDate(dateObj)
        setSelectedDate(dateObj)
        onDateChange?.(formattedDate)
        handleHideCalendar()
    }

    const { displayDate } = formatDate(selectedDate)

    useOutsideClick([inputRef, dayPickerRef], handleHideCalendar)

    return (
        <>
            <Input
                labelProps={{ content: 'Date of birth' }}
                onClick={handleShowCalendar}
                placeholder="Enter your date of birth"
                ref={inputRef}
                value={displayDate}
                {...inputProps}
            />
            <div className="relative">
                {showCalendar ? (
                    <div
                        className="absolute top-0 left-0 z-5 mx-auto max-w-sm rounded-2xl bg-white p-4 shadow-md dark:bg-gray-800"
                        ref={dayPickerRef}
                    >
                        <div className="">
                            <DayPicker
                                captionLayout="dropdown"
                                classNames={{
                                    months: 'flex flex-col gap-4',
                                    month: 'space-y-4',
                                    caption: 'flex justify-between items-center',
                                    caption_label: 'hidden',
                                    caption_dropdowns: 'flex space-x-2',
                                    dropdown:
                                        'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded-md',
                                    nav: 'hidden',
                                    nav_button: 'rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700',
                                    table: 'w-full border-collapse',
                                    head_row: 'flex',
                                    head_cell: 'text-xs text-gray-500 dark:text-gray-400 w-9',
                                    row: 'flex w-full mt-1',
                                    cell: 'text-sm text-center p-1 w-9 h-9',
                                    day: 'rounded-full hover:bg-blue-500 hover:text-white transition',
                                    day_selected: 'bg-blue-600 text-white hover:bg-blue-700',
                                    day_today: 'border border-blue-500',
                                    day_outside: 'text-gray-400',
                                    ...classNames,
                                }}
                                fromYear={fromYear}
                                mode="single"
                                onSelect={handleDateChange}
                                selected={selectedDate}
                                toYear={toYear}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}
