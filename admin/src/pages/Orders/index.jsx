import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
// import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import '../styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
// import RefundedIcon from '../../assets/icons/refunded.svg';
import axios from '../../constants/axios';
import { userDetails } from '../../constants/urls';
import { baseUrl } from '../../constants/urls';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { userBlock, userDelete } from '../../constants/urls';

function Orders () {
    // const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    // const [orders, setOrders] = useState(all_orders);
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const base = baseUrl

    const fetchUsers = async () => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'))
        const access = authTokens?.access;
        const response = await axios.get(userDetails,{
            headers: { "Authorization": `Bearer ${access}`},
        });
        return response.data;
    }

    useEffect(() => {
        async function fetchData() {
          const users = await fetchUsers();
          setUsers(users);
          setAllUsers(users)
          setPagination(calculateRange(users, 5));
          setUsers(sliceData(users, page, 5));
        }
    
        fetchData();
      }, [page, isMounted]);

    useEffect(() => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'))
      
        if (authTokens && !isMounted) { 
            setIsMounted(true);

            const access = authTokens.access;
      
          axios
            .get(userDetails, {
              headers: { "Authorization": `Bearer ${access}`},
            })
            .then((response) => {
              setUsers(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              console.log("error",error);
            });
        }
      }, []);


    const __handleSearch = (event) => {
        const searchQuery = event.target.value;
        if (searchQuery !== ''){
            setSearchQuery(searchQuery);
            const filteredUsers = allUsers.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setUsers(filteredUsers);
        }
        else{
            setSearchQuery(searchQuery);
            setIsMounted(!isMounted)
        }
      };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setUsers(sliceData(allUsers, new_page, 5));
    }

    //block||unblock
    const handleBlock = (userId) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'))
            const access = authTokens.access;
            const url = `${userBlock}${userId}`
            axios
            .get(url, {
              headers: { "Authorization": `Bearer ${access}`},
            })
            .then((response) => {
            //   setUsers(response.data);
              setIsMounted(!isMounted)
            })
            .catch((error) => {
              console.log("error",error);
            });

          }
        });
      };

      //Delete User
    const handleDelete = (userId) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'))
            const access = authTokens.access;
            const url = `${userDelete}${userId}`
            axios
            .get(url, {
              headers: { "Authorization": `Bearer ${access}`},
            })
            .then((response) => {
              setIsMounted(!isMounted)
            })
            .catch((error) => {
              console.log("error",error);
            });

          }
        });
      };

    return(
        <div className='dashboard-content'>
            <DashboardHeader/>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Users List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={searchQuery}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={__handleSearch} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>USERANAME</th>
                        <th>EMAIL</th>
                        <th>UPDATE</th>
                        <th>DELETE</th>
                    </thead>

                    {users.length !== 0 ?
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div>
                                            <span>{user.username}</span>
                                        </div>
                                    </td>
                                    <td><span>{user.email}</span></td>
                                    <td><span><Link to={`/dashboard/update/${user.id}`} className="update-button">Update</Link></span></td>
                                    <td><span><button className='block-button' onClick={() => handleDelete(user.id)}>DELETE</button></span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {users.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((user) => (
                            <span 
                                key={user.id} 
                                className={user === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(user)}>
                                    {user}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Orders;