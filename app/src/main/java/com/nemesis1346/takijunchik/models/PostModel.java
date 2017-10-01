package com.nemesis1346.takijunchik.models;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class PostModel {
    private String postId;
    private String userId;
    private String type;
    private String path_file;
    private String postRate;

    public PostModel(){}

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPath_file() {
        return path_file;
    }

    public void setPath_file(String path_file) {
        this.path_file = path_file;
    }

    public String getPostRate() {
        return postRate;
    }

    public void setPostRate(String postRate) {
        this.postRate = postRate;
    }
}
