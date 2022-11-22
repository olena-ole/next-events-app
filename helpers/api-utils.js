export async function getAllEvents() {
    const res = await fetch('https://next-course-data-fetchin-aa929-default-rtdb.firebaseio.com/events.json')
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

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
    return allEvents.filter((event) => event.isFeatured);
}