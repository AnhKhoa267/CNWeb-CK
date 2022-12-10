import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import products from "../assets/data/products";
import Helmet from '../components/Helmet/Helmet';
import "../styles/product-details.css"
import CommonSection from '../components/UI/CommonSection';
import { motion } from 'framer-motion';

const ProductDetails = () => {

    const {id} = useParams();
    const product = products.find(item=>item.id===id)
    const {imgUrl, productName, price, avgRating, review, description, shortDesc} = product;
    return <Helmet title={productName}>
    <CommonSection/>
    <section className='pt-0'>
        <Container>
            <Row>
                <Col lg="6">
                    <img src={imgUrl} alt=""/>
                </Col>
                <Col lg="6">
                    <div className='product__details'>
                        <h2>{productName}</h2>
                        <div className='product__rating d-flex align-item-center
                        gap-5 b-3'>
                            <div>
                                <span><i className='ri-start-s-fill'/></span>
                                <span><i className='ri-start-s-fill'/></span>
                                <span><i className='ri-start-s-fill'/></span>
                                <span><i className='ri-start-s-fill'/></span>
                                <span><i className='ri-start-half-s-line'/></span>
                            </div>
                            <p>(<span>{avgRating}</span>ratings)</p>
                        </div>
                            <span className='product__price'>${price}</span>
                            <p className='mt-3'>{shortDesc}</p>

                            <motion.button whileTap={{scale:1.2}} className='buy__btn'>Add to card</motion.button>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  </Helmet>
};

export default ProductDetails
//part-2 49:49. Sai ở chỗ khi bấm vào tên sp thì nó phải hiện thông tin sản phẩm, nhưng nó đ hiện qq j cả. 