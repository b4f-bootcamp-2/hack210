import React, { useEffect, useState } from 'react';
import styles from './Condominio.module.css'
import { Link, useNavigate } from 'react-router-dom'

export default function AddCondo() {
    
    const token = localStorage.getItem("token")
    console.log(token)

    const navigate = useNavigate()

    const [submit, setSubmit] = useState({
        address: "",
        floors: "",
        fractions: "",
        value: ""
    })

    const [render, setRender] = useState(false)
    
    function addressError(address) {
        if (address.length == 0) {
            return (<div className={styles.error}>
            <span>Please insert an address.</span>
        </div>)
        }
    }
    
    function floorsError(floors) {
        if (floors.length == 0) {
            return (<div className={styles.error}>
            <span>Please insert the number of floors.</span>
        </div>)
        }

        else if (isNaN(floors)) {
            return ((<div className={styles.error}>
            <span>Please insert a valid number of floors.</span>
        </div>))
        }

        else if (Number(floors) < 0) {
            return (<div className={styles.error}>
            <span>Please insert a valid number of floors.</span>
        </div>)
        }
    }

    function fractionsError(fractions) {
        if (fractions.length == 0) {
            return (<div className={styles.error}>
            <span>Please insert the number of fractions per floor.</span>
        </div>)
        }

        else if (isNaN(fractions)) {
            return ((<div className={styles.error}>
            <span>Please insert a valid number.</span>
        </div>))
        }

        else if (Number(fractions) < 0) {
            return (<div className={styles.error}>
            <span>Please insert a valid number.</span>
        </div>)
        }
    }

    function valueError(value) {
        if (value.length == 0) {
            return (<div className={styles.error}>
            <span>Please insert a value.</span>
        </div>)
        }

        else if (isNaN(value)) {
            return ((<div className={styles.error}>
            <span>Please insert a valid number.</span>
        </div>))
        }

        else if (Number(value) < 0) {
            return (<div className={styles.error}>
            <span>Please insert a valid number.</span>
        </div>)
        }
    }

    function handleSubmit(e) {
        
        e.preventDefault()
        
        if (!addressError(submit.address) && !floorsError(submit.floors) && !fractionsError(submit.fractions) && !valueError(submit.value)) {
            fetch('/api/addCondo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(submit)
            }).then(res => {
                if (res.status == 200) {
                    navigate("/home")
                }
                return
            })
            .catch(error => console.log(error))
        }
        else {
            setRender(true)
        }
    }
    
    return (
        <form className={styles.form} method="get" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.main}>
            <h1 className={styles.title}>Add condominium</h1>
            
            <div className={styles.field}>
                <label className={styles.section}>Address</label><br></br>
                <input 
                    placeholder="Rua Padre Alberto Neto 13"
                    className={styles.input}
                    type = "text"
                    value={submit.address}
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, address: e.target.value } })} 
                />
                {render ? addressError(submit.address) : <div className={styles.error}>󠀡󠀡</div>}
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Floors</label><br></br>
                <input 
                    placeholder="Number of floors"
                    className={styles.input}
                    type = "number"
                    value={submit.floors}
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, floors: e.target.value } })} 
                />
                {render ? floorsError(submit.floors) : <div className={styles.error}>󠀡󠀡</div>}
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Fractions per floor</label><br></br>
                <input 
                    placeholder="Number of fractions per floor"
                    className={styles.input}
                    type = "number"
                    value={submit.fractions}
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, fractions: e.target.value } })} 
                />
                {render ? fractionsError(submit.fractions) : <div className={styles.error}>󠀡󠀡</div>}
            </div>
            
            <div className={styles.field}>
                <label className={styles.section}>Value €</label><br></br>
                <input 
                    placeholder="€"
                    className={styles.input}
                    type = "number"
                    value={submit.value}
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, value: e.target.value } })}
                />
                {render ? valueError(submit.value) : <div className={styles.error}>󠀡󠀡</div>}
            </div>

            <button type='submit' className={styles.submit}>Guardar</button>
        </div>
    </form> 
    );
}
