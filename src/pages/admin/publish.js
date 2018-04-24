import React, {Component} from 'react';
import warp from '../../components/common/wrapCompontent';
import Nav from '../../components/common/Nav';
import '../../assets/scss/pages/admin/publish.scss';
import ajax from '../../utils/yc-ajax';

function getDate(time) {
  let y = time.getFullYear(),
      m = time.getMonth() + 1,
      d = time.getDate();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  return `${y}-${m}-${d}`;
}
function formatDate(date) {
  var dates = date.split('-');
  return `${dates[0]}/${dates[1]}/${dates[2]}`;
}
class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      oldArticle: '',
      articleTitle: '',
      time: getDate(new Date()),
      articleDesc: '',
      articleType: '',
      recommended: '否',
      edit: this.props.location.pathname === '/admin/edit',
      articleTypes: []
    };
  }
  componentDidMount() {
    ajax.get('yc/getArticleTypes').send().then(({data: result}) => {
      if (result.status === 100) {
        let {data: {types: articleTypes}} = result;
        this.setState({
          articleTypes,
          articleType: articleTypes[0]
        });
      }
    }).then(() => {
      if (this.state.edit) {
        const id = +this.props.location.query.id;
        if (id) {
          ajax.get('yc/admin/getArticleInf', {
            query: {
              id
            }
          }).send().then(({data: result}) => {
            if (result.status === 100) {
              const data = result.data;
              this.setState({
                articleTitle: data.title,
                articleDesc: data.desc,
                articleType: data.type,
                oldArticle: data.article,
                recommend: data.recommend === 1 ? '是' : '否',
                time: getDate(new Date(data.time))
              });
            } else {
              window.close();
            }
          });
        } else {
          window.close();
        }
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== '/admin/edit' && this.state.edit) {
      this.setState({
        edit: false,
        fileName: '',
        articleTitle: '',
        articleDesc: '',
        articleType: '',
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
          { oldArticle, articleTitle, articleDesc, fileName, articleType, recommend, edit, time } = this.state,
          files = this.fileDom.files;
    if (!articleTitle) {
      alert('未填写文章标题!');
    } else if (!articleDesc) {
      alert('未填写文章简述!');
    } else if (files.lengt === 0 && !edit) {
      alert('未选择文件');
    } else if (!/\.md$/.test(fileName) && !edit) {
      alert('必须选择md文件');
    } else {
      ajax.post(edit ? 'yc/admin/updateArticle' : 'yc/admin/publish', {
        header: {
          'Content-Type': 'formData'
        }
      }).send({
        title: articleTitle,
        type: articleType,
        time: formatDate(time),
        desc: articleDesc,
        recommend,
        file: files,
        id: this.props.location.query.id,
        oldMd: oldArticle
      }).then(({data: result}) => {
        if (result.status === 100) {
          alert('发布成功!');
          window.location.reload();
        } else {
          alert('发布失败!');
        }
      });
    }
  }
  render() {
    const { fileName, edit, articleTitle, articleDesc, recommend, articleTypes, articleType, time } = this.state;
    console.log(articleTypes.indexOf(articleType), articleType, articleTypes);
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
        <h2 className="admin-content-title">发布日期</h2>
        <input type="date" value={time} onChange = {(e) => { this.setState({time: e.target.value}); }} />
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
  Target: Publish
});
