import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';

import {db, storage} from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import '../styles/add-product.css';

const AddProducts = () => {
    const navigate = useNavigate();

    const [enterTitle, setEnterTitle] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterDescription, setEnterDescription] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);

    const [loading, setLoading] = useState(false);

    const addProduct = async(e) => {
        e.preventDefault();

        setLoading(true);
        //Add product to firebase
        try {
            const docRef = await collection(db, 'products');
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

            uploadTask.on(() => {
                toast.error('Images not uploaded!')
            }, () =>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=> { await addDoc(docRef, {
                    title: enterTitle,
                    shortDesc: enterShortDesc,
                    description: enterDescription,
                    category: enterCategory,
                    price: enterPrice,
                    imgUrl: downloadURL,
                });
            });
            });
            setLoading(false);
            toast.success("Product successfully added");
            navigate("/dashboard/all-products")
        } catch (err) {
            setLoading(false);
            toast.error("Product not added!");
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        {
                            loading ? <h4 className='py-5'>??ang t???i......</h4> : <>
                            
                            <h4 className='title mb-5'>TH??M S???N PH???M</h4>
                        <Form onSubmit={addProduct}>
                            <FormGroup className='form__group'>
                                <span>T??n s???n ph???m</span>
                                <input type="text" placeholder='Double sofa' value={enterTitle} onChange={e=> setEnterTitle(e.target.value)} required />
                            </FormGroup>
                            <FormGroup className='form__group'>
                                <span>Gi???i thi???u s???n ph???m</span>
                                <input type="text" placeholder='lorem........' value={enterShortDesc} onChange={e=> setEnterShortDesc(e.target.value)} required />
                            </FormGroup>
                            <FormGroup className='form__group'>
                                <span>Chi ti???t s???n ph???m</span>
                                <input type="text" placeholder='Description......' value={enterDescription} onChange={e=> setEnterDescription(e.target.value)} required />
                            </FormGroup>
                            <div className='d-flex align-items-center justify-content-between gap-5'>
                                <FormGroup className='form__group w-50'>
                                    <span>Gi??</span>
                                    <input type="text" placeholder='$100' value={enterPrice} onChange={e=> setEnterPrice(e.target.value)} />
                                </FormGroup>
                                <FormGroup className='form__group w-50'>
                                    <span>Lo???i s???n ph???m</span>
                                    <select className='w-100 p-2' value={enterCategory} onChange={e=> setEnterCategory(e.target.value)} >
                                        <option>Choose category</option>
                                        <option value="chair">MacBook</option>
                                        <option value="sofa">iPad</option>
                                        <option value="mobile">iPhone</option>
                                        <option value="watch">?????ng h???</option>
                                        <option value="wireless">Tai nghe</option>
                                    </select>
                                </FormGroup>
                            </div>
                            
                            <div>
                            <FormGroup className='form__group'>
                                <span>H??nh ???nh</span>
                                <input type="file" onChange={e => setEnterProductImg(e.target.files[0] )} required />
                            </FormGroup>
                            </div>
                            <button className='buy__btn' type='submit'>Th??m s???n ph???m</button>
                        </Form>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AddProducts;