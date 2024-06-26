import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

import Link from 'next/link';
import { HiX } from 'react-icons/hi';

const Cart = () => {
  const cartRef = useRef();
  const { cartItems, setShowCart, totalPrice, totalQty, onRemove, toggleCartItemQuantity } = useStateContext();

  
 

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <Link href={'/products'}>
      <div className='cart-cross'><HiX/></div>
      </Link>
      <h2>Shopping Cart</h2>
      <div className='cart-container'>
      
        <div className='cart-items'>
          {cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h1>Your shopping bag is empty</h1>
              
              <Link href="/" className='btn'>
                Continue Shopping
              </Link>
            </div>
          )}

          {cartItems.length >= 1 && cartItems.map((item) => (
            <div key={item._id} className='item-card'>
              <div className='item-image'>
                <img src={urlFor(item?.image[0])} alt='img' />
              </div>
              <div className='item-details'>
                <div className='name-and-remove'>
                  <h3>{item.name}</h3> 
              
                  
                  <button type='button' onClick={() => onRemove(item)} className='remove-item'>
                  <HiOutlineTrash size={28} />  
                  </button>
                </div>
                <h4><pre> Size: {item.size}</pre></h4> 
                <p className='item-tag'>Dress</p>
                <p className='delivery-est'>Delivery Estimation</p>
                <p className='delivery-days'>5 Working Days</p>
                <div className='price-and-qty'>
                  <span className='price'>PKR.{item.price * item.quantity}</span>  
                  <div>
                    <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                    <span className='num'>{item.quantity}</span>
                    <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                  </div>   
                </div>
              </div>
            </div>
          ))}    
        </div>

        {cartItems.length >= 1 && (
        <div className='order-summary'>
          <h3>Order Summary</h3>
          <div className='qty'>
            <p>Quantity</p>
            <span>{totalQty}</span>
          </div>
          <div className='subtotal'>
            <p>Sub Total</p>
            <span>Rs.{totalPrice}</span>
          </div>
          <Link href='/cashondelivary/cashon' className='btn'>
            <div>cash on delivary</div>   
          </Link>
        </div>
        )}  

      </div>
    </div>
  )
}

export default Cart;
