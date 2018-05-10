import UI001Detail from './model/UI001/UI001Detail';
import * as TYPE from './mutation-types';

export default {
  [TYPE.CREATE_UI001DETAIL](ui001Detail) {
    this.UI001Detail = new UI001Detail(ui001Detail);
  }
}
