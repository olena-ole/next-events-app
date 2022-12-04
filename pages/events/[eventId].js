import { getEventById, getFeaturedEvents } from '../../helpers/api-utils'
import { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'
import Comments from '../../components/input/comments'
import Head from 'next/head'

export default function EventDetailPage(props) {
    const { event } = props

    if (!event) {
        return (
            <Fragment>
                <Head>
                    <title>No Event Fount</title>
                    <meta name="description" content="The evebt was not found"/>
                </Head>
                <ErrorAlert>
                    <p>No event found</p>
                </ErrorAlert>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description}/>
            </Head>
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
            <Comments eventId={event.id}/>
        </Fragment>
    )
}

export async function getStaticProps(context) {

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
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const featuredEvents = await getFeaturedEvents()
    const paths = featuredEvents.map(event => {
        return { params: { eventId: event.id } }
    })

    return { paths, fallback: 'blocking' }
}