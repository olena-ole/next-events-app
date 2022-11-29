// import { getEventById } from "../../dummy-data"
import { getAllEvents } from '../../helpers/api-utils'
import { getEventById } from '../../helpers/api-utils'
// import { useRouter } from 'next/router'
import { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from "../../components/ui/error-alert"

export default function EventDetailPage(props) {
    const { event } = props
    // const router = useRouter()
    // const eventId = router.query.eventId
    // const event = getEventById(eventId)

    if (!event) {
        return <ErrorAlert><p>No event found</p></ErrorAlert>
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics 
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticProps(context) {

    // const { params } = context
    const eventId = context.params.eventId
    const requestedEvent = await getEventById(eventId)

    if (!requestedEvent) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            event: requestedEvent
        },
        revalidate: 20
    }
}

export async function getStaticPaths() {
    const allEvents = await getAllEvents()
    const paths = allEvents.map(event => {
        return { params: { eventId: event.id } }
    })

    return { paths, fallback: true }
}