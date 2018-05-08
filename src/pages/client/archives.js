import React, {Component} from 'react';
import '../../assets/scss/pages/client/archives.scss';
import warp from '../../components/common/wrapCompontent';
import { Link } from 'react-router';
import Loading from '../../components/common/Loading';
import { getArchives } from '../../redux/action/action';
class Archives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            archives: {}
        };
    }
    create() {
        let result = [],
            {archives} = this.state,
            date,
            list,
            articles;
        for (date in archives) {
            articles = archives[date];
            result.push(
                <h1 className="archives-date" key={date}>{date}</h1>
            );
            list = <ul className="archives-list" key={date + 'list'}>
            {articles.map((item, index) => {
                return (
                        <li key={index}>
                        <div className="archives-icon">
                            <div className="archives-circle"/>
                            {
                                index < articles.length - 1 &&
                                <div className="archives-line"/>
                            }
                        </div>
                        <Link to={'article?id=' + item.id} className="archives-title">{item.title}</Link>
                        </li>
                );
             })}
            </ul>;
            result.push(list);
        }
        return result;
    }
    componentWillMount() {
       this.props.getArchives(this);
    }
    render() {
        return (
            <div id="archives">
              <Loading>
                {this.create()}
              </Loading>
            </div>
        );
    }
}
module.exports = warp({
    Target: Archives,
    redux: {
      mapDispatchToProps: {getArchives}
    }
});
