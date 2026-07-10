import { create } from 'zustand'
import { updatePostInFirestore,
         deletePostFromFirestore,
         addPostToFirestore,
         fetchPostsFormFirestores
         } from '../services/fireStorePosts'

const getPostErrorMessage = (error) => {
    if(error.code === 'permission-denied'){
        return '게시글 목록을 읽을 권한이 없습니다'
    }

    return error
}

const usePostStore = create((set)=>({
    posts : [],
    loading : false,
    error : '',

    // 게시글 목록 최신순으로 가져옴
    fetchPosts : async() => {
        set({loading : true, error : ''})

        try{
            const po = await fetchPostsFormFirestores()
            set({posts, loading : false})
        }catch(error){
            set({error : getPostErrorMessage(error), loading : false})
        }
    },
    addPost : async(newPost) => {
        // set()함수는 수정하는 함수이다. state는 수정하기 전의 상태
        set({loading : true, error : ''})

        try{
            const aPost = await addPostToFirestore(newPost)
            set((state) => ({
                posts : [aPost, ...state.posts],
                loading : false,
            }))
        }catch(error){
            set({error : getPostErrorMessage(error), loading : false})
            throw error
        }
    },

    // 게시글 삭제
    deletePost : async(id) => {
        set({loading : true, error : ''})
        try{
            await deletePostFromFirestore(id)
            set((state) => ({
                posts : state.posts.filter((item) => item.id !== id),
                loading : false
            }))
        }catch(error){
            set({error : getPostErrorMessage(error), loading : false})
            throw error
        }
        set((state)=>({
                posts : state.posts.filter((item)=> item.id !== id )
        }))
    },

    // 게시글 수정
    updatePost : async(updatePost)=>{
        set({loading : true, error : ''})

        try{
            const savePost = await updatePostInFirestore(updatePost)
            set((state) => ({
                posts : state.posts.map((item) => (item.id === savePost.id ? savePost : item)),
                loading : false
            }))
        }catch(error){
            set({error : getPostErrorMessage(error), loading : false})
            throw error
        }
    }
}))

export default usePostStore
/*
    zustand :: 전역(모든 컴포넌트) 상태(state)를 관리하는 라이브러리
    유사 라이브러리 ::
    - Redux Toolkit(RTK) : 대형 프로젝트에서 사용됨
    단점 : 학습하기 매우 어려움
    - Context API : 소형프로젝트에서 사용됨
    하나의 컴퍼넌트에서 상태관리
    const [count, setCount] = useState(0)
    setCount(10);
    <h1>{count}</h1>

    전체 컴퍼넌트 관리(zustand)
    초기설정
    const useStore = create((set)=>{
        count : 0
        str : ''
    })
    값 수정
    set({
        count : 10
        str : '안녕하세요'
    })
    값 사용
    const count = useStore((state)=>state.count)
    const str = useStore((state)=>state.str)

    <h1>{count}</h1>
    <h2>{str}</h2>
*/