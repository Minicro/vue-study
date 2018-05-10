import UI001Detail from "./model/UI001/UI001Detail";
import Selection from "../util/selection";

export default {
    ui001DetailList: new Array(UI001Detail),
    workClassificationList: [
      new Selection('01', '普通'),
      new Selection('02', '休日'),
      new Selection('03', '祝日'),
      new Selection('04', '振替休暇'),
      new Selection('05', '振替出勤'),
      new Selection('00', ''),
    ],

}
