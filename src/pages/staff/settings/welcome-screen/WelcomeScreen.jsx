import React from 'react'
import SliderPictures from './SliderPictures'
import WelcomeImage from './WelcomeImage'

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <h4>Welcome screen</h4>

      {/* <Card>
          <CardBody>
            <h4>Welcome screen</h4>
            <WelcomeImage
              showBody={true}
              toggleShowBody={() => console.log('toggle')}
            />
            <br />
            <SliderPictures
              showBody={this.state.showSliderBody}
              toggleShowSliderBody={this.showSliderBody}
            />
          </CardBody>
        </Card> */}
    </div>
  )
}

export default WelcomeScreen