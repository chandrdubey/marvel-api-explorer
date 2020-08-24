import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCharectersAction,
  getCharectersSearchAction,
  isLoadingAction,
} from "../actions/getDataAction";
import DisplayData from "./DisplayData";
import Spinner from "./Spinner";

//import Pagination from "./Pagination";
import Pagination from "react-js-pagination";


// let ts = new Date().getTime();
// let hash = CryptoJS.MD5(ts + '2dafafc5122792c3486bddeb1fe227aab1dd0def' + 'ee182f248ccfa43f509148540e539433').toString();
// let url = `?ts=${ts}&apikey=ee182f248ccfa43f509148540e539433&hash=${hash}`

class CharecterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      activePage: 1,
      dataPerPage: 12,
    };
  }

  componentDidMount() {
    

    this.props.Loading();
    this.props.getAllCharecters();
  }
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    //this.props.getComicsSearch(this.state.query);
    if (this.state.query) {
      this.props.Loading();
      this.props.getCharectersSearch(this.state.query);
    }
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  render() {
    window.scrollTo(0, 0);

    console.log(this.props.isLoading);

    let title = "Marvel Charecters List";
    let indexLast = this.state.dataPerPage * this.state.activePage;
    let indexFirst = indexLast - this.state.dataPerPage;
    let pageChar = this.props.charecters.slice(indexFirst, indexLast);

    return (
      <>
        <section id="header" className=" d-flex align-items-center">
          <div className="container-fluid nav_bg ">
            <div className="row">
              <div className=" col-10 mx-auto text-sm-left marginPage">
                <h1>{title}</h1>

                <form
                  className="form-inline my-2 ml-2 "
                  onSubmit={this.handleSubmit}
                >
                  <input
                    className="search-data "
                    type="search"
                    onChange={this.handleChange}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  {/* <button className="btn btn-outline-success my-2 my-sm-0"  type="submit">Search</button> */}
                </form>
                {this.props.isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <DisplayData allData={pageChar} reqParams="charecters" />

                    <Pagination
                      hideDisabled
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.dataPerPage}
                      totalItemsCount={this.props.charecters.length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    charecters: state.marvelData.charecters,
    isLoading: state.marvelData.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCharecters: () => dispatch(getCharectersAction()),
    getCharectersSearch: (query) => dispatch(getCharectersSearchAction(query)),
    Loading: () => dispatch(isLoadingAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharecterComponent);
