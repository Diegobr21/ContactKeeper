import React, {useState, useContext, useEffect} from 'react'

import ContactContext from '../../context/Contact/ContactContext';


const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const {addContact, clearCurrent, current, updateContact} = contactContext;

    useEffect(() => {
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            })
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });
    
    const {name, email, phone, type} = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if(current){
            updateContact(contact);
        }else{
            addContact(contact);
        }
        
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type='text' 
            placeholder='Name' 
            name='name' 
            value={name} 
            onChange={onChange}></input>

            <input type='email' 
            placeholder='Email' 
            name='email' 
            value={email} 
            onChange={onChange}></input>

            <input type='text' 
            placeholder='Phone' 
            name='phone' 
            value={phone} 
            onChange={onChange}></input>

            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type === 'personal'}
            onChange={onChange}
            ></input>Personal{' '}
            <input type='radio' name='type' value='professional' checked={type === 'professional'}
            onChange={onChange}
            ></input>Professional

            <div>
                <input type='submit' value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block'></input>
            </div>

            {current && <div>
                <btn className='btn btn-light btn-block' onClick={clearAll}>Clear</btn>
                </div>}
        </form>
    )
}

export default ContactForm;