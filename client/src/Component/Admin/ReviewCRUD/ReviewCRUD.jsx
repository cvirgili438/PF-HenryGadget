import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import Checkbox from '../../Checkbox/Checkbox';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import { getReviews } from '../../../Redux/Actions/users.js';


import styles from './ReviewCRUD.module.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ReviewCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(null);

  const reviews = useSelector(state => state.reviews);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleSubmitDelete = async e => {
    // await dispatch(deleteProduct(e.target.value));
    // await dispatch(getProductsByQuery(`?limit=20&offset=0`))
  };

  const handleSubmitFilterScore = e => {
    setScore(e.target.value);
  };

  const handleSubmitAllReviews = e => {
    setScore(null);
  };

  const handleInputProducts = e => {
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
          With {selected.length} selected: { selected.length <= 3 ?
            <>
              <Button text='To landing' disabled={true} />
              <Button text='Hide' disabled={true} />
            </>
            :
            null }
        </div>
        <div>
          Filter by product: <Input type='text' name='review' value={input} onChange={handleInputChange} />
        </div>
        <div>
          Filter by rating: <Rating name="rating" defaultValue='0' value={score === null ? 0 : score} precision={1} onChange={handleSubmitFilterScore}/>
          <Button text='All' onClick={handleSubmitAllReviews} />
        </div>
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th>ID</th>
              <th>Select</th>
              <th>From</th>
              <th>Location</th>
              <th>Product</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Visible</th>
              
            </tr>
          </thead>
          <tbody>
            {
              reviews
              .filter(p => p.comment.toLowerCase().includes(input.toLowerCase()))
              .filter(p => score === null ? p : +p.score === +score)
              .map((p, i) => (
                <tr key={ p.id }>
                  <td>{ i + 1 }</td>
                  <td><Checkbox name={ p.id } onChange={ handleInputProducts } defaultChecked={selected.includes(p.id) ? true : false}/></td>
                  <td>{ ['Alex', 'Marty', 'Melman', 'Gloria'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ ['Argentina', 'Colombia', 'Chile', 'Ecuador'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ ['iPhone 12', 'Airpods', 'Tablet motomoto', 'Cargador'][Math.floor(Math.random() * 4)] }</td>
                  <td>{ p.comment }</td>
                  <td><Rating name="rating" defaultValue={ p.score } precision={1} readOnly='true' /></td>
                  <td><Switch {...label} defaultChecked /></td>
                </tr>
              ))
            }
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewCRUD;