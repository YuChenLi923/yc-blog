import React, {Component} from 'react';
import warp from '../../components/common/wrapCompontent';
import {postSeverData} from '../../redux/action/action';
class ArticleList extends Component {
  deleteArticle() {
    const {postSeverData} = this.props,
          parent = this.props.parent;
    postSeverData({
      url: 'yc/admin/deleteArticle',
      data: {
        id: this.props.id
      },
      hasToken: true,
      noDispatch: true,
      onSuccess: (result) => {
        if (result.status === 100) {
          alert('删除成功!');
          parent.getArticleData(parent.state.index, parent.state.articleType);
        }
      }
    });
  }
  edit(id) {
    window.location.href = '/admin/edit?id=' + id;
  }
  review(id) {
    window.open('/article?id=' + id);
  }
  render() {
    let { title, time, type, id } = this.props;
    return (
      <ul className="item">
        <li className="title">{title}</li>
        <li className="time">{time}</li>
        <li className="type">{type}</li>
        <li className="opera">
          <span onClick={this.review.bind(this, id)}>查看</span>
          <span onClick={this.edit.bind(this, id)}>修改</span>
          <span onClick={this.deleteArticle.bind(this, id)}>删除</span>
        </li>
      </ul>
    );
  }
}
module.exports = warp({
  Target: ArticleList,
  redux: {
    mapDispatchToProps: {postSeverData}
  }
});
