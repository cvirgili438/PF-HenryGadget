import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getReviews } from '../../../Redux/Actions/users.js';
import { changeReviewVisible, changeReviewArchive } from '../../../Redux/Actions/users.js'; // en linea aparte por si separamos las actions de las reviews en otro archivo

import styles from './ReviewCRUD.module.css';

const ReviewCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(null);

  const reviews = useSelector(state => state.reviews);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleChangeVisible = e => {
    dispatch(changeReviewVisible(e.target.id));
  };

  const handleChangeArchive = e => {
    dispatch(changeReviewArchive([e.target.value]));
  };

  const handleSubmiteMultipleArchive = e => {
    dispatch(changeReviewArchive(selected));
  };

  const handleSubmitFilterScore = e => {
    setScore(e.target.value);
  };

  const handleSubmitAllReviews = e => {
    setScore(null);
  };

  const handleCheckboxes = e => {
    if (e.target.checked) {
      if (selected.indexOf(e.target.name) === -1) {
        setSelected([...selected, e.target.name]);
      }
    } else {
      setSelected(selected.filter(item => item !== e.target.name));
    }
  };

  useEffect(() => {
    dispatch(getReviews())
  }, [dispatch]);

  return (
    <div className={ styles.container }>
      
      <div className={ styles.managebar }>
        <div>
          With {selected.length} selected: <Button text='Archive' disabled={selected.length > 0 ? false : true} onClick={ handleSubmiteMultipleArchive }/>
        </div>
        <div>
          Filter by name, model or review: <Input type='text' name='review' value={input} onChange={ handleInputChange } />
        </div>
        <div>
          Filter by rating: <Rating name="rating" defaultValue='0' value={score === null ? 0 : score} precision={1} onChange={handleSubmitFilterScore}/>
          <Button text='All' onClick={handleSubmitAllReviews} />
        </div>
      </div>
      { 
        reviews.length > 0 ?
          <div className={ styles.tableContainer }>
            <table className={ styles.table }>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Select</th>
                  <th>Img</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th>Visible</th>
                  <th>Archive</th>
                </tr>
              </thead>
              <tbody>
              {
                reviews
                .filter(p => p.comment.toLowerCase().includes(input.toLowerCase())
                            ||
                            p.product.name.toLowerCase().includes(input.toLowerCase())
                            ||
                            p.product.model.toLowerCase().includes(input.toLowerCase()))
                .filter(p => score === null ? p : +p.score === +score)
                .map((p, i) => (
                  <tr key={ p.id }>
                    <td>{ i + 1 }</td>
                    <td><Checkbox name={ p.id } onChange={ handleCheckboxes } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                    <td><img src={ p.product.img[0] } alt={ p.product.name } className={ styles.productImage } /></td>
                    <td>{ p.product.name }</td>
                    <td>{ p.product.model }</td>
                    <td>{ p.comment }</td>
                    <td><Rating name="rating" defaultValue={ p.score } precision={1} readOnly='true' /></td>
                    <td><Switch checked={ p.visible } onChange={ handleChangeVisible } id={ p.id } /></td>
                    <td><Button text='Archive' onClick={ handleChangeArchive } value={ p.id } /></td>
                  </tr>
                ))
              }
              </tbody>
          </table>
        </div>
      :
      <div className={ styles.emptyCrud }>No reviews to admin</div>
    }  
  </div>
  );
};

export default ReviewCRUD;