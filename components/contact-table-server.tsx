import { getContacts } from "@/lib/data"
import ContactTableClient from "./contact-table-client"

const ContactTableServer = async () => {
    const contacts = await getContacts()
    return <ContactTableClient contacts={contacts} />
}

export default ContactTableServer