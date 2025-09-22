import React from 'react';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useForm } from 'react-hook-form';
import ShippingMarquee from '../components/ShippingMarquee';

const stripePromise = loadStripe('pk_test_51REvJgR0EqcqzPLH5CL2723m2l8hkmEjNQ6Qkm3b3EJEVziLUIJsTOg2ehrSdsXqMEKwi6OaFaivlZpX9N3rg6Eu00GZHqnM7X');
// const stripePromise = loadStripe('pk_live_51REvJXJie2PUnhtx7uy53YLEKNxXqSqb6Fa8BdN2KGsoK7CzmfURna8ekI7q72P6dg5OocNOf243wpTsODrTqtUQ00Fds6auka');


const Checkout = () => {
  const cart = useSelector(state => state.cart);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    data['stripe_token'] = 'tok_visa'
    data['items'] = cart?.items?.map((val => ({ product_id: val?.id, quantity: val?.quantity, price: val?.price }))) || [];
    // console.log('Billing Details:', data);
  }

  return (
    <>
      {/* Shipping Promotion Marquee */}
      <ShippingMarquee />
      
      <section className="py-[80px] md:py-[100px] lg:py-[134px] px-4 bg-black min-h-screen">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </section>
    </>
  );
};

export default Checkout;
