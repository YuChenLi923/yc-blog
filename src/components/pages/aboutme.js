import React, {Component} from 'react';
import '../../assets/scss/pages/aboutme.scss';
class Aboutme extends Component {
    render() {
        return (
            <div id="yc-about-me" className="vcard">
              <p className="fn">李宇宸</p>
              <a class="email" href="liyc_code@163.com">邮箱: liyc_code@163.com</a>
              <div class="tel">手机:0086-023-15340520871</div>
              <div class="qq">QQ:492757538</div>
              <div className="desc">
                &nbsp;&nbsp;&nbsp;&nbsp;大三前端菜鸡一枚,现重庆邮电大学信息化研究中心(原蓝山工作室)前端组负责人,专注于web前端领域,主机游戏爱好者,war地图制作爱好者
              </div>
            </div>
        );
    }
}
module.exports = Aboutme;
