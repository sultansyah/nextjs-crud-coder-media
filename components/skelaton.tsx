import React from "react";

export const TableSkelaton = () => {
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

            <tbody className="animate-pulse">
                {Array.from({ length: 5 }).map((_,i) => (
                    <tr key={i} className="bg-white border-b border-gray-50">
                        <td className="py-3 px-6">
                            <div className="h-4 w-4 rounded bg-gray-100"></div>
                        </td>
                        <td className="py-3 px-6">
                            <div className="h-4 w-32 rounded bg-gray-100"></div>
                        </td>
                        <td className="py-3 px-6">
                            <div className="h-4 w-20 rounded bg-gray-100"></div>
                        </td>
                        <td className="py-3 px-6">
                            <div className="h-4 w-32 rounded bg-gray-100"></div>
                        </td>
                        <td className="flex justify-center gap-1 py-3">
                            <div className="h-7 w-7 rounded-sm bg-gray-100"></div>
                            <div className="h-7 w-7 rounded-sm bg-gray-100"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
