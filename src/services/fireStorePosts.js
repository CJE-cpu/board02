import{
    addDoc,
    collection,
    deleteDoc,
    doc,
    setDoc,
    orderBy,
    query,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { data } from 'react-router-dom'
import { create } from 'zustand'

// 컬렉션 제공
const postsRef = collection(db, "posts")

// firebase가 가진 데이터를 react가 쓰기 쉬운 객체 형태로 변환
const mapDocumentToPost = (document) => {
    const data = document.data()
    return{
        id : document.id,
        title : data.title || '',
        writer : data.writer || '',
        content : data.content || '',
        uid : data.uid || '',
        createdAt : data.createdAt.toDate?.().toISOString?.(),
        updateAt : data.updateAt.toDate?.().toISOString?.(),
    }
}

// 게시글 목록 최신순으로 가져옴
export const fetchPostsFormFirestores = async() => {
    const postsQuery = query(postsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(postsQuery)

    return snapshot.docs.map()
}

// 새 게시글 추가
export const addPostToFirestore = async (post) => {
    const document = await addDoc(postsRef, {
        title : post.title,
        writer : post.writer,
        content : post.content,
        uid : post.uid,
        createdAt : serverTimestamp(),
        updateAt : serverTimestamp(),
    })
    return{
        id : document.id,
        ...post,
        createdAt : new Date().toISOString(),
        updateAt : new Date().toISOString(),
    }
}

// 선택한 게시글 삭제
export const deletePostFromFirestore = async(id) => {
    await deleteDoc(doc(db, 'posts', id))
}

// 선택한 게시글 수정
export const updatePostInFirestore = async(post) => {
    const postRef = doc(db, 'posts', post.id)

    await updateDoc(postRef, {
        title : post.title,
        content : post.content,
        updatedAt : serverTimestamp(),
    })

    return {
        ...post,
        updatedAt : new Date().toISOString(),

    }
}
import{
    addDoc,
    collection,
    deleteDoc,
    doc,
    setDocs,
    orderBy,
    query,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { data } from 'react-router-dom'
import { create } from 'zustand'

// 컬렉션 제공
const postsRef = collection(db, "posts")

// firebase가 가진 데이터를 react가 쓰기 쉬운 객체 형태로 변환
const mapDocumentToPost = (document) => {
    const data = document.data()
    return{
        id : document.id,
        title : data.title || '',
        writer : data.writer || '',
        content : data.content || '',
        uid : data.uid || '',
        createdAt : data.createdAt.toDate?.().toISOString?.(),
        updateAt : data.updateAt.toDate?.().toISOString?.(),
    }
}

// 게시글 목록 최신순으로 가져옴
export const fetchPostsFormFirestores = async() => {
    const postsQuery = query(postsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(postsQuery)

    return snapshot.docs.map()
}

// 새 게시글 추가
export const addPostToFirestore = async (post) => {
    const document = await addDoc(postsRef, {
        title : post.title,
        writer : post.writer,
        content : post.content,
        uid : post.uid,
        createdAt : serverTimestamp(),
        updateAt : serverTimestamp(),
    })
    return{
        id : document.id,
        ...post,
        createdAt : new Date().toISOString(),
        updateAt : new Date().toISOString(),
    }
}

// 선택한 게시글 삭제
export const deletePostFromFirestore = async(id) => {
    await deleteDoc(doc(db, 'posts', id))
}

// 선택한 게시글 수정
export const updatePostInFirestore = async(post) => {
    const postRef = doc(db, 'posts', post.id)

    await updateDoc(postRef, {
        title : post.title,
        content : post.content,
        updatedAt : serverTimestamp(),
    })

    return {
        ...post,
        updatedAt : new Date().toISOString(),

    }

}
