import { useEffect, useState } from 'react'
import { getUserInfo } from '../../api'
import Cookie from 'js-cookie'
import styles from './UserPage.module.css'

interface User {
    username: string
    email: string
}

export const UserPage = () => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        getUserInfo(Cookie.get('key')).then((resp) => {
            console.log(resp)
            setUser((prevUser) => (resp as User) || prevUser)
        })
    }, [])

    if (!user) {
        return <h2>Loading</h2>
    }

    return (
        <div className={styles.container}>
            <div className={styles['user-card']}>
                <img
                    src="/img/base-avatar.png"
                    alt={`Аватарка пользователя ${user.username}`}
                    className={styles.avatar}
                />
                <h2 className={styles.username}>{user.username}</h2>
                <h2>{user.email}</h2>
            </div>
        </div>
    )
}
