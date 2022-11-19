import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import { getFilteredEvents } from '../../dummy-data'

export default function FilteredEventsPage() {
    const router = useRouter()
    const filteredData = router.query.slug

    if (!filteredData) {
        return <p className='center'>Loading...</p>
    }

    const numYear = +filteredData[0]
    const numMonth = +filteredData[1]

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth > 12 ||
        numMonth < 1
    ) {
        return <p className='center'>Invalid filter. Please adjuct your values!</p>
    }

    const filteredEvents = getFilteredEvents({
        year: numYear, 
        month: numMonth
    })

    if (!filteredEvents || !filteredEvents.length) {
        return <p className='center'>No events found for the chosen date...</p>
    }

    return (
        <div>
            <EventList items={filteredEvents}/>
        </div>
    )
}