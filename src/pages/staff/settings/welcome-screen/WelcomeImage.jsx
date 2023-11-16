import React from 'react'
import './styles/welcomeImage.css';

const WelcomeImage = () => {
  return (
      <main>
        <div width="100%">
          <div>
            <div className="card-header">
              <div>
                <h6>Welcome Graphic</h6>
                <p>Choose an image to appear on your welcome screen after sign up</p>
              </div>
              {!showBody && (
                <div>
                  <button color="danger" onClick={this.props.toggleShowBody}>
                    Choose
                  </button>
                </div>
              )}
            </div>
          </div>
          {showBody && (
            <div style={{ padding: '3%' }}>
              <div className="welcome-img-container">
                {welcomeGraphic && welcomeGraphic.graphic ? (
                  <img src={welcomeGraphic.graphic} alt="welcome image" />
                ) : (
                  <div className="welcome-img-place">
                    <div>{isUploading ? <Spinner color="danger" /> : <p>Welcome Graphic</p>}</div>
                  </div>
                )}
              </div>
              <CardText>
                {' '}
                <small>
                  <strong>Hint:</strong> Upload a graphic with a greeting message{' '}
                </small>
              </CardText>
              <Button color="danger" onClick={this.openFile}>
                <FaImage color="#ffffff" size={18} /> Select Graphic
              </Button>{' '}
              {welcomeGraphic && welcomeGraphic.graphic && (
                <Button outline color="danger" onClick={() => this.deleteWelcomeGraphic(welcomeGraphic.id)}>
                  <FaTrashAlt color="firebrick" size={16} /> Delete
                </Button>
              )}
              <input
                type="file"
                onChange={this.uploadGraphic}
                accept="image/*"
                ref={this.fileRef}
                hidden
              />
            </div>
          )}
        </div>
      </main>
  )
}

export default WelcomeImage