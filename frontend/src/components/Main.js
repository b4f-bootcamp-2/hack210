import React, { useState, useEffect } from 'react';
import './Main.css'
import { Link, useNavigate } from 'react-router-dom'


export default function Main() {

  let token = localStorage.getItem("token")
  const [condominio, setCondominio] = useState([])


  const navigate = useNavigate()

  function pagarFrac(idCond, idFrac) {
    fetch('/api/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({idCond: idCond, idFrac: idFrac})
            }).then(res => {
                // if (res.status == 201) {
                //     setWater(e => e + quant)
                //     return 
                // }
                return res.json()
            })
            .then(data => {  
              setCondominio(data)
            })
            .catch(error => console.log(error))
  }

  function removeCondo(idCondo) {
    fetch('/api/delCondo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({id: idCondo})
            }).then(res => {
                // if (res.status == 201) {
                //     setWater(e => e + quant)
                //     return 
                // }
                return res.json()
            })
            .then(data => {  
              setCondominio(data)
            })
            .catch(error => console.log(error))
  }

  function getCondo() {
    fetch('/api/getCondo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            }).then(res => {
                // if (res.status == 201) {
                //     setWater(e => e + quant)
                //     return 
                // }
                return res.json()
            })
            .then(data => {  
              setCondominio(data)
            })
            .catch(error => console.log(error))
  }
  
  useEffect(() => {
    getCondo()
  }, []);
  
  // const removeBtn = (i) => {
  //   let newCondo = condominio.filter(c => c.id !== id)
  //   setCondominio(newCondo)
  // }

  return (
    <div>
      <button className="add__main" onClick={() => navigate("/addCondo")}>Add Apartment</button>
      <div className="container__main">
        {condominio.map(e => 
        <li key={e.id}>
          <span>{e.address}</span>
          
          
          <button className="remove__main" onClick={() => removeCondo(e.id)}>Remove</button>
        
        </li>)}
      </div>
    </div>
  )
}
