export class WordModel {
    constructor(
        wordId,
        spanish,
        english,
        kichwa,
        descriptionSpanish,
        descriptionEnglish,
        descriptionKichwa
    ) {
        this.wordId = wordId;
        this.spanish = spanish;
        this.english = english;
        this.kichwa = kichwa;
        this.descriptionSpanish=descriptionSpanish;
        this.descriptionEnglish=descriptionEnglish;
        this.descriptionKichwa=descriptionKichwa;
    }
}

module.exports = TokenAccountModel;
