import Link from 'next/link';
import styles from './Register.module.scss'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router';
// import express from 'express';

const RegisterView = () => {
    // const app = express();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push } = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement;
        const data = {
            email: form.email.value,
            fullname: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value,
            role: form.letter.value
        };

        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
    // const lala = app.post('/auth/register', (req, res) => {
    //     req.body = data
      
    //     // Save the data of user that was sent by the client
      
    //     // Send a response to client that will show that the request was successfull.
    //     res.send({
    //       message: 'New user was added to the list',
    //     });
    //   });
        console.log("ini isinya apa?", result)
        //console.log("ini isinya apa?2", lala)
        if (result.status === 200) {
            setIsLoading(false);
            form.reset();
            push('/auth/login');
        } else {
            setIsLoading(false);
            setError('ngga boleh pake email yang sama cuy');
        }
    }
        return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                   <div className={styles.register__form__item}>
                        <label htmlFor="email">email</label>
                        <input 
                        name="email" 
                        id="email" 
                        type="email" 
                        className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname">Fullname</label>
                        <input 
                        name="fullname" 
                        id="fullname" type="text" 
                        className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="phone">phone</label>
                        <input 
                        name="phone" 
                        id="phone" 
                        type="text" 
                        className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="letter">role</label>
                        <input 
                        name="letter" 
                        id="letter" 
                        type="text" 
                        className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password">password</label>
                        <input 
                        name="password" 
                        id="password" 
                        type="password" 
                        className={styles.register__form__item__input} />
                    </div>
                    <button disabled={isLoading} type="submit" className={styles.register__form__button}>Register</button>
                </form>
            </div>
            <p className={styles.register__link}>udah punya akun? login lewat <Link href="/auth/login">sini!!</Link></p>
        </div>
    )
}

export default RegisterView; 