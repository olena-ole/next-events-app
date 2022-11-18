import Link from 'next/link'

export default function AllEventsPage() {

    const data = [
        {id: '1', name: 'Easter', year: 2021, featured: false},
        {id: '2', name: 'Christmas', year: 2023, featured: false}
    ]

    return (
        <div>
            <h1>All Events</h1>
            <ul>
                {data.map(event => (
                    <li key={event.id}>
                        <Link href={`/events/${event.id}`}>
                            <h3>{event.name}</h3>
                        </Link>
                        <p>Year: {event.year}</p>
                        <button>{event.featured ? 'Remove From Favorites' : 'To Favorites'}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}