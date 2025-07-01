export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short"
    })

    return formatter.format(date)
}