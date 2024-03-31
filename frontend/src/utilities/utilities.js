export const getTomorrowDate = () =>
    {
    let curr = new Date()
    let next = new Date( curr )

    next.setDate( next.getDate() + 1 )

    return( next )
    }