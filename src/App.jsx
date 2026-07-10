import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuthStore from './store/authStore'
import Board from './pages/Board'
import Detail from './pages/Detail'
import Counter from './count/Counter'
import ResetCounter from './count/ResetCounter'
import AuthForm from './components/AuthForm'
import styles from './App.module.scss'

const App = () => {
  const user = useAuthStore((state) => state.user)
  const initialized = useAuthStore((state) => state.initialized)
  const listenAuthState = useAuthStore((state) => state.listenAuthState)
  const signOut = useAuthStore((state) => (state.signOut))

  useEffect(() => {
    const unsubscribe = listenAuthState()

    // firebase 실시간 감지를 정리
    return unsubscribe
  }, [listenAuthState])

  
  const [posts, setPosts] = useState([
    { id : 2, title : "두번째 글", writer : "관리자", content : "두번째 글입니다"},
    { id : 1, title : "CRUD 게시 첫번째 글", writer : "관리자", content : "상세보기, 수정, 삭제 기능이 있습니다"},        
  ])

  // 글쓰기(Create)
  const addPost = (newPost) => {
     // 현재 가장 큰 값을 가진 id 보다 1 큰값을 새로운 id로 사용한다
     const nextId = 
     posts.length === 0 ? 1 
     : Math.max(...posts.map( (item) => item.id) ) + 1

     // 새 글이 목록(posts)에 가장 위에 보이도록 배열 앞쪽에 추가한다
     // setPosts([ {나머지 새로운 값들, 새로운아이디 }, 기존에 있는 배열])
     setPosts([ { ...newPost, id:nextId }, ...posts])
  }

  // 글삭제(Delete)
  const deletePost = (id) => {
    // 전달받은 id와 기존의 목록의 id가 다른 게시글만 남겨서 삭제한다.
     const newPost = posts.filter( (item) => {
         return item.id !== id
     })

    setPosts(newPost)
  }

  // 글 수정(Update)
  const updatePost = (updatePost) => {
      // 수정된 내용의 게시글을 객체로 받아서(updatePost) id가 같은 게시글을 수정한다.
      const newPosts = posts.map( (item)=>{
          if(item.id === updatePost.id){
             return updatePost
          }
          return item
      })

      setPosts(newPosts)
  }

  return (
    <div>
      <header>
      {
        user ? (
          <>
            <p>{user.email}</p>
            <button onClick={signOut}>로그아웃</button>
            <AuthForm />
          </>
        ) : initialized ? (
          <AuthForm />
        ) : (
          <p>로그인 상태 확인 중</p>
        )
      }
      </header>
      <Routes>
         <Route path='/' element={<Board />} />
         <Route path='/detail/:id' element={ <Detail posts={posts} updatePost={updatePost}  />} />    
      </Routes>
      <Counter />
      <ResetCounter />
    </div>
  )

  
}

export default App

// react 배열 데이터를 활용하여 게시판을 만듬
// CRUD 기능을 구현
// Create :: 생성(글쓰기)
// Read :: 읽기( 글목록 상세보기)
// Update :: 수정(글 수정)
// Delete :: 삭제(글 삭제)

// 게시글 하나는 객체로 만든다
// { id : 1, title : "첫번째 글", writer : "홍길동", content : "지금 첫번째 글을 작성중이다"}
// 게시글 목록은 배열로 만든다
// [
//    { id : 1, title : "첫번째 글", writer : "홍길동", content : "지금 첫번째 글을 작성중이다"},
//    { id : 2, title : "두번째 글", writer : "이순신", content : "지금 두번째 글을 작성중이다"},
// ]
