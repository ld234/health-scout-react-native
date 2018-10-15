// import React, { Component } from 'react';
// import { View, Text, Button } from 'react-native';
// import stripe from 'tipsi-stripe';

// stripe.setOptions({
//     publishableKey: 'pk_test_OUqtPerqAmIdMxbK8PagM3Ng',
// });

// class PaymentPage extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             isPaymentPending: true,
//         }
//     }

//     static navigationOptions = ({navigation}) => {
//         return {
//             headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#17ac71'},
//             headerRight: <View></View>,
//             headerTransparent: true,
//             headerTintColor: '#17ac71',
//         }
//     }
//     requestPayment = () => {
//         return stripe
//           .paymentRequestWithCardForm()
//           .then(stripeTokenInfo => {
//             console.warn('Token created', { stripeTokenInfo });
//           })
//           .catch(error => {
//             console.warn('Payment failed', { error });
//           });
//       };
    
//     render() {
//         return (
//           <View style={styles.container}>
//             <Button
//               title="Make a payment"
//               onPress={this.requestPayment}
//               disabled={this.state.isPaymentPending}
//             />
//           </View>
//         );
//       }
//     }
    
//     const styles = {
//       container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//     };

//     export default PaymentPage;


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