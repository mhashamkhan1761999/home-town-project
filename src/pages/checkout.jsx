import React from 'react';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useForm } from 'react-hook-form';

const stripePromise = loadStripe('pk_test_51LO709EoIN0qcO1SAQ6hl12BkCOI93FAQ8u9n2cnVA4kuz4YIpx0c50TeUJHHGUFiZnniCvwal7FS1ZM5EHyCy8400wxefrAoU');

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
    console.log('Billing Details:', data);
  }

  return (
    <section className="py-[80px] md:py-[100px] lg:py-[134px] px-4 bg-black min-h-screen">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </section>
  );
};

export default Checkout;
