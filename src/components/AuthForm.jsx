import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import styles from './AuthForm.module.scss'

const AuthForm = () => {
    const [mode, setMode] = useState('signIn')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const { signIn, signOut, loading } = useAuthStore() :: 시스템 성능 저하
    const signIn = useAuthStore((state) => state.signIn)
    const signUp = useAuthStore((state) => state.signUp)
    const loading = useAuthStore((state) => state.loading)
    const error = useAuthStore((state) => state.error)

    const isSignIn = mode === 'signIn'

    const submitAuth = async(e) => {
        e.preventDefault()

        if(email.trim() === '' || password.trim() === ''){
            alert('이메일과 비밀번호를 입력해주세요')
            return
        }

        try{
            if(isSignIn){
                await signIn({email, password})
            }else{
                await signUp({email, password})
            }
        }catch(error){
            alert(error.message)
        }
    }
  return (
    <div className={styles.authCard}>
        <h2 className={styles.authTitle}>{isSignIn ? '로그인' : '회원가입'}</h2>
        <p className={styles.authDescription}>
          {isSignIn ? '계정으로 로그인 해주세요.' : '새 계정을 만들려면 아래 정보를 입력하세요.'}
        </p>
        <form onSubmit={submitAuth} className={styles.formGroup}>
            <label className={styles.label}>
                이메일
                <input className={styles.input} type='email' placeholder='example@domain.com'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </label>
            <label className={styles.label}>
                비밀번호
                <input className={styles.input} type='password' placeholder='8자 이상 입력'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </label>
            <button className={styles.submitButton} type='submit' disabled={loading}>
                {loading ? "처리중..." : isSignIn ? "로그인" : "회원가입"}
            </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.toggleArea}>
            <span className={styles.toggleLabel}>
              {isSignIn ? '처음 오셨나요?' : '이미 계정이 있으신가요?'}
            </span>
            <button type='button' className={styles.toggleButton} onClick={()=>setMode(isSignIn ? 'signUp' : 'signIn')}>
              {isSignIn ? "회원가입하기" : "로그인하기"}
            </button>
        </div>
    </div>
  )
}

export default AuthForm