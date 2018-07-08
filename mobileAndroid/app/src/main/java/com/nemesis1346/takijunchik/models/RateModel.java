package com.nemesis1346.takijunchik.models;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class RateModel {
    private String rateId;
    private String objectRatingId;
    private String userId;

    public RateModel(){}

    public String getRateId() {
        return rateId;
    }

    public void setRateId(String rateId) {
        this.rateId = rateId;
    }

    public String getObjectRatingId() {
        return objectRatingId;
    }

    public void setObjectRatingId(String objectRatingId) {
        this.objectRatingId = objectRatingId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
