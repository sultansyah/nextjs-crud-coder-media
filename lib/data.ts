import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { Contact } from "@prisma/client";

const ITEMS_PER_PAGE = 5;

export const getContacts = async (
    query: string,
    currentPage: number
): Promise<Contact[]> => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        logger.info("fetching all contact");

        const contacts = await prisma.contact.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        phone: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
        });
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
            return null;
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


export const getContactsPages = async (
    query: string
): Promise<number> => {
    try {
        logger.info("fetching contact pages");
        const contacts = await prisma.contact.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        phone: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
        });

        const totalPages = Math.ceil(Number(contacts)/ITEMS_PER_PAGE)
        return totalPages;
    } catch (error) {
        logger.error(`Error fetching contact pages: ${(error as Error).message}`);
        throw new Error("Failed to fetch contact pages");
    }
};