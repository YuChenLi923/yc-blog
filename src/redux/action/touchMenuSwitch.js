import { MENU_OPEN, MENU_CLOSE } from '../type/index';

module.exports = function (open) {
    return (dispatch) => {
        dispatch({
          type: open ? MENU_OPEN : MENU_CLOSE
        });
    };
};
