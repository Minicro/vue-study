'use strict'

export default class UI001Detail {
	constructor(props) {
        if (props === null) {
            this.editable = true;
            this.date = new Date();
            this.workClassification = '';
            this.startTime = null;
            this.endTime = null;
            this.restHour = 1;
            this.workHour = 0;
            this.projectName = '';
            this.remarks = '';
        } else {
            this.editable = true;
            this.date = props.date;
            this.workClassification = props.workClassification;
            this.startTime = props.startTime;
            this.endTime = props.endTime;
            this.restHour = props.restHour;
            this.workHour = props.workHour;
            this.projectName = props.projectName;
            this.remarks = props.remarks;
        }
    }
    
}


