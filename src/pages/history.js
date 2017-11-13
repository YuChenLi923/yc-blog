import React, {Component} from 'react';
import CardWarper from '../components/common/CardWarper';
import '../assets/scss/pages/history.scss';
let data = [{
    version: '0.0.1',
    updateInf: ['xxxxxx', 'xxxxxxx', 'xxxx']
}, {
    version: '0.0.2',
    updateInf: ['xxxxxx', 'xxxxxxx']
}];
class HistoryList extends Component {
    render() {
        let { version, updateInf } = this.props;
        return (
            <ul>
                <li className="title">{version}</li>
                {updateInf.map((value, index) => (
                    <li className="list" key={index}>{value}</li>
                ))}
            </ul>
        );
    }
}
class History extends Component {
    render() {
        return (
            <div className="History">

                <CardWarper template={HistoryList} data={data}/>
            </div>
        );
    }
}
module.exports = History;
