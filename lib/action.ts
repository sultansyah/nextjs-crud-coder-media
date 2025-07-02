"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

const ContactSchema = z.object({
    name: z.string().min(6),
    phone: z.string().min(11),
});

export const saveContact = async (prevState: any, formData: FormData) => {
    const validatedFields = ContactSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.contact.create({
            data: {
                name: validatedFields.data.name,
                phone: validatedFields.data.phone,
            },
        });
    } catch (error) {
        return {
            message: "Failed to create contact",
        };
    }

    revalidatePath("/contacts");
    redirect("/contacts");
};

export const updateContact = async (
    id: string,
    prevState: any,
    formData: FormData
) => {
    const validatedFields = ContactSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.contact.update({
            data: {
                name: validatedFields.data.name,
                phone: validatedFields.data.phone,
            },
            where: { id },
        });
    } catch (error) {
        return {
            message: "Failed to update contact",
        };
    }

    revalidatePath("/contacts");
    redirect("/contacts");
};

type DeleteContactResult = {
    error?: {
        id?: string[];
        contact?: string;
    };
    message?: string;
};

const DeleteContactSchema = z.object({
    id: z.string().cuid(),
});

export const deleteContact = async (
    prevState: DeleteContactResult | null,
    formData: FormData
): Promise<DeleteContactResult> => {
    const validatedFields = DeleteContactSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.contact.delete({
            where: { id: validatedFields.data.id },
        });

        revalidatePath("/contacts");

        return { message: "Contact deleted successfully" };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                // record not found
                return {
                    error: {
                        contact: "Contact not found. It may have been deleted already.",
                    },
                };
            }
        }
        
        return {
            error: { contact: "An unexpected error occurred while deleting." },
        };
    }
};
