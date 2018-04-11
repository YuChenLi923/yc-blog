import React, {Component} from 'react';
import warp from '../../components/common/wrapCompontent';
import '../../assets/scss/pages/admin/sort.scss';
import ajax from '../../utils/yc-ajax';
class ResourceAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      types: [],
      preTypes: []
    };
  }
  setType(index, {target: {value}}) {
    let {types} = this.state;
    types[index] = value;
    this.setState({types});
  }
  deleteType(index) {
    let {types, type} = this.state,
        isDelete = confirm('是否删除分类:' + types[index]);
    if (isDelete) {
      ajax.post('yc/admin/deleteArticleType').send({
        type
      }).then(({data: result}) => {
        if (result.status === 100) {
          types.splice(index, 1);
          this.setState({types});
        } else {
          alert(result.msg);
        }
      });
    }
  }
  addType() {
    let {types, type} = this.state;
    if (!types.includes(type)) {
      ajax.post('yc/admin/addArticleType').send({
        type
      }).then(({data: result}) => {
        if (result.status === 100) {
          types.unshift(type);
          this.setState({types});
        } else {
          alert(result.msg);
        }
      });
    } else {
      alert('不能添加重复的分类!');
    }
  }
  modify(index) {
    let {preTypes, types} = this.state;
    ajax.post('yc/admin/modifyArticleType').send({
      oldType: preTypes[index],
      newType: types[index]
    }).then(({data: result}) => {
      if (result.status === 100) {
        this.setState({
          preTypes: types
        });
      } else {
        console.log('修改失败!');
      }
    });
  }
  componentWillMount() {
    ajax.get('yc/getArticleTypes').send().then(({data: result}) => {
      if (result.status === 100) {
        this.setState({
          types: [...result.data.types],
          preTypes: [...result.data.types]
        });
      }
    });
  }
  render() {
    let {types, type} = this.state;
    return (
      <div id="yc-admin-sort">
        <h2 className="admin-content-title">分类管理</h2>
        <div className="sort-input-wrap clear-float">
          <input value={type} onChange={({target: {value: type}}) => { this.setState({type}); }} className="sort-input" />
          <button className="sort-add" onClick={this.addType.bind(this)}>添加</button>
        </div>
        <div className="sort-result">
          {
            types.map((_, index) =>
              <div className="type" key={index}>
                <input value={types[index]} onBlur={this.modify.bind(this, index)} onChange={this.setType.bind(this, index)}/>
                <div className="delete" onClick={this.deleteType.bind(this, index)}/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
module.exports = warp({
  Target: ResourceAdmin
});

