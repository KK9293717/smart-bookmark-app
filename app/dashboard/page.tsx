'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {

  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchBookmarks()
      subscribeRealtime()
    }
  }, [user])

  async function getUser() {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
  }

  async function fetchBookmarks() {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  function subscribeRealtime() {
    supabase
      .channel('bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks'
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()
  }

  async function addBookmark() {

    if (!title || !url) return

    await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id
    })

    setTitle('')
    setUrl('')
  }

  async function deleteBookmark(id: string) {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">

      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-center mb-4">
          Smart Bookmark Dashboard
        </h1>

        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">Logged in as</p>
          <p className="font-medium">{user?.email}</p>

          <button
            onClick={logout}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-2">
          Add New Bookmark
        </h2>

        <input
          type="text"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          type="text"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />

        <button
          onClick={addBookmark}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
        >
          Add Bookmark
        </button>

        <h2 className="text-lg font-semibold mb-2">
          Your Bookmarks
        </h2>

        {bookmarks.length === 0 && (
          <p className="text-gray-500">No bookmarks yet</p>
        )}

        {bookmarks.map((bookmark) => (

          <div
            key={bookmark.id}
            className="border p-3 rounded mb-3"
          >

            <p className="font-semibold">
              Title: {bookmark.title}
            </p>

            <a
              href={bookmark.url}
              target="_blank"
              className="text-blue-600 underline"
            >
              {bookmark.url}
            </a>

            <div>
              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}
