import React from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import usePostStore from '../store/postStore'
import styles from './Board.module.scss'

const Board = (props) => {
  const addPost = usePostStore((state) => state.addPost)
  const posts = usePostStore((state) => state.posts)
  const deletePost = usePostStore((state) => state.deletePost)
  const updatePost = usePostStore((state) => state.updatePost)
  return (
    <main>
        <h2>React CRUD 게시판 </h2>
        {/* 새 게시글 입력 */}
        <PostForm addPost={addPost} />

        {/* 게시글 전체 목록 */}
        <PostList />
    </main>
  )
}

export default Board
