import React from 'react'

const SignInFlow = () => {
  return (
     <main >
        <h4>Sign in flow</h4>
        <p>Customise the sign in flow for the following visit purpose</p>
        {true ? (
          <div>
            {[
                {id: '12qw', option_name: 'lorem'},
                {id: '12qw', option_name: 'ipsum'},
            ].map(type => (
              <div key={type.id} >
                {type.option_name}
                <button
                //   style={{ float: 'right' }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>No visit purpose</div>
        )}
        <br />
        {true? (
          <form onSubmit={e => e.preventDefault()}>
            <h5>Add a new visit purpose</h5>
            <input
              type="text"
              name="visit_type"
            //   value={this.state.visit_type}
            //   onChange={e => this.setState({ visit_type: e.target.value })}
              placeholder="Enter name"
            />{' '}
            <br />
            <p>Choose a color to show on the pie chat </p>
            <input
            type="color"
            name="color"
            required
            // value={this.state.color}
            // onChange={e => this.setState({ color: e.target.value })}
             />
             <br />
            {/* <div
              plan={user.plan}
              perform="visit-type:add"
              no={() => (
                <button color="danger" disabled={!this.state.visit_type}>
                  Add
                </button>
              )}
              yes={() => (
                <Button color="danger" size="sm" onClick={this.handlePlanUpgrade}>
                  Upgrade to Premium
                </Button>
              )}
            /> */}
          </form>
        ) : (
          <button onClick={e => e.preventDefault()}>
            Add new
          </button>
        )}
        <div style={{marginTop: '2rem'}}> hi</div>
        
      </main>
  )
}

export default SignInFlow