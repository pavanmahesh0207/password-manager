import {Component} from 'react'
import './App.css'
import {v4 as uuidv4} from 'uuid'

const colorList = ['purple', 'green', 'orange', 'brown', 'blue']
class App extends Component {
  state = {
    isTrue: false,
    passwordList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  listenUsername = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newPassword = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {passwordList} = this.state
    this.setState({
      passwordList: passwordList.filter(password => password.id !== id),
    })
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const searchList = passwordList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    if (searchList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="password-img-container">
          <div className="add-new-pwd-container">
            <form className="add-details" onSubmit={this.addPassword}>
              <h1 className="detail-heading">Add New Password</h1>
              <div className="input-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="input-image"
                  alt="website"
                />
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  onChange={this.listenWebsite}
                  value={website}
                />
              </div>

              <div className="input-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="input-image"
                  alt="username"
                />
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  onChange={this.listenUsername}
                  value={username}
                />
              </div>
              <div className="input-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="input-image"
                  alt="password"
                />
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  onChange={this.listenPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-image1"
            alt="password manager"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{searchList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {searchList.map(eachPassword => (
                <li
                  className="item-list"
                  id={eachPassword.id}
                  key={eachPassword.id}
                >
                  <p className={`initial ${eachPassword.classAdd}`}>
                    {eachPassword.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachPassword.websiteName}</p>
                    <p className="website">{eachPassword.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isShow && (
                      <p className="website">{eachPassword.Password}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachPassword.id)}
                    testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
