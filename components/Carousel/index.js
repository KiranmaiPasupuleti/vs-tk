import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

class OffersSection extends Component {
  state = {
    offersList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.renderGetOffers()
  }

  renderGetOffers = async () => {
    this.setState({isLoading: true})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/offers`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = data.offers.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
    }))
    this.setState({offersList: updatedData, isLoading: false})
  }

  renderOffers = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    const {offersList} = this.state
    return (
      <ul className="carousel-container">
        <Slider {...settings} className="carousal">
          {offersList.map(eachImage => (
            <li key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="offer"
                className="carousal-item-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div
      testid="restaurants-offers-loader"
      className="restaurants-offers-loader"
    >
      <Loader
        className="loader"
        type="ThreeDots"
        color="#F7931E"
        height={50}
        width={50}
      />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="carousels-container">
        {isLoading ? this.renderLoader() : this.renderOffers()}
      </div>
    )
  }
}

export default OffersSection
