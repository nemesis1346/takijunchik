package com.nemesis1346.takijunchik.models;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class VideoModel {
    private String videoId;
    private String userId;
    private String postId;
    private String patch_file;

    public VideoModel(){}

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
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

    public String getPatch_file() {
        return patch_file;
    }

    public void setPatch_file(String patch_file) {
        this.patch_file = patch_file;
    }
}
