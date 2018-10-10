import React, {Component} from 'react';
import Rating from 'react-native-star-rating';

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
      <Rating disabled={true}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={parseFloat(this.props.rating)}
        starSize={20}
        // selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#FBBC05'} emptyStarColor={'#FBBC05'}
        halfStarEnabled	={true}
      />
    );
  }
}

export default AppStarRating;
