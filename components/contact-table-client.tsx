"use client";

import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/buttons";
import { Contact } from "@prisma/client";
import { deleteContact } from "@/lib/action";
import { useActionState } from "react";
import React from "react";

const ContactTableClient = ({ contacts }: { contacts: Contact[] }) => {
    const [stateDelete, formActionDelete] = useActionState(deleteContact, null)

    return (
        <table className="w-full text-sm text-left text-grey-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="py-3 px-6">#</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Phone Number</th>
                    <th className="py-3 px-6">Created At</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {contacts.map((contact: Contact, index: number) => (
                    <React.Fragment key={contact.id}>
                        <tr className="bg-white border-b">
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6">{contact.name}</td>
                            <td className="py-3 px-6">{contact.phone}</td>
                            <td className="py-3 px-6">{formatDate(contact.createdAt.toString())}</td>
                            <td className="flex justify-center gap-1 py-3">
                                <EditButton id={contact.id} />
                                <DeleteButton id={contact.id} formAction={formActionDelete} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <div id="contact-error" aria-live="polite">
                                    <p className="text-red-500">
                                        {stateDelete?.error?.id ?? stateDelete?.error?.contact}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default ContactTableClient