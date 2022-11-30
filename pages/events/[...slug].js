// import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import { getFilteredEvents } from '../../helpers/api-utils'
import { Fragment } from 'react'

export default function FilteredEventsPage(props) {

    const { hasError, filteredEvents, numYear, numMonth } = props
    // const router = useRouter()
    // const filteredData = router.query.slug

    // if (!filteredData) {
    //     return <p className='center'>Loading...</p>
    // }

    // const numYear = +filteredData[0]
    // const numMonth = +filteredData[1]

    if (hasError) {
        return (
            <Fragment>
                <ErrorAlert><p>Invalid filter. Please adjuct your values!</p></ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    // const filteredEvents = getFilteredEvents({
    //     year: numYear, 
    //     month: numMonth
    // })

    if (!filteredEvents || !filteredEvents.length) {
        return (
            <Fragment>
                <ErrorAlert><p>No events found for the chosen date...</p></ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const date = new Date(numYear, numMonth - 1)

    return (
        <Fragment>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}

export async function getServerSideProps(context) {

    const { params } = context
    const filteredData = params.slug

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
        return {
            props: {
                hasError: true
            }
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear, 
        month: numMonth
    })

    return {
        props: {
            filteredEvents,
            numYear,
            numMonth
        }
    }
}