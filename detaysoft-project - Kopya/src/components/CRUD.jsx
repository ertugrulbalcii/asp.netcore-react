import React, {useState,useEffect} from 'react'

import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';





function CRUD() {

    const empdata = [
        {
            id : 1,
            name : 'Yaren',
            age : 23,
            department : 'Frontend developer',
            isActive : 1
        },
        {
            id : 2,
            name : 'Yıldız',
            age : 25,
            department : 'Backend developer',
            isActive : 0
        },
        {
            id : 3,
            name : 'Pınar',
            age : 26,
            department : 'Fullstack developer',
            isActive : 1
        }

    ]

    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const [name,setName] = useState('')
    const [age,setAge] = useState('')
    const [department,setDepartment] = useState('')
    const [isActive,setIsActive] = useState(0)

    const [editId,setEdtId] = useState('')
    const [edtname,setEdtName] = useState('')
    const [edtage,setEdtAge] = useState('')
    const [edtdepartment,setEdtDepartment] = useState('')
    const [edtisActive,setEdtIsActive] = useState(0)

    const [data,setData] = useState([]);


    useEffect(() => {
        getData();
    },[])


    //ASP.NET CORE api işlemleri;
    const getData = () => {
        axios.get('https://localhost:5024/api/Employee')
        .then((result) => {
            setData(result.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleEdit = (id) => {
        //alert(id);
        handleShow();
        axios.get(`https://localhost:5024/api/Employee/${id}`)
        .then((result) => {
            setEdtId(id);
            setEdtName(result.data.name);
            setEdtAge(result.data.age);
            setEdtDepartment(result.data.department);
            setEdtIsActive(result.data.isActive);

        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (id) => {
        if(window.confirm(`${id} isimli çalışan silinecektir. Silmek isteiğinize emin misiniz? `) == true){
            axios.delete(`https://localhost:5024/api/Employee/${id}`)
            .then((result) => {
                if(result.status === 200)
                {
                    alert('Silme işlemi gerçekleştirildi.');
                    getData();
                }
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    const handleUpdate = () => {
        const url = `https://localhost:5024/api/Employee/${editId}`
        const data = {
            "id": editId,
            "name":edtname,
            "age": edtage,
            "department": edtdepartment,
            "isActive": edtisActive
        }
        axios.put(url,data)
        .then((result) => {
            handleClose();
            getData();
            clear();
            alert('güncelleme gerçekleşti.');
            
        })
        .catch((error) => {
            alert(error);
        })

    }

    const handleSave = () => {
        const url = 'https://localhost:5024/api/Employee';
        const data = {
            "name":name,
            "age": age,
            "department": department,
            "isActive": isActive
        }
        axios.post(url,data)
        .then((result) => {
            getData();
            clear();
            alert('kaydedildi.');
            
        })
        .catch((error) => {
            alert(error);
        })
       
    }

    const clear = () => {
        setName('');
        setAge('');
        setDepartment('');
        setIsActive('');
        setEdtId('');
        setEdtName('');
        setEdtAge('');
        setEdtDepartment('');
        setEdtIsActive('');
    }

    const handleActiveChange = (e) => {
        if(e.target.checked)
        {
            setIsActive(1);
        }
        else 
        {
            setIsActive(0);
        }
    }

    const handleEdtActiveChange = (e) => {
        if(e.target.checked)
        {
            setEdtIsActive(1);
        }
        else 
        {
            setEdtIsActive(0);
        }
    }


  return (
    <div>
      <Fragment>

      <div className="container mb-5">
            <div className="row">
                <div className="calisan_ekle_kisim">
                    <div className="col">
                        <h5 className='mb-4'><b>Çalışan Ekle:</b></h5>
                        <input type='text' placeholder='Ad soyad: ' className='form-control' value={name} onChange={(e) => setName(e.target.value)}/><br/>
                        <input type='text' placeholder='Yaş: ' className='form-control' value={age} onChange={(e) => setAge(e.target.value)}/><br/>
                        <input type='text' placeholder='Departman: ' className='form-control' value={department} onChange={(e) => setDepartment(e.target.value)}/><br/>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <label>Çalışma Durumu:</label>
                        </div>
                        <div className="col-1">
                            <input type='checkbox' checked={isActive === 1 ? true : false}  onChange={(e) => handleActiveChange(e)} value={isActive}/>   
                        </div>
                        <div className="col">
                            <button type='submit' className='btn btn-primary btn-sm' onClick={() => handleSave()}>Çalışan Ekle</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="table_kismi">
                    <Table striped bordered hover className='table_border'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Ad Soyad</th>
                            <th>Yaş</th>
                            <th>Departman</th>
                            <th>Çalışma Durumu</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ?
                                 data.map((item,index) => {
                                    return(
                                        <tr key={index}>
                                          <td>{index+1}</td>
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>{item.age}</td>
                                          <td>{item.department}</td>
                                          <td>{item.isActive}</td>
                                          <td colSpan={2}>
                                            <button className='btn btn-primary btn-sm btn_crud' onClick={() => handleEdit(item.id)}>Kaydet</button>
                                            <button className='btn btn-danger btn-sm btn_crud' onClick={() => handleDelete(`${item.name}`)}>Sil</button>
                                          </td>
                                        </tr>
                                    )
                                 }) 
                                 :
                                 'Yüleniyor lütfen bekleyiniz..'
                            }

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>


        

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Güncelle & Değiştir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container mb-5">
            <div className="row">
                <div className="col">
                <input type='text' placeholder='Ad soyad: ' className='form-control' value={edtname} onChange={(e) => setEdtName(e.target.value)}/>
                <input type='text' placeholder='Yaş: ' className='form-control' value={edtage} onChange={(e) => setEdtAge(e.target.value)}/>
                <input type='text' placeholder='Departman: ' className='form-control' value={edtdepartment} onChange={(e) => setEdtDepartment(e.target.value)}/>
                <label>Çalışma Durumu:</label>
                <input type='checkbox' checked={edtisActive === 1 ? true : false}  onChange={(e) => handleEdtActiveChange(e)} value={edtisActive}/>
                <button type='submit' className='btn btn-primary btn-sm'>Çalışan Ekle</button>
                </div>
            </div>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            İptal
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Değişiklikleri Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
        
        
      </Fragment>
    </div>
  )
}

export default CRUD
