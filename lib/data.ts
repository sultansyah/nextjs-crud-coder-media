import {prisma} from "@/lib/prisma"
import { Contact } from "@/types/contacts";

export const getContacts = async (): Promise<Contact[]> => {
    try {
        const contacts = await prisma.contact.findMany();
        return contacts;
    } catch (error) {
        console.log(error);
        
        throw new Error('Failed to fetch contact data')
    }
}