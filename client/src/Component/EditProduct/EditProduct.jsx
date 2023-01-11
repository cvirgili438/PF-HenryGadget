import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getProductsNames, editProduct, getProductById } from '../../Redux/Actions/products.js';

import styles from './EditProduct.module.css';

function EditProduct() {

  const { id } = useParams();
  
  const productDetail = useSelector(state => state.productDetail);
  const products = useSelector(state => state.productsNames);

  const dispatch = useDispatch();

  const navigate = useHistory();

  
  const [errors, setErrors] = useState({});
  
  const [input, setInput] = useState({
    name: '',
    type: '',
    brand: '',
    price: '',
    model: '',
    stock: '',
    camera: '',
    description: '',
    storage: '',
    processor: '',
    ram: '',
    discount: '',
    img: []
  })
  
  useEffect(() => {
    dispatch(getProductById(id));     
    dispatch(getProductsNames());
    setInput({
      name: productDetail.name,
      type: productDetail.type,
      brand: productDetail.brand,
      price: productDetail.price,
      model: productDetail.model,
      stock: productDetail.stock,
      camera: productDetail.camera,
      description: productDetail.description,
      storage: productDetail.storage,
      processor: productDetail.processor,
      ram: productDetail.ram,
      discount: productDetail.discount,
      img: []
    })

  }, [dispatch]);

  function validate(input) {
    let errors = {};
    if (!input.name || input.name.length < 3) {
      errors.name = 'Product name is required';
    }else if (products.some((e) => e.toLowerCase() === input.name.toLowerCase())) {
      errors.name = 'Name already exist';
    }else if(!input.type){
      errors.type = 'Type is required';
    }else if(!input.brand){
      errors.brand = 'Brand is required';
    }else if(input.price === 0 || !input.price){
        errors.price = 'Price must be bigger than 0';
    }else if(!input.model){
        errors.model = 'Model is required';
    }else if(!input.stock || input.stock === 0){
        errors.stock = 'Stock is required';
    }
    // else if(!input.img[0] || input.img[0] === " "){
    //   errors.img = 'Image is required';
    // }
    // else if(
    //   !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.img)
    // ) errors.img ="*Insert a valid URL: https:// or http:// or www."

    return errors;
};


function handleChange(e) {
  setInput({
    ...input,
    [e.target.name]: e.target.value
  });
  setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
  }))
};

function handleChangeImg(e) {
  setInput({
    ...input,
    [e.target.name]: [e.target.value]
  });
  setErrors(validate({
      ...input,
      [e.target.name]: [e.target.value]
  }))
};

function handleSubmit(e) {
  e.preventDefault();
  setErrors(validate(input));
  if (Object.keys(errors).length === 0) {
      dispatch(editProduct({id: id, data: input}))
      alert('Product saved successfully');
  }
  return;
}

  return (
    <div className={ styles.main }>
      <div className={styles.createDiv} >
            <div className='createSection'>
                <h1 className={styles.title}>Edit product</h1>
            </div>
            <form  onSubmit={handleSubmit}>
              <div className={styles.formContainer}>
                <div className={styles.subContainer}>
                    <label className={styles.label}>Name</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.name} name='name' placeholder='Product name...' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className={styles.danger}>{errors.name}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Brand</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.brand} name='brand' placeholder='Product brand...' onChange={e => handleChange(e)} />
                    {errors.brand && (
                        <p className={styles.danger}>{errors.brand}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Type</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.type} name='type' placeholder='Product type...' onChange={e => handleChange(e)} />
                    {errors.type && (
                        <p className={styles.danger}>{errors.type}</p>
                    )}
                </div>
                
                <div className={styles.subContainer}>
                    <label className={styles.label}>Price</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="number" min={1} name='price' value={input.price} placeholder='Product price...'  onChange={e => handleChange(e)}/>
                    {errors.price && (
                        <p className={styles.danger}>{errors.price}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Model</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.model} name='model' placeholder='Product model...' onChange={e => handleChange(e)} />
                    {errors.model && (
                        <p className={styles.danger}>{errors.model}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Stock</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="number" min={1} name='stock' value={input.stock} placeholder='Product stock'  onChange={e => handleChange(e)}/>
                    {errors.stock && (
                        <p className={styles.danger}>{errors.stock}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Camera</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.camera} name='camera' placeholder='Product camera...' onChange={e => handleChange(e)} />
                    {errors.camera && (
                        <p className={styles.danger}>{errors.camera}</p>
                    )}
                </div>

                

                <div className={styles.subContainer}>
                    <label className={styles.label}>Storage</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.storage} name='storage' placeholder='Product storage...' onChange={e => handleChange(e)} />
                    {errors.storage && (
                        <p className={styles.danger}>{errors.storage}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Processor</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.processor} name='processor' placeholder='Product processor...' onChange={e => handleChange(e)} />
                    {errors.processor && (
                        <p className={styles.danger}>{errors.processor}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Ram</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.ram} name='ram' placeholder='Product ram...' onChange={e => handleChange(e)} />
                    {errors.ram && (
                        <p className={styles.danger}>{errors.ram}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Discount (%)</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text" value={input.discount} name='discount' placeholder='Product discount...' onChange={e => handleChange(e)} />
                    {errors.discount && (
                        <p className={styles.danger}>{errors.discount}</p>
                    )}
                </div>

                <div className={styles.subContainer}>
                    <label className={styles.label}>Image</label>
                    {/* <br/> */}
                    <input className={styles.inputs} type="text"  name='img' placeholder='Product image...' onChange={e => handleChangeImg(e)} />
                    {errors.img && (
                        <p className={styles.danger}>{errors.img}</p>
                    )}
                </div>

                <div className={styles.subContainerT}>
                    <label className={styles.label} cols="30" rows="8">Description</label>
                    {/* <br/> */}
                    <textarea className={styles.textarea} value={input.description} name='description' placeholder='Product description...' onChange={e => handleChange(e)} />
                    {errors.description && (
                        <p className={styles.danger}>{errors.description}</p>
                    )}
                </div>

              </div>  
                
                <button className={styles.createBtn} type='submit' disabled={Object.keys(errors).length > 0 || input.name === "" ? true : false}>Save changes</button>
            </form>
            
        </div>
    </div>
  )
}

export default EditProduct;