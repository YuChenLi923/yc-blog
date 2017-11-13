import React, {Component} from 'react';
import warp from '../common/wrapCompontent';
import Nav from '../common/Nav-router';
import AboutMe from '../../components/pages/aboutme';
class AppNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drop: false,
            showAboutMe: false
        };
    }
    drop() {
        this.setState({
            drop: !this.state.drop
        });
    }
    showAboutMe() {
      this.setState({
        showAboutMe: true
      });
    }
    closeAboutMe() {
      this.setState({
        showAboutMe: false
      });
    }
    render() {
        let {
            isMobile = false,
            leftNavList,
            otherPlatform,
            index
        } = this.props;
        let { drop, showAboutMe } = this.state;
        return (
            <div id="Nav">
                <div className="headPortrait"
                     onMouseEnter = {this.showAboutMe.bind(this)}
                     onMouseLeave = {this.closeAboutMe.bind(this)}
                >
                  {do {
                    if (showAboutMe && !isMobile) {
                      <AboutMe/>;
                    }
                  }}
                </div>
                <div className={isMobile ? 'fiexWarp' : ''}>
                    <div className={isMobile ? 'hiddenWarp' : ''}
                         style={{height: drop ? (65 / 75 * leftNavList.length + 1.1) +
                           'rem' : 65 / 75 + 'rem'}}
                    >
                        <div className="dropWarp"
                             style={{
                               marginTop: isMobile && !drop ? -1 * 65 / 75 * index +
                                 'rem' : '0'}}
                        >
                            <Nav click={() => { this.setState({drop: false}); }}
                                 items = {leftNavList}
                                 index={index}
                                 className="NavList"
                                 SPA
                            />
                            <Nav className='otherPlatform'
                                 items = {otherPlatform}
                                 horizontal
                                 disabled
                            />
                        </div>
                    </div>
                    {do{
                      if (isMobile) {
                        <div className={!drop ? 'drop-down' : 'drop-up'}
                             onClick={this.drop.bind(this)}
                        />;
                      }
                    }}
                </div>
            </div>
        );
    }
}
module.exports = warp({
    Target: AppNav,
    type: 'App-Nav',
    redux: {
        mapStateToProps: (state) => {
            let { deviceChange } = state;
            return {
                isMobile: deviceChange.isMobile
            };
        }
    }
});
