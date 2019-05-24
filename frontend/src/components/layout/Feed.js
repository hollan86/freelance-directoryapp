import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBlogs, getPodcasts, getFeeds, getMore } from '../../actions/feeds'

const divStyle = {
    width : '50%'
  };

const cardStyle = {
    minHeight: '10rem'
};
  
export class Feed extends Component {
    /*constructor(props){
        super(props)
        // Sets up our initial state
    // this.state = {
    //     next: null,
    //     feeds: [],
    //   };
        // Binds our scroll event handler
    window.onscroll = () => {

        // console.log(this.props.next)
        // const {
        //   state: {
        //     next,
        //   },
        // } = this;
  
        // Bails early if:
        // * there's an error
        // * it's already loading
        // * there's nothing left to load
        if (this.props.next == null) return;

        console.log(this.props.next)

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // you're at the bottom of the page
            // alert('scrolling');
            this.props.getMore(this.props.next);
        }
  
        // Checks that the page has scrolled to the bottom
        // if (
        //   window.innerHeight + document.documentElement.scrollTop
        //   === document.documentElement.offsetHeight
        // ) {
        // //   this.props.getMore(this.props.next);
        // // console.log(this.props.next)
        // alert('scrolling')
        // }
      };
    } */

    static propTypes = {
        feeds: PropTypes.array.isRequired,
        // getBlogs:PropTypes.func.isRequired,
        // getPodcasts:PropTypes.func.isRequired,
        getFeeds:PropTypes.func.isRequired,
    }

    componentDidMount() {
        // this.props.getBlogs()
        // this.props.getPodcasts()
        this.props.getFeeds()
    }
    openInNewTab = e => {
        e.persist();
        e.preventDefault();
        //console.log(e.target.href);
        var win = window.open(e.target.href, '_blank');
        win.focus();
    }
    
  render() {
    return (
      <div>
        {/* <h1>New Feed</h1> */}
        <div className="d-flex align-content-start flex-wrap">
            {/* <div className="card-deck"> */}
                {this.props.feeds.map(feed => (
                    <div key={feed.id} className="col-md-6 col-lg-6 p-2">
                        <div className="card border-light rounded-lg shadow w-100" style={cardStyle}>
                            <div className="card-header border-bottom-0">{feed.author}</div>
                            <div className="card-body">
                            <h4 className="card-title">
                                <a onClick={this.openInNewTab} className="card-link" href={feed.url}>
                                    {feed.title}
                                </a>
                            </h4>
                                
                            </div>
                            <div className="card-footer bg-transparent border-0">
                                <small className="text-muted">{feed.itemType} | created {new Date(feed.created_at).toLocaleDateString()}</small>
                            </div>
                        </div>
                    </div>
                    
                ))}
            {/* </div>  */}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
    feeds: state.feeds.feeds,
    // next: state.feeds.next
});

export default connect(mapStateToProps, {getFeeds,getMore,getBlogs})(Feed);
