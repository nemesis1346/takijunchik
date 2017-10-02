package com.nemesis1346.takijunchik.models;

import com.nemesis1346.takijunchik.domain.UserSessionManager;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class FollowingModel {
    private String followId;
    private String userId;
    private String followedId;

    public FollowingModel(){

    }

    public String getFollowId() {
        return followId;
    }

    public void setFollowId(String followId) {
        this.followId = followId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFollowedId() {
        return followedId;
    }

    public void setFollowedId(String followedId) {
        this.followedId = followedId;
    }
}
