import React, {Component} from 'react';
// import StarRating from 'react-native-star-rating';
import { Rating } from 'react-native-elements';

class AppStarRating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: this.props.starCount
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
        <Rating fractions={1} type="star" {...this.props}/>
    //   <StarRating
    //     disabled={false}
    //     emptyStar={'ios-star-outline'}
    //     fullStar={'ios-star'}
    //     halfStar={'ios-star-half'}
    //     iconSet={'Ionicons'}
    //     maxStars={5}
    //     selectedStar={(rating) => this.onStarRatingPress(rating)}
    //     fullStarColor={'#FFD800'}
    //     emptyStarColor={'#FFD800'}
    //     {...this.props}
    //   />
    );
  }
}

export default AppStarRating;
