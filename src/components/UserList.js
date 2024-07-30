import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from './UserCard';
import Filters from './Filters';
import './UserList.css';

const UserList = () => {
  // for storing user data
  const [users, setUsers] = useState([]);
  // state for paging
  const [page, setPage] = useState(0);
  // to check for more users
  const [hasMore, setHasMore] = useState(true);
  // for sorting
  const [sort, setSort] = useState({ field: 'id', order: 'asc' });
  // for filters
  const [filters, setFilters] = useState({ gender: '', country: '' });

  // fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users', {
        params: {
          limit: 10,
          skip: page * 10,
        },
      });

      const newUsers = response.data.users;
      // Append new users to existing users
      setUsers(prevUsers => [...prevUsers, ...newUsers]);
      // hasMore false if no more users to load
      setHasMore(newUsers.length > 0);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  },); 

  // fetch more data for infinite scroll
  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  // handle sorting
  const handleSort = (field) => {
    const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ field, order });
  };

  // apply filters
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setUsers([]);
    setPage(0);
  };

  // sort users
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sort.field] < b[sort.field]) return sort.order === 'asc' ? -1 : 1;
    if (a[sort.field] > b[sort.field]) return sort.order === 'asc' ? 1 : -1;
    return 0;
  });

  // filter users
  const filteredUsers = sortedUsers.filter(user => {
    return (
      (!filters.gender || user.gender === filters.gender) &&
      (!filters.country || user.location?.country === filters.country)
    );
  });

  return (
    <div>
      <Filters applyFilters={applyFilters} />
      <div className="table-container">
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <table className="user-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className={sort.field === 'id' ? `sort-${sort.order}` : ''}>ID</th>
                <th>Image</th>
                <th onClick={() => handleSort('name')} className={sort.field === 'name' ? `sort-${sort.order}` : ''}>Full Name</th>
                <th onClick={() => handleSort('age')} className={sort.field === 'age' ? `sort-${sort.order}` : ''}>Demography</th>
                <th>Designation</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default UserList;
