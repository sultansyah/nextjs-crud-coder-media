import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { Contact } from "@prisma/client";

export const getContacts = async (): Promise<Contact[]> => {
    try {
        logger.info("fetching all contact");
        const contacts = await prisma.contact.findMany();
        return contacts;
    } catch (error) {
        logger.error(`Error fetching all contact: ${(error as Error).message}`);
        throw new Error("Failed to fetch contact data");
    }
};

export const getContactById = async (id: string): Promise<Contact | null> => {
    try {
        logger.info(`Fetching contact with id: ${id}`);

        const contact = await prisma.contact.findUnique({
            where: { id },
        });
        if (!contact) {
            logger.warn(`Contact not found for id: ${id}`);
            return null
        }

        logger.info(`Contact found: ${contact.name} (${contact.id})`);
        return contact;
    } catch (error) {
        logger.error(
            `Error fetching contact with id ${id}: ${(error as Error).message}`
        );
        throw new Error("Failed to fetch contact data");
    }
};
