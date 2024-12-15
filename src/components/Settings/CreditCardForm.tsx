'use client'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

export function CreditCardForm() {
  const stripe = useStripe()
  const elements = useElements()

  return (
    <div className="p-4 border rounded-lg">
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    </div>
  )
}