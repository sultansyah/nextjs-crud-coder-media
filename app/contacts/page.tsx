import Search from "@/components/search"
import { CreateButton } from "@/components/buttons"
import ContactTableServer from "@/components/contact-table-server"

const Contacts = ({
    searchParams
}: {
    searchParams?: {
        query?: string,
        page?: string
    }
}) => {
    const query = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1

    return (
        <div className="max-w-screen-md mx-auto mt-5">
            <div className="flex items-center justify-between gap-1 mb-5">
                <Search />
                <CreateButton />
            </div>
            <ContactTableServer query={query} currentPage={currentPage} />
        </div>
    )
}

export default Contacts