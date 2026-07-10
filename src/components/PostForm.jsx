import React, {useState } from 'react'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'
import styles from './PostForm.module.scss'

const PostForm = () => {
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [content, setContent] = useState('')

    const user = useAuthStore((state) => state.user)
    const addPost = usePostStore((state) => state.addPost)
    const loading = useAuthStore((state) => state.loading)


    // 입력값을 확인후 새 게시글 데이터를 전송한다. (등록)
    const submitB = () => {

        if(!user){
            alert("로그인 후 글을 작성할 수 있습니다")
            return
        }
        // error 체크
        if(title.trim() === '' || writer.trim() === '' || content.trim() === ''){
            alert('모든 내용을 다 입력하셔야 합니다')
            return
        }
        try{
            const newPost = {
                title : title,
                writer : user.email,
                content : content,
                uid : user.uid        
            }
            //게시글 추가
            addPost(newPost)
        }catch(error){
            alert()
        }

        // 등록후 입력칸은 비워준다.
        setTitle('')
        setWriter('')
        setContent('')
    }
  return (
    <div className={styles.postBox}>
       <h3>게시글 작성</h3>
       <hr />
       <label className={styles.titleBox}>글 제목
         <input type='text' placeholder='제목입력' value={title}
            onChange={ (e)=>{
                setTitle(e.target.value)
            }} />
       </label>
       <label className={styles.writerBox}>작성자
         <input type='text' placeholder='작성자입력' value={writer}
            onChange={ (e)=>{
                setWriter(e.target.value)
            }} />
       </label>
       <label className={styles.contentBox}>글 내용
        <textarea type='text' placeholder='글내용입력' value={content}
         onChange={ (e)=>{
            setContent(e.target.value)
         }} />
       </label>
        <button onClick={submitB} disabled={loading}>
            {loading ? '등록중' : '등록'}
        </button>
    </div>
  )
}

export default PostForm
