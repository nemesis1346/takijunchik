package com.nemesis1346.takijunchik.models;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class PhotoModel {
    private String photoId;
    private String userId;
    private String postId;
    private String path_file;

    public PhotoModel(){}

    public String getPhotoId() {
        return photoId;
    }

    public void setPhotoId(String photoId) {
        this.photoId = photoId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getPath_file() {
        return path_file;
    }

    public void setPath_file(String path_file) {
        this.path_file = path_file;
    }
}
