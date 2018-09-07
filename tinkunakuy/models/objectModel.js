class ObjectModel {
    constructor(
        timeSlotId1,
        timeSlotId2,
        timeValue,
        contentValue,
        annotationId
    ) {
        this.timeSlotId1 = timeSlotId1;
        this.timeSlotId2 = timeSlotId2;
        this.timeValue = timeValue;
        this.contentValue = contentValue;
        this.annotationId=annotationId;
    }
}

module.exports = ObjectModel;
