export const dateFromDateTime = ( _date ) =>
    {
    return( _date.toISOString().split("T")[0] )
    }
