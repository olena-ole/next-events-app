import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import Head from 'next/head'

export default function FilteredEventsPage() {

    const [ loadedEvents, setLoadedEvents ] = useState(undefined)

    const router = useRouter()

    async function fetcher(url) {
        const res = await fetch(url)
        const data = await res.json()

        const transformedData = []

        for (let key in data) {
            transformedData.push({
                id: key,
                ...data[key]
            })
        }

        return transformedData
    }

    const { data, error } = useSWR(
        'https://next-course-data-fetchin-aa929-default-rtdb.firebaseio.com/events.json', 
        fetcher
    )

    useEffect( () => {
        if (data) {
            setLoadedEvents(data)
        }
    }, [data])

    

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content="A list of filtered events"/>
        </Head>
    )

    if (!loadedEvents) {
        return (
            <Fragment>
                {pageHeadData}
                <p className="center">Loading...</p>
            </Fragment>
        )
    }

    const filteredData = router.query.slug
    const numYear = +filteredData[0]
    const numMonth = +filteredData[1]

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`All events for ${numMonth}/${numYear}`}/>
        </Head>
    )

    if (
        error ||
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth > 12 ||
        numMonth < 1
    ) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert><p>Invalid filter. Please adjuct your values!</p></ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = loadedEvents.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    })

    if (!filteredEvents || !filteredEvents.length) {
        return (
            <Fragment>
                {pageHeadData}
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
            {pageHeadData}
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}




// export async function getServerSideProps(context) {

//     const { params } = context
//     const filteredData = params.slug

//     const numYear = +filteredData[0]
//     const numMonth = +filteredData[1]

//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth > 12 ||
//         numMonth < 1
//     ) {
//         return {
//             props: {
//                 hasError: true
//             }
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear, 
//         month: numMonth
//     })

//     return {
//         props: {
//             filteredEvents,
//             numYear,
//             numMonth
//         }
//     }
// }