class ObjectModel {
    constructor(
        timeSlotId1,
        timeSlotId2,
        timeValue,
        mediaLenguaContent,
        spanishContent,
        kichwaContent,
        elicitSentenceContent,
        ipaContent,
        glossesContent,
        segmentedContent,
        annotationId
    ) {
        this.timeSlotId1 = timeSlotId1;
        this.timeSlotId2 = timeSlotId2;
        this.timeValue = timeValue;
        this.mediaLenguaContent=mediaLenguaContent,
        this.spanishContent=spanishContent,
        this.kichwaContent = kichwaContent,
        this.elicitSentenceContent=elicitSentenceContent,
        this.ipaContent = ipaContent,
        this.glossesContent = glossesContent,
        this.segmentedContent = segmentedContent,
        this.annotationId=annotationId;
    }
}

module.exports = ObjectModel;
