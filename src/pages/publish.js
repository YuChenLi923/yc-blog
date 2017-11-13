import React, {Component} from 'react';
import warp from '../components/common/wrapCompontent';
import {postSeverData} from '../redux/action/action';
import Nav from '../components/common/Nav';
import '../assets/scss/pages/publish.scss';
import {shareType} from '../../config/blog';
let articleTypes = [...shareType, '随笔'];
class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      articleTitle: '',
      articleDesc: '',
      articleType: articleTypes[0],
      recommended: '否',
      edit: this.props.location.pathname === '/admin/edit'
    };
  }
  componentWillMount() {
    if (this.state.edit) {
      const id = +this.props.location.query.id;
      if (id) {
        const { postSeverData } = this.props;
        postSeverData({
          url: 'yc/admin/getArticleInf',
          hasToken: true,
          noDispatch: true,
          data: {
            id
          },
          onSuccess: (result) => {
            if (result.status === 100) {
              const data = result.data;
              this.setState({
                articleTitle: data.title,
                articleDesc: data.desc,
                articleType: data.type,
                recommend: data.recommend === 1 ? '是' : '否'
              });
            } else {
              // window.close();
            }
          }
        });
      } else {
        window.close();
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== '/admin/edit' && this.state.edit) {
      this.setState({
        edit: false,
        fileName: '',
        articleTitle: '',
        articleDesc: '',
        articleType: articleTypes[0],
        recommend: '否'
      });
    }
  }
  selectArticleType(type) {
    this.state.articleType = type;
  }
  selectRecommend(flag) {
    this.state.recommend = flag;
  }
  off() {
    window.location.href = '/admin/manage';
  }
  publish() {
    const { postSeverData } = this.props,
          { articleTitle, articleDesc, fileName, articleType, recommend, edit } = this.state,
          files = this.fileDom.files,
          publishTime = new Date(),
          y = publishTime.getFullYear(),
          m = publishTime.getMonth() + 1,
          d = publishTime.getDate();
    if (!articleTitle) {
      alert('未填写文章标题!');
    } else if (!articleDesc) {
      alert('未填写文章简述!');
    } else if (files.lengt === 0 && !edit) {
      alert('未选择文件');
    } else if (!/\.md$/.test(fileName) && !edit) {
      alert('必须选择md文件');
    } else {
      postSeverData({
        url: edit ? 'yc/admin/update' : 'yc/admin/publish',
        dataType: 'formData',
        contentType: 'formData',
        hasToken: true,
        data: {
          title: articleTitle,
          type: articleType,
          time: `${y}/${m}/${d}`,
          desc: articleDesc,
          recommend,
          file: files,
          id: this.props.location.query.id
        },
        onSuccess: (result) => {
          console.log(result);
          if (result.status === 100) {
            alert('发布成功!');
            window.location.reload();
          }
        }
      });
    }
  }
  render() {
    const { fileName, edit, articleTitle, articleDesc, recommend, articleType } = this.state;
    console.log(edit);
    return (
      <div id="yc-admin-publish">
        <h2 className="admin-content-title">文章标题</h2>
        <input type="text"
               className="input-text"
               value = {articleTitle}
               onInput= {(e) => { this.setState({articleTitle: e.target.value}); }}
        />
        <h2 className="admin-content-title" id="desc">文章简述</h2>
        <textarea className="input-textarea"
                  value = {articleDesc}
                  onInput= {(e) => { this.setState({articleDesc: e.target.value}); }}
        />
        <h2 className="admin-content-title" id="type">文章类型</h2>
        <Nav className="type-list"
             horizontal
             index= {articleTypes.indexOf(articleType)}
             items={articleTypes}
             click = {this.selectArticleType.bind(this)}
             SPA
        />
        <h2 className="admin-content-title" id="recommend">是否推荐文章</h2>
        <Nav className="type-list"
             horizontal
             index = {['否', '是'].indexOf(recommend)}
             items={['否', '是']}
             click = {this.selectRecommend.bind(this)}
             SPA
        />
        <div className="upload-file">
          <div className="select-file">
            <input type="file"
                   onChange={ (e) => { this.setState({fileName: e.target.files[0].name}); } }
                   ref={(input) => { this.fileDom = input; }}
            />
            <button>
              {edit ? '更新文件' : '选择文件'}
            </button>
          </div>
          <span className="file-name">{fileName}</span>
        </div>
        <button className="publish-btn" onClick={this.publish.bind(this)}>
          { edit ? '保存' : '发布' }
        </button>
        {
          edit &&
          <button style={{marginLeft: 20}}
                  className="publish-btn"
                  onClick={this.off.bind(this)}>
            取消
          </button>
        }
      </div>
    );
  }
}
module.exports = warp({
  Target: Publish,
  redux: {
    mapDispatchToProps: {postSeverData},
    mapStateToProps: (state) => {
      let {getServerData} = state;
      return {
        data: getServerData.data
      };
    }
  }
});
