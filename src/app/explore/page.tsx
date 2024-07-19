'use client'
import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { PostType } from '@/types/types'
import React, { useState } from 'react'
import axios from 'axios'
import PostCard from '@/components/PostCard'

const Explore = () => {

  const [search, setSearch] = useState<string>('');
  const [posts, setPosts] = useState<Array<PostType>>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false)

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setPosts([]);
    setNotFound(false)
    if (search.length > 0) {
      setLoading(true)
      axios.get(`/api/post/search?query=${search}`)
        .then(res => {
          const response = res.data;
          setLoading(false);
          if (response.status === 200) {
            if (response.data.length > 0) {
              setPosts(response.data);
            }
            else {
              setNotFound(true)
            }
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err)
        })
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="flex justify-center items-center mt-10 flex-col">
          <form onSubmit={submit}>
            <Input
              type='text'
              placeholder='Search by title'
              className='w-full lg:w-[700px] h-16 rounded-lg text-2xl'
              onChange={e => setSearch(e.target.value)}
            />
          </form>

          {
            loading && <h1 className='text-2xl text-orange-300 font-bold'>Loading...</h1>
          }

          {
            notFound && <h1 className='text-2xl text-red-400 font-bold'>No record found.</h1>
          }

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {
              posts.map((item: PostType) => (
                <PostCard post={item} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore
