import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'

import { useRouter } from 'next/router';
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import SearchInput from '../../components/search-input'
import UserList from '../../components/user-list'
import UserItem from '../../components/user-list/user-item'
import { Spinner } from '../../components/icons'
import Panginations from '../../components/pangination'
function UsersPage() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(null)
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    var request = {
      params: {
        page: router.query.pagee ? router.query.pagee : 1,
        size: 1
      }
    }
    if (searchTerm === null) {
      const fetchUser = async () => {
        const { data } = await publicFetch.get('/users',request)
        setUsers(data.user)
        setTotalPage(data.pageNum)  
        setCurrentPage(data.currentPage)
       
      }

      fetchUser()
    } else {
      const delayDebounceFn = setTimeout(async () => {
        setLoading(true)
        const { data } = await publicFetch.get(
          searchTerm ? `/users/${searchTerm}` : `/users`
        )
        setUsers(data)
        setLoading(false)
      }, 500)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [searchTerm,router.query.pagee])

  return (
    <Layout extra={false}>
      <Head>
        <title>Users - Clone of Stackoverflow</title>
      </Head>

      <PageTitle title="Users" borderBottom={false} />

      <SearchInput
        placeholder="Search by user"
        isLoading={loading}
        autoFocus
        autoComplete="off"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!users && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {users && (
        <>
          <UserList>
            {users?.map(({ username, profilePhoto, created, id }) => (
              <UserItem
                key={id}
                username={username}
                profilePhoto={profilePhoto}
                created={created}
              />
            ))}
          </UserList>

          {users.length == 0 && (
            <p className="not-found">No users matched your search.</p>
          )}
        </>
      )}
        <Panginations currentPage={currentPage} totalPage={totalPage} />
    </Layout>
  )
}

export default UsersPage
