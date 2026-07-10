import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePostStore from '../store/postStore'
import styles from './Detail.module.scss'

const Detail = () => { 
   const { id } = useParams()  // { id : id, img : img1 }  const aa =  useParams() , const id = aa.id
   const posts = usePostStore((state) => state.posts)
   const updatePost = usePostStore((state) => state.updatePost)
   const post = posts.find((item)=>{
            return item.id === Number(id)
   })

   // 수정모드
   const [isEdit, setIsEdit] = useState(false)
   const [title, setTitle] = useState( post ? post.title : '' )
   const [writer, setWriter] = useState( post ? post.writer : '' )
   const [content, setContent] = useState( post ? post.content : '' )

   // 수정한 내용을 저장하는 버튼
   const updatefunc = () => {
      if(title.trim() === '' || writer.trim() === '' || content.trim() === ''){
        alert('모든 내용을 다 입력하셔야 합니다')
        return
      }
      // // 수정 함수 사용
      // const updata = {
      //   id : post.id,
      //   title : title,
      //   writer : writer,
      //   content : content
      // }
      // updatePost(updata)

      updatePost({
          id : post.id,
          title : title,
          writer : writer,
          content : content 
      })
      setIsEdit(false)
   }

   if(!post){
     return (
        <div>
            <h2>게시글이 없습니다</h2>
            <Link to='/'>목록으로</Link>
        </div>
     )
   }

   
  return (
    <div className={styles.detailBox}>
        <h2>게시글 상세보기</h2>
        <hr />
        {
            isEdit ? (
                // 수정모드 일때
                <>
                  <p><strong>번호 : </strong>{post.id}</p>
                  <input type="text" value={title} onChange={(e)=>{
                    setTitle(e.target.value)
                  }}/>
                  <input type="text" value={writer} onChange={(e)=>{
                    setWriter(e.target.value)
                  }}/>
                  <textarea type="text" value={content} onChange={(e)=>{
                    setContent(e.target.value)
                  }}/>
                  <br/><br/>
                  <button onClick={updatefunc}>저장</button>
                  <button onClick={
                    ()=>{
                      setTitle(post.title)
                      setWriter(post.writer)
                      setContent(post.content)
                      setIsEdit(false)
                    }
                  }>취소</button>
                </>
            ) : (
                // 읽기모드 일때
                <>
                   <p>
                     <strong> 번호 </strong> : {post.id}
                   </p>
                    <p>
                     <strong> 제목 </strong> : {post.title}
                   </p>
                   <p>
                     <strong> 작성자 </strong> : {post.writer}
                   </p>
                   <p>
                     <strong> 내용 </strong> 
                   </p> 
                   <div className={styles.postContent}>{post.content}</div>         

                   <br /><br />
                    <button onClick={ () =>{
                        setIsEdit(true)
                    }}>수정</button>
                    <Link className={styles.toList} to='/'>목록으로</Link>
                </>
            )
        }
    </div>
  )
}

export default Detail
