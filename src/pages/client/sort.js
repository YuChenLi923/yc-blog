import React, {Component} from 'react';
import CardWarper from '../../components/common/CardWarper';
import ArticleCard from '../../components/pages/ArticleCard';
import warp from '../../components/common/wrapCompontent';
import ajax from '../../utils/yc-ajax';
import '../../assets/scss/pages/client/sort.scss';
import Nav from '../../components/common/Nav-router';
class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: []
        };
    }
    componentWillMount() {
        ajax.get('yc/getTypes').send().then(({data: result}) => {
            let {data: types} = result;
            types.forEach((item, index) => {
              types[index] = {
                value: `${item.type} (${item.num})`,
                url: '/share?type=' + item.type
              };
            });
            this.setState({
              types
            });
            console.log(types);
          });
    }
    render() {
        const {types} = this.state;
        return (
            <div id="sort">
                <Nav horizontal={true} items={types}></Nav>
            </div>
        );
    }
}
module.exports = warp({
    Target: Sort
});
