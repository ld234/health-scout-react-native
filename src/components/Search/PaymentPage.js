/* * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description:uses tipsi stripe to do payment
 * between overview and prac profile overview
 * Created:  10 October 2018
 * Last modified:  12 October 2018
 * * * * * * * * * * * * * * * * * * * * * */


import React, { Component } from 'react';
import { View } from 'react-native';
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_test_OUqtPerqAmIdMxbK8PagM3Ng',
});
const theme = {
  primaryBackgroundColor: 'red',
  secondaryBackgroundColor: 'white',
  primaryForegroundColor: 'blue',
  secondaryForegroundColor: 'green',
  accentColor: 'yellow',
  errorColor: 'orange',
  fontFamily: 'Quicksand-Regular',
};
class PaymentPage extends Component {
  componentDidMount() {
    
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'zip', // or 'full'
      theme
    };
    stripe.paymentRequestWithCardForm(options)
      .then(response => {
        // Get the token from the response, and send to your server
      })
      .catch(error => {
        // Handle error
      });
  }
  render() {
    return <View />
  }
}

export default PaymentPage;