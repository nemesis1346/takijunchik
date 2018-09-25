class ObjectModel {
    constructor(
        objectId,
        //Variables for annotationId
        annotationIdMediaLengua,
        annotationIdSpanish,
        annotationIdKichwa,
        annotationIdElicitSentence,
        annotationIdIpa,
        annotationIdGlosses,
        annotationIdSegmented,
        //Variables for time slot1
        timeSlotId1MediaLengua,
        timeSlotId1Spanish,
        timeSlotId1Kichwa,
        timeSlotId1ElicitSentence,
        timeSlotId1Ipa,
        timeSlotId1Glosses,
        timeSlotId1Segmented,
        //Variables for times slot2
        timeSlotId2MediaLengua,
        timeSlotId2Spanish,
        timeSlotId2Kichwa,
        timeSlotId2ElicitSentence,
        timeSlotId2Ipa,
        timeSlotId2Glosses,
        timeSlotId2Segmented,
        //Variables for the content
        mediaLenguaContent,
        spanishContent,
        kichwaContent,
        elicitSentenceContent,
        ipaContent,
        glossesContent,
        segmentedContent,
        //Time values
        timeValue1,
        timeValue2,
        //Arrays
        mediaLenguaContentArray,
        spanishContentArray,
        kichwaContentArray,
        elicitSentenceContentArray,
        ipaContentArray,
        glossesContentArray,
        segmentedContentArray
    ) {
        this.objectId = objectId;
        //Variables for annotationId
        this.annotationIdMediaLengua = annotationIdMediaLengua;
        this.annotationIdSpanish = annotationIdSpanish;
        this.annotationIdKichwa = annotationIdKichwa;
        this.annotationIdElicitSentence = annotationIdElicitSentence;
        this.annotationIdIpa = annotationIdIpa;
        this.annotationIdGlosses = annotationIdGlosses;
        this.annotationIdSegmented = annotationIdSegmented;
        //Variables for time slot1
        this.timeSlotId1MediaLengua = timeSlotId1MediaLengua;
        this.timeSlotId1Spanish = timeSlotId1Spanish;
        this.timeSlotId1Kichwa = timeSlotId1Kichwa;
        this.timeSlotId1ElicitSentence = timeSlotId1ElicitSentence;
        this.timeSlotId1Ipa = timeSlotId1Ipa;
        this.timeSlotId1Glosses = timeSlotId1Glosses;
        this.timeSlotId1Segmented = timeSlotId1Segmented;
        //Variables for times slot2
        this.timeSlotId2MediaLengua = timeSlotId2MediaLengua;
        this.timeSlotId2Spanish = timeSlotId2Spanish;
        this.timeSlotId2Kichwa = timeSlotId2Kichwa;
        this.timeSlotId2ElicitSentence = timeSlotId2ElicitSentence;
        this.timeSlotId2Ipa = timeSlotId2Ipa;
        this.timeSlotId2Glosses = timeSlotId2Glosses;
        this.timeSlotId2Segmented = timeSlotId2Segmented;
        //Variables for the content
        this.mediaLenguaContent = mediaLenguaContent;
        this.spanishContent = spanishContent;
        this.kichwaContent = kichwaContent;
        this.elicitSentenceContent = elicitSentenceContent;
        this.ipaContent = ipaContent;
        this.glossesContent = glossesContent;
        this.segmentedContent = segmentedContent;
        this.timeValue1 = timeValue1;
        this.timeValue2 = timeValue2;
        //Array
        this.mediaLenguaContentArray = mediaLenguaContentArray;
        this.spanishContentArray = spanishContentArray;
        this.kichwaContentArray = kichwaContentArray;
        this.elicitSentenceContentArray = elicitSentenceContentArray;
        this.ipaContentArray = ipaContentArray;
        this.glossesContentArray = glossesContentArray;
        this.segmentedContentArray = segmentedContentArray;
    }
}

module.exports = ObjectModel;
