import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCharectersAction,
  getCharectersSearchAction,
  isLoadingAction,
} from "../actions/getDataAction";
import DisplayData from "./DisplayData";
import Spinner from "./Spinner";

import Pagination from "react-js-pagination";

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

    if (this.state.query) {
      this.props.Loading();
      this.props.getCharectersSearch(this.state.query);
    }
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  render() {
    window.scrollTo(0, 0);

    let total_page = Math.ceil(
      this.props.charecters.length / this.state.dataPerPage
    );

    let title = "Marvel Charecters List";
    let indexLast = this.state.dataPerPage * this.state.activePage;
    let indexFirst = indexLast - this.state.dataPerPage;
    let pageChar = this.props.charecters.slice(indexFirst, indexLast);

    return (
      <>
        <section id="header" className=" d-flex align-items-center">
          <div className="container-fluid nav_bg container-page ">
            {/* <div className="row"> */}
            <div className="  mx-auto text-sm-left marginPage">
              <h1>{title}</h1>

              {/* <!-- Actual search  box --> */}

              <form
                className="form-group has-search "
                onSubmit={this.handleSubmit}
              >
                <span className="fa fa-search form-control-feedback"></span>
                <input
                  type="text"
                  className="form-control shadow"
                  placeholder="Search"
                  onChange={this.handleChange}
                />
              </form>

              {this.props.isLoading ? (
                <Spinner />
              ) : this.props.charecters.length > 0 ? (
                <>
                  <DisplayData allData={pageChar} reqParams="charecters" />
                  {total_page !== 1 && (
                    <Pagination
                      hideDisabled
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.dataPerPage}
                      totalItemsCount={this.props.charecters.length}
                      pageRangeDisplayed={4}
                      hideFirstLastPages={true}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  )}
                </>
              ) : (
                <h1 className="text-center">No result found</h1>
              )}
            </div>
          </div>
          {/* </div> */}
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
