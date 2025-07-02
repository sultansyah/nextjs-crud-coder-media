import { getContacts } from "@/lib/data"
import ContactTableClient from "./contact-table-client"

const ContactTableServer = async ({ query, currentPage }: { query: string, currentPage: Number }) => {
    const contacts = await getContacts(query, currentPage)
    return <ContactTableClient contacts={contacts} />
}

export default ContactTableServer