import React from 'react'
import './styles/sliderPicture.css';


const SliderPictures = () => {
  return (
      <main>
        <Card width="100%">
          <CardHeader>
            <div className="card-header">
              <div>
                <h6>Slider pictures</h6>
                <p>Select about 5 pictures to slide behind your logo</p>
              </div>
              {!showBody && (
                <div>
                  <Button color="danger" onClick={this.props.toggleShowSliderBody}>
                    Select
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          {showBody && (
            <CardBody style={{ padding: '3%' }}>
              <div>
                <h6>Select about 5 pictures to appear in your home screen</h6>
                <div className="slide-select-container">
                  <div className="images">
                    <FileUploadProgress
                      key="ex1"
                      url="/api/v1/settings/slide-images"
                      method="POST"
                      onLoad={() => {
                        this.getImages();
                      }}
                      beforeSend={request => {
                        const token = localStorage.getItem('jwtToken');
                        request.setRequestHeader('Authorization', token);

                        return request;
                      }}
                      formGetter={this.formGetter.bind(this)}
                      formRenderer={this.customFormRenderer.bind(this)}
                    />
                  </div>
                  <div className="slide-img-container">
                    {this.state.images.length &&
                      this.state.images.map(image => (
                        <div key={image.id} className="img-container">
                          <span className="remove-image" onClick={() => this.removeImage(image.id)}>
                            x
                          </span>
                          <img src={image.url} alt={`slide-img ${image.id}`} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardBody>
          )}
        </Card>
      </main>
  )
}

export default SliderPictures