import { getAllEvents } from "../../dummy-data"
import EventList from "../../components/events/event-list";
export default function AllEventsPage() {

const allEvents = getAllEvents();

    return (
        <div>
            <EventList items={allEvents}/>
        </div>
    )
}