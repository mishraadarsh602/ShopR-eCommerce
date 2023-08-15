import { useEffect, useState } from "react"
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import Pagination from "../../common/Pagination";

const AdminOrders = () => {
    const [page, setPage] = useState(1);

    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const dispatch = useDispatch();
    const [sort, setSort] = useState({});
    const handleShow = () => {
        console.log("show")
    }
    const handleEdit = (order) => {
        // console.log("edit")
        setEditableOrderId(order.id);
    }
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);

    }
    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        console.log("sort", sort)
        setSort(sort);
    }
    const handlePage = (page) => {
        setPage(page);

    }

    const chooseColor = (status) => {
        switch (status) {
            case "pending":
                return 'bg-purple-400 text-purple-600';
            case "dispatched":
                return 'bg-yellow-400 text-yellow-600';
            case "delivered":
                return 'bg-green-400 text-green-600';
            case "cancelled":
                return 'bg-red-400 text-red-600';

        }

    }

    useEffect(() => {
        const pagination = {
            _page: page,
            _limit: ITEMS_PER_PAGE
        };
        console.log("pagination1", pagination)
        dispatch(fetchAllOrdersAsync({ sort, pagination }))
    }, [dispatch, page, sort])


    return (
        <div>
            <div className="overflow-x-auto">
                <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left"
                                            onClick={e => handleSort({
                                                sort: 'id',
                                                order: sort?._order === 'asc' ? 'desc' : 'asc'
                                            })
                                            }>Order#
                                            {sort._sort === 'id' && sort._order === 'asc' ?
                                                <ArrowUpIcon className="w-4 h-4 inline" /> :
                                                <ArrowDownIcon className="w-4 h-4 inline" />}
                                        </th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-left"
                                            onClick={e => handleSort({
                                                sort: 'totalAmount',
                                                order: sort?._order === 'asc' ? 'desc' : 'asc'
                                            })
                                            }>Total Amount
                                            {sort._sort === 'totalAmount' && sort._order === 'asc' ?
                                                <ArrowUpIcon className="w-4 h-4 inline" /> :
                                                <ArrowDownIcon className="w-4 h-4 inline" />}
                                        </th>                                        <th className="py-3 px-6 text-center">Shipping Address</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map(order =>
                                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">

                                                </div>
                                                <span className="font-medium">{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.items && order.items.map(item =>
                                                <div key={item.id} className="flex items-center">
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.thumbnail}
                                                        />
                                                    </div>
                                                    <span>{item.title} - #{item.quantity} - ${discountedPrice(item)}</span>
                                                </div>)}

                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                <span className="font-medium">{order.totalAmount}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 ">
                                            <div className="">
                                                <div className="font-medium">{order.selectedAddress.name}</div>
                                                <div className="font-medium">{order.selectedAddress.street}</div>
                                                <div className="font-medium">{order.selectedAddress.city}</div>
                                                <div className="font-medium">{order.selectedAddress.state}</div>
                                                <div className="font-medium">{order.selectedAddress.pinCode}</div>
                                                <div className="font-medium">{order.selectedAddress.phone}</div>


                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {order.id === editableOrderId ?
                                                <select onChange={(e) => handleUpdate(e, order)}>

                                                    <option value="pending">Pending </option>
                                                    <option value="dispatched">Dispatched </option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>

                                                </select> : <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                                                    {order.status}
                                                </span>}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <EyeIcon onClick={() => handleShow(order)} />
                                                </div>
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <PencilIcon onClick={() => handleEdit(order)} />
                                                </div>
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    {/* <DeleteIcon/> */}

                                                </div>
                                            </div>
                                        </td>
                                    </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination totalItems={totalOrders} page={page} setPage={setPage} handlePage={handlePage} />
                {page}
            </div>

        </div>
    )
}

export default AdminOrders