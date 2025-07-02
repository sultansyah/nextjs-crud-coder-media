import Search from "@/components/search"
import { CreateButton } from "@/components/buttons"
import Pagination from "@/components/pagination"
import ContactTableServer from "@/components/contact-table-server"
import { getContactsPages } from "@/lib/data"
import { TableSkelaton } from "@/components/skelaton"
import { Suspense } from "react"

const Contacts = async ({
    searchParams
}: {
    searchParams?: {
        query?: string,
        page?: string
    }
}) => {
    const query = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1

    const totalPages = await getContactsPages(query)

    return (
        <div className="max-w-screen-md mx-auto mt-5">
            <div className="flex items-center justify-between gap-1 mb-5">
                <Search />
                <CreateButton />
            </div>
            <Suspense key={query + currentPage} fallback={<TableSkelaton />}>
                <ContactTableServer query={query} currentPage={currentPage} />
            </Suspense>
            <div className="flex justify-center mt-4">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}

export default Contacts