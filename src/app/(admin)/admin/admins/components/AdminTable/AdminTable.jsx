import AdminItemTable from "../AdminItemTable/AdminItemTable";
const headers = [
    { id: 1, title: "Nombre" },
    { id: 2, title: "Correo" },
    { id: 3, title: "Tipo" },
    { id: 4, title: "Acciones" },
];

function AdminTable({ data }) {
    return (
        <section className="flex flex-col mt-6 px-4 sm:px-6 md:px-0">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 overflow-x-scroll">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="min-h-[350px] border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr className="w-full">
                                    {headers.map((item) => (
                                        <th
                                            scope="col"
                                            key={item.id}
                                            className={`py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-300 ${item.title === 'Acciones' && 'text-center'}`}>
                                            {item.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 ">
                                {data.map((item) => (
                                    <AdminItemTable data={item} key={item.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminTable;
