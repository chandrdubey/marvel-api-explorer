import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayContent from "../DisplayContent";
import { Redirect,Link} from 'react-router-dom'
class FavouriteComponet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: 1,
      fav:"Charecters"
    };
  }

  handleDropdown = () => {
    const dropdown = document.getElementById("dropdownMenuButton");
    dropdown.style.background = "#a80b0b";
  };
  handleFavouriteList = (num) => {
    let data ;
    data =!num ? "Comics" : "Charecters"; 
    this.setState({
      favourite: num,
      fav: data
    });
   
  };
  render() {
    let token = localStorage.getItem('token');
    const {
      match: { params },
    } = this.props;
   
    if(!token || this.props.auth.currentUser.id !== params.id )
    {
      return <Redirect to="/login" />
    }
   
     
    return (
      <>
        <section id="header" className=" d-flex align-items-center">
          <div className="container-fluid nav_bg container-page">
          
              <div className=" mx-auto  marginPage">
                <div className="row">
                  <div className="col-6">
                    <h1>My Favourite List</h1>
                   
                  </div>
                  <div className="col-6 text-center">
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle btn-dropdown"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={this.handleDropdown}
                      >
                        {this.state.fav}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => this.handleFavouriteList(1)}
                        >
                          Charecters
                        </button>

                        <button
                          className="dropdown-item"
                          onClick={() => this.handleFavouriteList(0)}
                        >
                          Comics
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                {this.state.favourite ? (
                  this.props.marvelData.favCharecters.length > 0 ? (
                    <div>
                    
                      <div className="row content-row mx-auto fav1">
                      <h4 className="col-12 text-center  px-0">My Favourite charecters</h4>
                        {this.props.marvelData.favCharecters.map((char) => (
                          <div className="card-len"   key={char.charecter_id}>
                            <DisplayContent
                              data={char}
                             
                              reqParams="charecters"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center auth1 fav-p">
                        <h4>Empty Charecters Favourite list</h4>
                        <p>
                          You have no items in your favourite list. Start
                          adding!
                        </p>
                        <Link to={"/charecters"} className="btn btn-get-started">
                           All charecters
                        </Link>
                      </div>
                    </>
                  )
                ) : this.props.marvelData.favComics.length > 0 ? (
                  <div >
                   
                    <div className="row mx-auto content-row fav1">
                    <h4 className="col-12 px-0  text-center">My Favourite comics</h4>
                      {this.props.marvelData.favComics.map((comic) => (
                        <div className="card-len"  key={comic.comic_id}>
                          <DisplayContent
                            data={comic}
                           
                            reqParams="comics"
                          />
                        </div>
                      ))}
                    </div>
                    </div>
                ) : (
                  <>
                    <div className=" fav-p text-center auth1">
                      <h4>Empty Comics Favourite list</h4>
                      <p>
                        You have no items in your favourite list. Start adding!
                      </p>
                      <Link to={"/comics"} className="btn btn-get-started">
                     All comics
                     </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
       
        </section>
      </>
    );
  }
}
const mapStateToProps = ({ marvelData,auth }) => {
  return {
    marvelData,
    auth
  };
};
export default connect(mapStateToProps)(FavouriteComponet);
